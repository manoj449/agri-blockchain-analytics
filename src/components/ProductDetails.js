import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../lib/api';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response);
      } catch (err) {
        setError('Product not found');
        console.error('Error fetching product:', err);
      }
    };
    fetchProduct();
  }, [id]);

  if (error) {
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement('h2', { className: 'section-title' }, 'Error'),
      React.createElement('p', null, error)
    );
  }

  if (!product) {
    return React.createElement(
      'div',
      { className: 'container' },
      React.createElement('p', null, 'Loading...')
    );
  }

  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement('h2', { className: 'section-title' }, 'Product Details'),
    React.createElement(
      'div',
      { className: 'product-details' },
      React.createElement('p', null, React.createElement('strong', null, 'Index: '), product.index),
      React.createElement('p', null, React.createElement('strong', null, 'Timestamp: '), new Date(product.timestamp * 1000).toLocaleString()),
      React.createElement('p', null, React.createElement('strong', null, 'Product Type: '), product.data.product_type),
      React.createElement('p', null, React.createElement('strong', null, 'Origin: '), product.data.origin),
      React.createElement('p', null, React.createElement('strong', null, 'Harvest Date: '), product.data.harvest_date),
      React.createElement('p', null, React.createElement('strong', null, 'Quality: '), product.data.quality),
      product.data.image_path && React.createElement('img', {
        src: `http://localhost:5000/uploads/${product.data.image_path}`,
        alt: product.data.product_type,
        className: 'product-image'
      }),
      React.createElement('p', null, React.createElement('strong', null, 'Hash: '), product.hash),
      React.createElement('p', null, React.createElement('strong', null, 'Previous Hash: '), product.previous_hash)
    )
  );
}

export default ProductDetails;