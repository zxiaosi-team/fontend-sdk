import { sdk } from '@zxiaosi/sdk';
import { useState } from 'react';

/** 首页 */
const Home = () => {
  const [token, setToken] = useState<string>('');
  /** 设置Token */
  const handleSetToken = () => {
    sdk.storage.setToken(new Date().getTime().toString());
  };

  /** 获取Token */
  const handleGetToken = () => {
    setToken(sdk.storage.getToken());
  };

  return (
    <h2>
      Home
      <br />
      <button onClick={handleSetToken}>设置Token</button>
      <br />
      <button onClick={handleGetToken}>获取Token</button>
      <br />
      Token: {token}
    </h2>
  );
};

export default Home;
