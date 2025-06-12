import React, { useState } from 'react';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  return username
    ? <ChatPage username={username} />
    : <AuthPage onSubmit={setUsername} />;
};
export default App;