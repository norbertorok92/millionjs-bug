import React from 'react';

import { ButtonCounter } from '@million-bug/components';
import ReactDOM from 'react-dom';

const App = () => {
  const name = 'Hello React Button';

  const onChildClicked = (e: number) => {
    console.warn('callback from parent triggered', e);
  };

  return (
    <React.StrictMode>
      <>
        <h1>React TSX Starter</h1>
        <div>containing:</div>
        <ul>
          <li>React</li>
          <li>Twitter Bootstrap</li>
          <li>Basic Functional Components App and ButtonCounter</li>
        </ul>
        <ButtonCounter name={name} onClicked={(e: number) => onChildClicked(e)} />
      </>
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
