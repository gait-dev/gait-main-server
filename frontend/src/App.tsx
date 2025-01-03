import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('Hello, Vite + React + TypeScript!');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/test/')
        .then(response => setMessage(response.data.message))
        .catch(error => console.error(error));
}, []);

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage('You clicked the button!')}>
        Click Me
      </button>
    </div>
  );
};

export default App;
