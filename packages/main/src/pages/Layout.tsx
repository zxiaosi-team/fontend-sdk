import { Outlet, useNavigate } from 'react-router-dom';

/** 布局组件 */
const Layout = () => {
  const navigate = useNavigate();

  const handlePageTo = (uri: string) => {
    navigate(uri);
  };

  return (
    <div className="layout">
      <h1>布局组件</h1>

      <div style={{ display: 'flex', gap: 20 }}>
        <button onClick={() => handlePageTo('/home')}>主应用 - Home</button>
        <button onClick={() => handlePageTo('/subapp1')}>
          子应用 - subapp1
        </button>
        <button onClick={() => handlePageTo('/subapp2')}>
          子应用 - subapp2
        </button>
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
