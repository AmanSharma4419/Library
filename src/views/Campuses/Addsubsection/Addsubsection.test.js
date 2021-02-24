import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Campuses from './Campuses';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Campuses/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
