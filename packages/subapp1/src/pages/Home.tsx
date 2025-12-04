import { sdk } from '@zxiaosi/sdk';

const Home = () => {
  /** 跳转页面 */
  const handlePageTo = (uri: string) => {
    sdk.client.navigate(uri);
  };

  return (
    <h2>
      subapp1
      <br />
      <br />
      Token: {sdk.storage?.getToken()}
      <br />
      <br />
      <button onClick={() => handlePageTo('/home')}>跳转到 Home</button>
      <button onClick={() => handlePageTo('/subapp2')}>跳转到 Subapp2</button>
    </h2>
  );
};

export default Home;
