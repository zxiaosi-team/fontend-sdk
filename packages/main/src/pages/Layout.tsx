import { Outlet } from 'react-router-dom';

/** 布局组件 */
const Layout = () => {
  return (
    <div className="layout">
      <h1>布局组件</h1>

      <div style={{ display: 'flex', gap: 20 }}>
        <button>主应用 - Home</button>
        <button>子应用 - subapp1</button>
        <button>子应用 - subapp2</button>
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
