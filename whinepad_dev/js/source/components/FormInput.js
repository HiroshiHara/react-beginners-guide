import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import Suggest from './Suggest';

class FormInput extends Component {
  getValue() {

  }
  render() {

  }
}

FormInput.propTypes = {
  type: PropTypes.oneOf(['input', 'text', 'year', 'suggest', 'rating']),
  id: PropsTypes.string,
  options: PropsTypes.array,
  defaultValue: PropsTypes.any
}
