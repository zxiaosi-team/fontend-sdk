import { sdk } from '@zxiaosi/sdk';

const Home = () => {
  /** 跳转页面 */
  const handlePageTo = (uri: string) => {
    sdk.client.navigate(uri);
  };

  return (
    <h2>
      subapp2
      <br />
      Token: {sdk.storage?.getToken()}
      <br />
      <br />
      <button onClick={() => handlePageTo('/home')}>跳转到 Home</button>
      <button onClick={() => handlePageTo('/subapp1')}>跳转到 Subapp1</button>
    </h2>
  );
};

export default Home;
