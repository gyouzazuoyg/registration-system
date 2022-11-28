import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Row, Col, Form, Tabs, Input, Button, Alert, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { searchSkills, updateUser } from '../redux/actions/userActions';
import RegisteredList from './RegisteredCourses/RegisteredList';
import PostedList from './PostedCourses/PostedList';
import CommentsList from './CommentsList';

const { TextArea, Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

function Profile() {
  const [personalInfo, setPersonalInfo] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const dispatch = useDispatch();

  function onPersonInfoSubmit(values) {
    setPersonalInfo(values);
    console.log(values);
    setActiveTab('2');
  }

  function onFinalFinish(values) {
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

  const user = JSON.parse(localStorage.getItem('user'));

  function onSearch(value) {
    const query = {
      keyword: value,
    };
    dispatch(searchSkills(query));
  }

  function callbackTabClicked(key, event) {
    setActiveTab(key);
  };

  // Comment out Skill tab page
  // const queryResults = JSON.parse(localStorage.getItem('skills'));
  const children = [];
  // for (const result of queryResults) {
  //   children.push(<Option key={result.name}>{result.name}</Option>);
  // }

  return (
    <div>
      <DefaultLayout>
        <Tabs defaultActiveKey="1" activeKey={activeTab} onTabClick={callbackTabClicked}>
          <TabPane tab="Personal Info" key="1">
            <Form
              layout="vertical"
              onFinish={
                user.role === 'student' ? onPersonInfoSubmit : onEmployFinish
              }
              initialValues={user}
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
                <Col lg={8} sm={24}>
                  <Form.Item
                    label="Portfolio"
                    rules={[{ required: false }]}
                    name="portfolio"
                  >
                    <Input placeholder="Put your portfolio link here" />
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
                <Col lg={24} sm={24}>
                  <Form.Item
                    label="Address"
                    rules={[{ required: false }]}
                    name="address"
                  >
                    <TextArea rows={4} placeholder="Enter your address here" />
                  </Form.Item>
                </Col>
              </Row>
              <Button htmlType="submit">Next</Button>
              {user.role === 'student' ? (
                ''
              ) : (
                <Button htmlType="submit">Update</Button>
              )}
            </Form>
          </TabPane>
          {user.role === 'student' ? (
            <TabPane tab="Skills and Education" key="2">
              <Form
                initialValues={user}
                layout="vertical"
                onFinish={onFinalFinish}
              >
                <Row>
                  <Col lg={24} sm={24}>
                    <Form.List name="education">
                      {(education, { add, remove }) => (
                        <div>
                          {education.map((field, index) => (
                            <div className="flex">
                              <Form.Item
                                required
                                {...field}
                                label="Education"
                                style={{ width: '80%' }}
                                rules={[{ required: false }]}
                              >
                                <TextArea
                                  rows={4}
                                  placeholder="Enter your degree, school name, and major etc."
                                />
                              </Form.Item>
                              <Button
                                onClick={() => {
                                  add();
                                }}
                              >
                                Add more
                              </Button>
                              {index !== 0 && (
                                <Button
                                  onClick={() => {
                                    remove(index);
                                  }}
                                >
                                  Delete
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </Form.List>
                  </Col>

                  <Col lg={24} sm={24}>
                    <Form.Item label="Skills" required className="mb-1">
                      <Search
                        placeholder="Search skills here first"
                        style={{ width: '80%' }}
                        onSearch={onSearch}
                        enterButton
                      />
                    </Form.Item>
                    <Form.Item
                      style={{ width: '80%' }}
                      rules={[{ required: false }]}
                      name="skills"
                    >
                      <Select
                        mode="tags"
                        placeholder="Then select your skills here"
                        style={{ width: '100%' }}
                      >
                        {children}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col lg={24} sm={24}>
                    <Form.List name="projects">
                      {(projects, { add, remove }) => (
                        <div>
                          {projects.map((field, index) => (
                            <div className="flex">
                              <Form.Item
                                {...field}
                                label="Project"
                                style={{ width: '80%' }}
                                rules={[{ required: false }]}
                              >
                                <TextArea
                                  rows={4}
                                  placeholder="Include any academic projects here to show your ability"
                                />
                              </Form.Item>
                              <Button
                                onClick={() => {
                                  add();
                                }}
                              >
                                Add more
                              </Button>
                              {index !== 0 && (
                                <Button
                                  onClick={() => {
                                    remove(index);
                                  }}
                                >
                                  Delete
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </Form.List>
                  </Col>
                  <Col lg={24} sm={24}>
                    <Form.List name="experience">
                      {(experience, { add, remove }) => (
                        <div>
                          {experience.map((field, index) => (
                            <div className="flex">
                              <Form.Item
                                {...field}
                                label="Experience"
                                style={{ width: '80%' }}
                                rules={[{ required: false }]}
                              >
                                <TextArea
                                  rows={4}
                                  placeholder="Include all your professional experience here"
                                />
                              </Form.Item>
                              <Button
                                onClick={() => {
                                  add();
                                }}
                              >
                                Add more
                              </Button>
                              {index !== 0 && (
                                <Button
                                  onClick={() => {
                                    remove(index);
                                  }}
                                >
                                  Delete
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </Form.List>
                  </Col>
                </Row>
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
                <Button htmlType="submit">Update</Button>
              </Form>
            </TabPane>
          ) : (
            ''
          )}
          {user.role === 'student' ? (
            <TabPane tab="Registered Courses" key="3">
              <RegisteredList />
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
          {user.role === 'student' ? (
            <TabPane tab="My Comments" key="4">
              <CommentsList />
              <Button
                onClick={() => {
                  setActiveTab('3');
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
