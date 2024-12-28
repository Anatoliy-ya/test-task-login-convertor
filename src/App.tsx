import { useState } from 'react';
import styles from './App.module.css';
import Login from './components/Login';
import TreeConverter from './components/TreeConverter';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.getTree}>
        <h1>getTree</h1>
        <TreeConverter />
      </div>
      <div className={styles.getToken}>
        <h1>getToken</h1>
        <Login />
      </div>
    </div>
  );
}

export default App;
