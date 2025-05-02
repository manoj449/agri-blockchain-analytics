import hashlib
import time
import json

class Block:
    def __init__(self, index, previous_hash, timestamp, data, hash):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.data = data
        self.hash = hash

class Blockchain:
    def __init__(self):
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        genesis_block = Block(0, "0", time.time(), {"message": "Genesis Block"}, self.calculate_hash(0, "0", time.time(), {"message": "Genesis Block"}))
        self.chain.append(genesis_block)

    def calculate_hash(self, index, previous_hash, timestamp, data):
        value = str(index) + previous_hash + str(timestamp) + json.dumps(data)
        return hashlib.sha256(value.encode('utf-8')).hexdigest()

    def add_block(self, data):
        previous_block = self.chain[-1]
        index = previous_block.index + 1
        timestamp = time.time()
        hash = self.calculate_hash(index, previous_block.hash, timestamp, data)
        new_block = Block(index, previous_block.hash, timestamp, data, hash)
        self.chain.append(new_block)
        return new_block

    def is_valid(self):
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i-1]
            if current.hash != self.calculate_hash(current.index, current.previous_hash, current.timestamp, current.data):
                return False
            if current.previous_hash != previous.hash:
                return False
        return True