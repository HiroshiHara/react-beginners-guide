'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import Button from './components/Button';

ReactDOM.render(
  <div style={{ padding: '20px' }}>
    <h1>Test for Compoments</h1>

    <h2>■Logo</h2>
    <div style={{ display: 'inline-block', background: 'purple' }}>
      <div>・Just Only print Logo image.<Logo /></div>
    </div>

    <h2>■Button</h2>
    <div>
      ・Apply onClick-attribute Button.
      <Button onClick={() => alert('Clicked!')}>Button</Button>
    </div>
    <div>
      ・Apply href-attribute Button.
      <Button href='http://reactjs.com'>Button</Button>
    </div>
    <div>
      ・Apply className-attribute Button.
      <Button className='custom'>Button</Button>
    </div>
  </div>,
  document.getElementById('pad')
);
