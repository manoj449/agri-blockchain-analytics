import React, { useState, useEffect } from 'react';
import { getChain } from '../lib/api';

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({ productTypes: {}, origins: {} });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getChain();
        const chain = response.chain;
        const productTypes = {};
        const origins = {};

        chain.forEach((block) => {
          const { product_type, origin } = block.data;
          productTypes[product_type] = (productTypes[product_type] || 0) + 1;
          origins[origin] = (origins[origin] || 0) + 1;
        });

        setAnalytics({ productTypes, origins });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };
    fetchAnalytics();
  }, []);

  return React.createElement(
    'div',
    { className: 'section' },
    React.createElement('h2', { className: 'section-title' }, 'Analytics Dashboard'),
    React.createElement(
      'div',
      { className: 'grid' },
      React.createElement(
        'div',
        { className: 'grid-item' },
        React.createElement('h3', { className: 'grid-title' }, 'Product Types'),
        React.createElement(
          'ul',
          null,
          Object.entries(analytics.productTypes).map(([type, count]) =>
            React.createElement('li', { key: type }, `${type}: ${count}`)
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'grid-item' },
        React.createElement('h3', { className: 'grid-title' }, 'Origins'),
        React.createElement(
          'ul',
          null,
          Object.entries(analytics.origins).map(([origin, count]) =>
            React.createElement('li', { key: origin }, `${origin}: ${count}`)
          )
        )
      )
    )
  );
}

export default AnalyticsDashboard;