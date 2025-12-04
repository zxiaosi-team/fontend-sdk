import { getRoutesApi, getUserInfoApi } from '@/service';
import { sdk } from '@zxiaosi/sdk';
import { useEffect, useState } from 'react';

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

  /** 跳转页面 */
  const handlePageTo = (uri: string) => {
    sdk.client.navigate(uri);
  };

  useEffect(() => {
    getUserInfoApi();
    getRoutesApi();
  }, []);

  return (
    <h2>
      Home
      <br />
      <button onClick={handleSetToken}>设置Token</button>
      <button onClick={handleGetToken}>获取Token</button>
      <br />
      <br />
      Token: {token}
      <br />
      <br />
      <button onClick={() => handlePageTo('/subapp1')}>跳转到 Subapp1</button>
      <button onClick={() => handlePageTo('/subapp2')}>跳转到 Subapp2</button>
    </h2>
  );
};

export default Home;
