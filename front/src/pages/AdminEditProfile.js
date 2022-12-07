import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Row, Col, Form, Tabs, Input, Button, Alert, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchSkills, updateUser } from '../redux/actions/userActions';
import RegisteredList from './RegisteredCourses/RegisteredList';
import PostedList from './PostedCourses/PostedList';
import CommentsList from './CommentsList';
import { getAccordionSummaryUtilityClass } from '@mui/material';

const { TextArea, Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

function Profile() {
  const [personalInfo, setPersonalInfo] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const dispatch = useDispatch();

  function onFinalFinish(values) {
    setPersonalInfo(values);
    const finalObj = { ...personalInfo, ...values };

    console.log(finalObj);

    dispatch(updateUser(finalObj));
  }

  function callbackTabClicked(key, event) {
    setActiveTab(key);
  }

  return (
    <div>
      <DefaultLayout>
        <Tabs
          defaultActiveKey="1"
          activeKey={activeTab}
          onTabClick={callbackTabClicked}
        >
          <TabPane tab="User Info" key="1">
            <Form layout="vertical" onFinish={onFinalFinish}>
              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Target User ID"
                    required
                    rules={[{ required: true }]}
                    name="_id"
                  >
                    <Input placeholder="Enter target user ID" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="First name"
                    rules={[{ required: false }]}
                    name="firstName"
                  >
                    <Input placeholder="Enter the legal first name" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Last name"
                    rules={[{ required: false }]}
                    name="lastName"
                  >
                    <Input placeholder="Enter the legal last name" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Email"
                    rules={[{ required: false }]}
                    name="email"
                  >
                    <Input placeholder="ex: neucourses@gmail.com" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Mobile Number"
                    rules={[{ required: false }]}
                    name="mobileNumber"
                  >
                    <Input placeholder="Please enter a valid U.S. number" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Major"
                    rules={[{ required: false }]}
                    name="major"
                  >
                    <Input placeholder="Enter the major" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Department"
                    rules={[{ required: false }]}
                    name="department"
                  >
                    <Input placeholder="Enter the department" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Advisor ID"
                    rules={[{ required: false }]}
                    name="advisor"
                  >
                    <Input
                      type="number"
                      placeholder="Enter the student's advisor ID"
                    />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Campus"
                    rules={[{ required: false }]}
                    name="campus"
                  >
                    <Input placeholder="Enter the campus" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="College"
                    rules={[{ required: false }]}
                    name="college"
                  >
                    <Input placeholder="Enter the college" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Required Credits"
                    rules={[{ required: false }]}
                    name="requiredCredits"
                  >
                    <Input type="number" placeholder="ex: 32" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Acquired Credits"
                    rules={[{ required: false }]}
                    name="acquiredCredits"
                  >
                    <Input type="number" placeholder="ex: 4" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Time Ticket From"
                    rules={[{ required: false }]}
                    name="timeTicketFrom"
                  >
                    <Input placeholder="ex: YYYY-MM-DD HH:MM:SS" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Time Ticket To"
                    rules={[{ required: false }]}
                    name="timeTicketTo"
                  >
                    <Input placeholder="ex: YYYY-MM-DD HH:MM:SS" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Office Hour"
                    rules={[{ required: false }]}
                    name="officeHour"
                  >
                    <Input placeholder="Enter a string" />
                  </Form.Item>
                </Col>
                <Col lg={24} sm={24}>
                  <Form.Item
                    label="About"
                    rules={[{ required: false }]}
                    name="about"
                  >
                    <TextArea
                      rows={4}
                      placeholder="Introduce yourself to others!"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Button htmlType="submit">Update</Button>
            </Form>
          </TabPane>
        </Tabs>
      </DefaultLayout>
    </div>
  );
}

export default Profile;
