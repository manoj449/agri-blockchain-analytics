import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { getChain } from '../lib/api';

function BlockchainView() {
  const [chain, setChain] = useState([]);

  useEffect(() => {
    const fetchChain = async () => {
      try {
        const response = await getChain();
        setChain(response.chain);
      } catch (error) {
        console.error('Error fetching chain:', error);
      }
    };
    fetchChain();
  }, []);

  return React.createElement(
    'div',
    { className: 'section' },
    React.createElement('h2', { className: 'section-title' }, 'Blockchain Data'),
    React.createElement(
      'div',
      { className: 'list-container' },
      chain.map((block) =>
        React.createElement(
          'div',
          { key: block.index, className: 'block' },
          React.createElement('p', null, React.createElement('strong', null, 'Index: '), block.index),
          React.createElement('p', null, React.createElement('strong', null, 'Timestamp: '), new Date(block.timestamp * 1000).toLocaleString()),
          React.createElement('p', null, React.createElement('strong', null, 'Data: '), JSON.stringify(block.data)),
          block.data.image_path && React.createElement('img', {
            src: `http://localhost:5000/uploads/${block.data.image_path}`,
            alt: block.data.product_type,
            className: 'block-image'
          }),
          block.data.id && React.createElement(QRCodeCanvas, {
            value: `http://localhost:3000/product/${block.data.id}`,
            size: 128,
            className: 'qr-code'
          }),
          React.createElement('p', null, React.createElement('strong', null, 'Hash: '), block.hash),
          React.createElement('p', null, React.createElement('strong', null, 'Previous Hash: '), block.previous_hash)
        )
      )
    )
  );
}

export default BlockchainView;