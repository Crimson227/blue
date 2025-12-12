import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
// Locale import removed to prevent resolution errors
// import zhCN from 'antd/locale/zh_CN'; 

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ConfigProvider
      // locale={zhCN} 
      theme={{
        token: {
          colorPrimary: '#4f46e5', // Indigo-600
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
        components: {
          Card: {
            headerFontSize: 16,
            headerFontWeight: 600
          }
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);