import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import BlockchainView from './components/BlockchainView';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ProductDetails from './components/ProductDetails';
import './assets/styles.css';

function App() {
  return React.createElement(
    Router,
    null,
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement(
        Routes,
        null,
        React.createElement(Route, {
          path: '/',
          element: React.createElement(
            'div',
            null,
            React.createElement('h1', { className: 'title' }, 'Agri Blockchain Analytics'),
            React.createElement(ProductForm),
            React.createElement(BlockchainView),
            React.createElement(AnalyticsDashboard)
          )
        }),
        React.createElement(Route, {
          path: '/product/:id',
          element: React.createElement(ProductDetails)
        })
      )
    )
  );
}

export default App;