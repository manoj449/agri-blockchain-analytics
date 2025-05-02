from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from blockchain import Blockchain
import os
import uuid

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
blockchain = Blockchain()

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/add_product', methods=['POST'])
def add_product():
    # Check for required text fields
    required_fields = ['product_type', 'origin', 'harvest_date', 'quality']
    data = {field: request.form.get(field) for field in required_fields}
    print("Received data:", data)

    if not all(data[field] for field in required_fields):
        print("Missing fields:", [field for field in required_fields if not data[field]])
        return jsonify({'error': 'Missing fields'}), 400

    # Handle image upload
    image_path = None
    if 'image' in request.files:
        file = request.files['image']
        if file and allowed_file(file.filename):
            filename = f"{uuid.uuid4().hex}.{file.filename.rsplit('.', 1)[1].lower()}"
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            image_path = filename
        else:
            return jsonify({'error': 'Invalid or missing image file'}), 400

    # Add unique ID and image path to data
    data['id'] = str(uuid.uuid4())  # Generate unique ID
    if image_path:
        data['image_path'] = image_path

    # Add to blockchain
    block = blockchain.add_block(data)
    return jsonify({
        'message': 'Product added to blockchain',
        'block': {
            'index': block.index,
            'timestamp': block.timestamp,
            'data': block.data,
            'hash': block.hash,
            'previous_hash': block.previous_hash
        }
    }), 201

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/get_product/<id>', methods=['GET'])
def get_product(id):
    for block in blockchain.chain:
        if block.data.get('id') == id:
            return jsonify({
                'index': block.index,
                'timestamp': block.timestamp,
                'data': block.data,
                'hash': block.hash,
                'previous_hash': block.previous_hash
            }), 200
    return jsonify({'error': 'Product not found'}), 404

@app.route('/get_chain', methods=['GET'])
def get_chain():
    chain_data = [{
        'index': block.index,
        'timestamp': block.timestamp,
        'data': block.data,
        'hash': block.hash,
        'previous_hash': block.previous_hash
    } for block in blockchain.chain]
    return jsonify({
        'chain': chain_data,
        'length': len(chain_data),
        'is_valid': blockchain.is_valid()
    }), 200

if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True, port=5000)