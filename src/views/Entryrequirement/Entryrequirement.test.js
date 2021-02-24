import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import Entryrequirement from './Entryrequirement';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Entryrequirement/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
