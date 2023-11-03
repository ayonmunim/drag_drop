// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux';
// import store from './store/store';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//    <Provider store={store}>
//     <App />
//   </Provider>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import { render } from 'react-dom'
import './index.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from './components/Container'
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className="App">
     <Provider store={store} >
     <DndProvider backend={HTML5Backend}>
         <Container />
      </DndProvider>
     </Provider>
    </div>
  )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)

