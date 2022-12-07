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
  const curUser = JSON.parse(localStorage.getItem('user'));
  const allUsers = JSON.parse(localStorage.getItem('users'));

  const [userInfo, setUserInfo] = useState(curUser)
  const [personalInfo, setPersonalInfo] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const dispatch = useDispatch();

  function onPersonInfoSubmit(values) {
    setPersonalInfo(...personalInfo, ...values);
    console.log('values', values);
    setActiveTab('2');
  }

  function onFinalFinish(values) {
    setPersonalInfo(values);
    const finalObj = { ...personalInfo, ...values };

    console.log(finalObj);

    dispatch(updateUser(finalObj));
  }

  function onEmployFinish(values) {
    setPersonalInfo(values);

    const finalObj = { ...personalInfo, ...values };
    dispatch(updateUser(finalObj));
    setActiveTab('2');
  }

  const getAdvisor = () => {
    for (const user in allUsers) {
      if (allUsers[user]._id === curUser.advisor) {
        return allUsers[user];
      }
    }
  };
  const advisorName = getAdvisor()?.username;

  function onSearch(value) {
    const query = {
      keyword: value,
    };
    dispatch(searchSkills(query));
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
          <TabPane tab="Personal Info" key="1">
            <Form
              layout="vertical"
              onFinish={onFinalFinish}
              initialValues={curUser}
            >
              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="First name"
                    required
                    rules={[{ required: false }]}
                    name="firstName"
                  >
                    <Input placeholder="Enter your legal first name" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Last name"
                    required
                    rules={[{ required: false }]}
                    name="lastName"
                  >
                    <Input placeholder="Enter your legal last name" />
                  </Form.Item>
                </Col>
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Email"
                    required
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
              <Button htmlType="submit">Next</Button>
              <Button htmlType="submit">Update</Button>
            </Form>
          </TabPane>
          {curUser.role === 'student' ? (
            <TabPane tab="Academic Info" key="2">
              <h1>Academic Information</h1>
              <p>
                <b>Department</b> : {curUser.department}
              </p>
              <p>
                <b>College</b> : {curUser.college}
              </p>
              <p>
                <b>Campus</b> : {curUser.campus}
              </p>
              <p>
                <b>Advisor</b> : <Link to={`/users/${curUser.advisor}`}>{advisorName}</Link>
              </p>
              <p>
                <b>Required Credits</b> : {curUser.requiredCredits}
              </p>
              <p>
                <b>Acquired Credits</b> : {curUser.acquiredCredits}
              </p>

              <p>
                <b>Time Ticket</b> :{' '}
                {curUser.timeTicketFrom + ' - ' + curUser.timeTicketTo}
              </p>
              <hr />

              <Button
                onClick={() => {
                  setActiveTab('1');
                }}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  setActiveTab('3');
                }}
              >
                Next
              </Button>
            </TabPane>
          ) : (
            ''
          )}
          {curUser.role === 'student' ? (
            <TabPane tab="Registered Courses" key="3">
              <RegisteredList isWaitlist={false}/>
              <Button
                onClick={() => {
                  setActiveTab('2');
                }}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  setActiveTab('4');
                }}
              >
                Next
              </Button>
            </TabPane>
          ) : (
            <TabPane tab="Posted Courses" key="2">
              <PostedList />
              <Button
                onClick={() => {
                  setActiveTab('1');
                }}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  setActiveTab('3');
                }}
              >
                Next
              </Button>
            </TabPane>
          )}
          {curUser.role === 'student' ? (
            <TabPane tab="Waitlisted Courses" key="4">
              <RegisteredList isWaitlist={true}/>
              <Button
                onClick={() => {
                  setActiveTab('3');
                }}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  setActiveTab('5');
                }}
              >
                Next
              </Button>
            </TabPane>
          ) : (
            ''
          )}
          {curUser.role === 'student' ? (
            <TabPane tab="My Comments" key="5">
              <CommentsList />
              <Button
                onClick={() => {
                  setActiveTab('4');
                }}
              >
                Previous
              </Button>
            </TabPane>
          ) : (
            <TabPane tab="My Comments" key="3">
              <CommentsList />
              <Button
                onClick={() => {
                  setActiveTab('2');
                }}
              >
                Previous
              </Button>
            </TabPane>
          )}
        </Tabs>
      </DefaultLayout>
    </div>
  );
}

export default Profile;
