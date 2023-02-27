import React from 'react';
import ReactDOM from 'react-dom';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import React select styles
import 'react-select/dist/react-select.css';
// Import Main styles for this application
import './scss/main.scss';
// Containers
import Container from './container';

ReactDOM.render(
  <Container />
  , document.getElementById('root')
);
