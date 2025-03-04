import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Profile from './Profile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Profile/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
