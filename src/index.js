import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './store/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MouseTransition, MultiBackend, TouchTransition } from 'react-dnd-multi-backend';
import { TouchBackend } from 'react-dnd-touch-backend';


const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      transition: MouseTransition
      ,
    },
    {
      backend: TouchBackend,
      options: {enableMouseEvents: true},
      transition: TouchTransition,
    }
  ]
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Provider store={store}>
            <App />
        </Provider>
    </DndProvider>
  </React.StrictMode>
);

