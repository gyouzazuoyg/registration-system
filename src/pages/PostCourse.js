import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Row, Col, Form, Tabs, Input, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { postCourse } from '../redux/actions/courseActions';
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
function PostCourse() {
  const [courseInfo, setCourseInfo] = useState({});
  const [activeTab, setActiveTab] = useState('0');
  const dispatch = useDispatch();
  function onFirstFormFinish(values) {
    setCourseInfo(values);
    setActiveTab('1');
  }
  function onFinalFormFinish(values) {
    const finalObj = { ...courseInfo, ...values };
    console.log(finalObj);
    dispatch(postCourse(finalObj));
  }
  return (
    <div>
      <DefaultLayout>
        <Tabs defaultActiveKey="0" activeKey={activeTab}>
          <TabPane tab="Course Info" key="0">
            <Form layout="vertical" onFinish={onFirstFormFinish}>
              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="title"
                    rules={[{ required: true }]}
                    label="Title"
                  >
                    <Input placeholder="Enter your course title here" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="department"
                    rules={[{ required: true }]}
                    label="Department"
                  >
                    <Input placeholder="Enter the department or team here" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="experience"
                    rules={[{ required: true }]}
                    label="Experience"
                  >
                    <Input placeholder="Enter required years of experience here" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="credits"
                    rules={[{ required: true }]}
                    label="Credits"
                  >
                    <Input type="number" placeholder="10000" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="prerequisites"
                    rules={[{ required: true }]}
                    label="Skills"
                  >
                    <Input placeholder="Enter required skills here" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="minimumQualification"
                    rules={[{ required: true }]}
                    label="Minimum Qualification"
                  >
                    <Select placeholder="Select minimum qualification for education">
                      <Option value="Associate's">Associate's</Option>
                      <Option value="Bachelor's">Bachelor's</Option>
                      <Option value="Master's">Master's</Option>
                      <Option value="Doctorate">Doctorate</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col lg={24} sm={24}>
                  <Form.Item
                    name="smallDescription"
                    rules={[{ required: true }]}
                    label="Small description"
                  >
                    <TextArea
                      rows={3}
                      placeholder="Tell candidates more about this course"
                    />
                  </Form.Item>
                </Col>

                <Col lg={24} sm={24}>
                  <Form.Item
                    name="fullDescription"
                    rules={[{ required: true }]}
                    label="Full description"
                  >
                    <TextArea
                      rows={6}
                      placeholder="Include any details to inform or attract candidates"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Button htmlType="submit">Next</Button>
            </Form>
          </TabPane>
          <TabPane tab="Department Info" key="1">
            <Form layout="vertical" onFinish={onFinalFormFinish}>
              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="department"
                    label="Department Name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter department name here" />
                  </Form.Item>
                </Col>
                <Col lg={24} sm={24}>
                  <Form.Item
                    name="departmentDescription"
                    label="Department Description"
                    rules={[{ required: true }]}
                  >
                    <TextArea
                      rows={3}
                      placeholder="Introduce your department to others!"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Button
                onClick={() => {
                  setActiveTab('0');
                }}
              >
                Previous
              </Button>
              <Button htmlType="submit">Post Course</Button>
            </Form>
          </TabPane>
        </Tabs>
      </DefaultLayout>
    </div>
  );
}

export default PostCourse;
