import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Universitycontact from './Universitycontact';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Universitycontact/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
