import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Reset from './Reset';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Reset/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
