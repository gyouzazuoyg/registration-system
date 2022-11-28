import { Layout, Menu } from 'antd';
import React from 'react';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PlusSquareOutlined,
  HomeOutlined,
  UserOutlined,
  PlusOutlined,
  CheckOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import { Footer } from 'antd/es/layout/layout';

const { Header, Sider, Content } = Layout;

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{
            position: 'sticky',
            overflow: 'auto',
            height: '100%',
            top: 0,
          }}
        >
          <div className="logo">
            {this.state.collapsed ? <h1>NEU</h1> : <h1>NEU Courses</h1>}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
            style={{
              width: 250,
            }}
          >
            <Menu.Item key="/" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            {user.role === 'guest' || user.role === 'admin' ? (
              <></>
            ) : (
              <Menu.Item key="/profile" icon={<UserOutlined />}>
                <Link to="/profile">Profile</Link>
              </Menu.Item>
            )}
            {user.role === 'student' ? (
              <Menu.Item key="/registeredcourses" icon={<PlusSquareOutlined />}>
                <Link to="/registeredcourses">Registered Courses</Link>
              </Menu.Item>
            ) : user.role === 'employer' ? (
              <>
                <Menu.Item key="/postcourse" icon={<PlusOutlined />}>
                  <Link to="/postcourse">Post Course</Link>
                </Menu.Item>
                <Menu.Item key="/posted" icon={<CheckOutlined />}>
                  <Link to="/posted">Posted</Link>
                </Menu.Item>
              </>
            ) : (
              <></>
            )}

            {user.role === 'guest' ? (
              <Menu.Item key="/logout" icon={<LogoutOutlined />}>
                <Link onClick={this.logout}>Login</Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="/logout" icon={<LogoutOutlined />}>
                <Link onClick={this.logout}>Logout</Link>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              position: 'sticky',
              overflow: 'auto',
              top: 0,
              zIndex: 9999,
            }}
          >
            <div className="flex justify-content-between">
              <div className="p-3">
                {React.createElement(
                  this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: 'trigger',
                    onClick: this.toggle,
                  },
                )}
              </div>

              <div>
                <Filter />
              </div>

              <div
                style={{ display: this.state.collapsed ? 'none' : 'inline' }}
              >
                {user.role === 'guest' || user.role === 'admin' ? (
                  <h5 className="mr-2">
                    <b>{user.username}</b>
                  </h5>
                ) : (
                  <Link to="/profile">
                    <h5 className="mr-2">
                      <b>{user.username}</b>
                    </h5>
                  </Link>
                )}
              </div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            NEUCourses ©2021 Created by Bowei Zhang & Yongxian Hao & Zixuan Xu{' '}
            <Link to="/privacypolicy">Privacy Policy</Link>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default DefaultLayout;
