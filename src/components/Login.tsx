import { useState } from 'react';
import styles from './Login.module.css';

type LoginPayload = {
  username: string;
  password: string;
};

type MockResponse = {
  token?: string;
  error?: string;
};

// Мок-функция, эмулирующая WebSocket-сервер
const mockWebSocket = (data: LoginPayload): Promise<MockResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Проверяем логин и пароль
      if (data.username === 'test' && data.password === '1234') {
        resolve({ token: 'mocked-token' }); // Успешный токен
      } else {
        resolve({ error: 'Invalid credentials' });
      }
    }, 1000); // Добавляем задержку ответа
  });
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const payload: LoginPayload = { username, password };

      // Отправляем данные на мок-сервер
      const response = await mockWebSocket(payload);

      if (response.token) {
        // Сохраняем токен в localStorage
        localStorage.setItem('authToken', response.token);
        setMessage('Login successful! Token saved to localStorage.');
      } else {
        // Отображаем сообщение об ошибке
        setMessage(response.error || 'Unknown error occurred.');
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
      console.error(error);
    }
  };

  return (
    <div className={styles.login}>
      <h3>Login</h3>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="test"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="1234"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Login;
