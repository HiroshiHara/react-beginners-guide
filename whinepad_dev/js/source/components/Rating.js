import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.defaultValue,
      tmpRating: props.defaultValue
    }
  }
}

Rating.propTypes = {
  defaultValue: PropTypes.number,
  readonly: PropTypes.bool,
  max: PropTypes.number
}

Rating.defaultProps = {
  defaultValue: 0,
  max: 5
}

export default Rating
