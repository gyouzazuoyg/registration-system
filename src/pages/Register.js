import React, {useState} from "react";
import {Row, Col, Form, Input, Radio, Button, message, Checkbox} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
function Register() {
    const dispatch = useDispatch()
    function register(values){

        if(values.password!==values.confirmpassword){
                 message.error('Passwords do not match!')
        }else{
            console.log(values)
            dispatch(registerUser(values))
        }

    }

    const [checked, setChecked] = useState(false);
    const onCheckboxChange = async (e: any) => {
        await setChecked(e.target.checked);
    };

    const validation = (rule: RuleObject, value: any, callback: (error?: string) => void) => {
        if(checked) {
            return callback()
        }
        return callback("Please accept the terms and conditions")
    };

  return (
      <div className="register">
          <Row justify="center" className='flex align-items-center'>
              <Col lg={5}><h1 className="heading1" data-aos='slide-right'>BYZ</h1></Col>
              <Col lg={10} sm={24} className="bs p-5 register-form">
                  <h3>Register</h3>
                  <hr />
                  <Form layout="vertical" onFinish={register}>
                      <Form.Item
                          name="username"
                          rules={[{ required: true, message: 'Please input your Username!' }]}
                      >
                          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                      </Form.Item>
                      <Form.Item
                          name="password"
                          rules={[{ required: true, message: 'Please input your Password!' }]}
                      >
                          <Input.Password
                              prefix={<LockOutlined className="site-form-item-icon" />}
                              type="password"
                              placeholder="Password"
                          />
                      </Form.Item>
                      <Form.Item
                          name="confirmpassword"
                          rules={[{ required: true, message: 'Please input your Password!' }]}
                      >
                          <Input.Password
                              prefix={<LockOutlined className="site-form-item-icon" />}
                              type="password"
                              placeholder="Confirm password"
                          />
                      </Form.Item>

                      <Row justify="center">
                          <Form.Item name="role"
                                     rules={[{ required: true, message: 'Please select your role!' }]}>
                              <Radio.Group>
                                  <Radio.Button value="student">Student</Radio.Button>
                                  <Radio.Button value="employer">Employer</Radio.Button>
                              </Radio.Group>
                          </Form.Item>
                      </Row>

                      <Row justify="center">
                          <Form.Item
                              name="checkbox"
                              rules={[{validator: validation}]}
                          >
                              <Checkbox checked={checked} onChange={onCheckboxChange}>
                                  I agree with the <Link to="/privacypolicy">Terms and Conditions</Link>
                              </Checkbox><br/>
                          </Form.Item>
                      </Row>

                      <Row justify="center">
                          <Button htmlType="submit" className='mb-3' >Register</Button>
                      </Row>

                      <Row justify="center">
                          <Link to='/login' className='mt-3'>Already registered? Click here to login</Link>
                      </Row>
                  </Form>
              </Col>
              <Col lg={5}><h1 className='heading2'  data-aos='slide-left'>Jobs</h1></Col>
          </Row>
      </div>

  );
}

export default Register;
