import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  HomeOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import ExistingRooms2 from '../room/UsersRoom'; // Import the ExistingRooms component
import ExistingBooking from '../booking/ExistingBooking'; // Import the ExistingBooking component
import UserList from '../User/UserList'; // Import the ListUser component
import Statics from './Statics';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('User');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setCurrentPage(e.key);
  };

  return (
    <div className=""style={{ height: '100%', width: '100%' }}>
      
      <Layout style={{ height: '100%', width: '100%' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical " />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['User']}
            onClick={handleMenuClick}
            items={[
              {
                key: 'User',
                icon: <UserOutlined />,
                label: 'User',
              },
              {
                key: 'Room',
                icon: <HomeOutlined />,
                label: 'Room',
              },
              {
                key: 'Booking',
                icon: <ReadOutlined />,
                label: 'Booking',
              },
              {
                key: 'Statics',
                icon: <UploadOutlined />,
                label: 'Statics',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header 
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
        <span style={{ marginLeft: '10px', fontSize: '20px', fontWeight: 'bold' }}>Admin Panel</span>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {currentPage === 'User' && <UserList/>}
            {currentPage === 'Room' && <ExistingRooms2/>}
            {currentPage === 'Booking' && <ExistingBooking/>}
            {currentPage === 'Statics' && <Statics  />}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
