import React from 'react';
import ReactDOM from 'react-dom';
import Registeruniversity from './Registeruniversity';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Registeruniversity />, div);
  ReactDOM.unmountComponentAtNode(div);
});
