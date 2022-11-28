import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { loginUser } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons'; // You can also use <link> for styles
// ..
AOS.init();

function Login() {
  const dispatch = useDispatch();
  function login(values) {
    dispatch(loginUser(values));
  }

  function guestLogin() {
    const guestCredential = {
      username: 'guest',
      password: 'guest',
    };
    dispatch(loginUser(guestCredential));
  }

  return (
    <div className="login">
      <Row justify="center" className="flex align-items-center">
        <Col lg={5}>
          <h1 className="heading1" data-aos="slide-left">
            NEU
          </h1>
        </Col>
        <Col lg={10} sm={24} className="p-5 login-form">
          <h3>Login</h3>
          <hr />

          <Form layout="vertical" onFinish={login}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Row justify="center">
              <Button htmlType="submit" className="mb-3">
                Login
              </Button>
              <Button onClick={guestLogin} className="mb-3">
                Visit as guest
              </Button>
            </Row>

            <Row justify="center">
              <Link to="/register" className="mt-3">
                Not registered? Click here to register
              </Link>
            </Row>
          </Form>
        </Col>
        <Col lg={5}>
          <h1 className="heading2" data-aos="slide-right">
            Courses
          </h1>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
