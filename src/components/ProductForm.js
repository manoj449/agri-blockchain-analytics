import React, { useState } from 'react';
import { addProduct } from '../lib/api';

function ProductForm() {
  const [formData, setFormData] = useState({
    product_type: '',
    origin: '',
    harvest_date: '',
    quality: '',
    image: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.product_type || !formData.origin || !formData.harvest_date || !formData.quality) {
      alert('Please fill out all text fields');
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('product_type', formData.product_type);
      formDataToSend.append('origin', formData.origin);
      formDataToSend.append('harvest_date', formData.harvest_date);
      formDataToSend.append('quality', formData.quality);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      await addProduct(formDataToSend);
      alert('Product added to blockchain!');
      setFormData({ product_type: '', origin: '', harvest_date: '', quality: '', image: null });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return React.createElement(
    'div',
    { className: 'section' },
    React.createElement('h2', { className: 'section-title' }, 'Add Product'),
    React.createElement(
      'div',
      { className: 'form-container' },
      React.createElement('input', {
        type: 'text',
        name: 'product_type',
        value: formData.product_type,
        onChange: handleChange,
        placeholder: 'Product Type (e.g., Apple)',
        className: 'input'
      }),
      React.createElement('input', {
        type: 'text',
        name: 'origin',
        value: formData.origin,
        onChange: handleChange,
        placeholder: 'Origin (e.g., California)',
        className: 'input'
      }),
      React.createElement('input', {
        type: 'date',
        name: 'harvest_date',
        value: formData.harvest_date,
        onChange: handleChange,
        className: 'input'
      }),
      React.createElement('input', {
        type: 'text',
        name: 'quality',
        value: formData.quality,
        onChange: handleChange,
        placeholder: 'Quality (e.g., Grade A)',
        className: 'input'
      }),
      React.createElement('input', {
        type: 'file',
        name: 'image',
        accept: 'image/png,image/jpeg,image/jpg',
        onChange: handleChange,
        className: 'input-file'
      }),
      React.createElement(
        'button',
        {
          onClick: handleSubmit,
          className: 'button'
        },
        'Add to Blockchain'
      )
    )
  );
}

export default ProductForm;