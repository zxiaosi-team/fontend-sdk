import { sdk } from '@zxiaosi/sdk';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

const Home = () => {
  const [theme, setTheme] = useStore(
    sdk.store,
    useShallow((state) => [state.theme, state.setTheme]),
  );

  /** 跳转页面 */
  const handlePageTo = (uri: string) => {
    sdk.client.navigate(uri);
  };

  /** 设置主题 */
  const handleChangeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <h2>
      subapp2
      <br />
      Token: {sdk.storage?.getToken()}
      <br />
      <br />
      <button onClick={handleChangeTheme}>设置主题</button>
      Theme: {theme}
      <br />
      <br />
      <button onClick={() => handlePageTo('/home')}>跳转到 Home</button>
      <button onClick={() => handlePageTo('/subapp1')}>跳转到 Subapp1</button>
    </h2>
  );
};

export default Home;
