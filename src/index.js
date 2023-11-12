import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';


const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>);

// During an update, there's no need to pass the container again.
root.render(<App tab="profile" />);