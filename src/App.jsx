import React from 'react';
import logo from './assets/images/logo.png';

const App = () => {
  return (
    <div>
        <img src={logo} alt="profile" />
        <h1 className="text-3xl font-bold underline text-gray-800">
          Hello world, React with Webpack!
        </h1>
    </div>
  );
};

export default App;