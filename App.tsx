import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { 
  AppstoreOutlined, 
  BookOutlined, 
  SettingOutlined,
  CodeSandboxOutlined
} from '@ant-design/icons';
import { AppRoute } from './types';
import { Workflow } from './components/Workflow';
import { Docs } from './components/Docs';
import { Settings } from './components/Settings';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<AppRoute>(AppRoute.WORKFLOW);
  const [collapsed, setCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeRoute) {
      case AppRoute.WORKFLOW:
        return <Workflow />;
      case AppRoute.DOCS:
        return <Docs />;
      case AppRoute.SETTINGS:
        return <Settings />;
      default:
        return <Workflow />;
    }
  };

  const getTitle = () => {
    switch (activeRoute) {
      case AppRoute.WORKFLOW:
        return '模型训练工作流 (Workflow)';
      case AppRoute.DOCS:
        return '帮助说明 (Docs)';
      case AppRoute.SETTINGS:
        return '系统设置 (Settings)';
      default:
        return '';
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        className="shadow-lg z-10"
        theme="light"
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-100">
          <CodeSandboxOutlined className="text-2xl text-indigo-600" />
          {!collapsed && <span className="ml-3 font-bold text-gray-800 text-lg">AI Studio</span>}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activeRoute]}
          onClick={({ key }) => setActiveRoute(key as AppRoute)}
          className="border-none mt-4"
          items={[
            {
              key: AppRoute.WORKFLOW,
              icon: <AppstoreOutlined />,
              label: '操作流程',
            },
            {
              key: AppRoute.DOCS,
              icon: <BookOutlined />,
              label: '帮助说明',
            },
            {
              key: AppRoute.SETTINGS,
              icon: <SettingOutlined />,
              label: '系统设置',
            },
          ]}
        />
      </Sider>
      <Layout className="bg-slate-50">
        <Header className="bg-white p-0 px-6 border-b border-gray-200 shadow-sm flex items-center h-16">
          <Title level={4} style={{ margin: 0, color: '#334155' }}>
            {getTitle()}
          </Title>
        </Header>
        <Content className="overflow-y-auto h-[calc(100vh-64px)]">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;