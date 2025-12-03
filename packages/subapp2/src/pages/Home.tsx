import { sdk } from '@zxiaosi/sdk';

const Home = () => {
  return (
    <h2>
      subapp2
      <br />
      Token: {sdk.storage?.getToken()}
    </h2>
  );
};

export default Home;
