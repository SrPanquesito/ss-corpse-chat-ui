import React from 'react';
import logo from './assets/images/logo.png';

const App = () => {
  return (
    <div>
        <img src={logo} alt="profile" />
        <h1>Hello, React with Webpack!</h1>
    </div>
  );
};

export default App;