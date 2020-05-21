'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import Button from './components/Button';
import Suggest from './components/Suggest';
import Rating from './components/Rating';

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

    <h2>■Suggest</h2>
    <div>
      ・Print datalist element.
      <Suggest options={['eenie', 'meenie', 'miney', 'mo']} />
    </div>

    <h2>■Rating</h2>
    <div>
      ・None default value.
       <Rating />
    </div>
    <div>
      ・default value is 4.
       <Rating defaultValue={4} />
    </div>
    <div>
      ・Max value is 11.
       <Rating max={11} />
    </div>
    <div>
      ・Read only.
       <Rating readonly={true} defaultValue={3} />
    </div>
  </div>,
  document.getElementById('pad')
);
