
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RenderPage from './components/RenderPage';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

const path = window.location.pathname;

const AppToRender = () => {
  if (path === '/render') {
    return <RenderPage />;
  }
  return <App />;
};


root.render(
  <React.StrictMode>
    <AppToRender />
  </React.StrictMode>
);
