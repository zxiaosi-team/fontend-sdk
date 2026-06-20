import './sdk.config.ts';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';

/** 渲染主应用 */
createRoot(document.getElementById('root')!).render(<App />);
