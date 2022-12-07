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
  function onFirstFormFinish(courseInfo) {
    setCourseInfo(courseInfo);
    setActiveTab('1');
  }
  function onFinalFormFinish(locationInfo) {
    const finalObj = { ...courseInfo, ...locationInfo };
    dispatch(postCourse(finalObj));
  }
  function callbackTabClicked(key, event) {
    setActiveTab(key);
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
                    name="crn"
                    rules={[{ required: true }]}
                    label="Course CRN"
                  >
                    <Input placeholder="Enter the course CRN here" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="courseId"
                    rules={[{ required: true }]}
                    label="Course Id"
                  >
                    <Input placeholder="Enter the course id here" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="courseName"
                    rules={[{ required: true }]}
                    label="Course Name"
                  >
                    <Input placeholder="Enter the course name here" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="term"
                    rules={[{ required: true }]}
                    label="Term"
                  >
                    <Input placeholder="Enter course term here" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="credits"
                    rules={[{ required: true }]}
                    label="Credits"
                  >
                    <Input type="number" placeholder="4" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="professor"
                    rules={[{ required: false }]}
                    label="Professor"
                  >
                    <Input placeholder="Enter teaching professor here" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="prerequisites"
                    rules={[{ required: false }]}
                    label="Prerequisites"
                  >
                    <Input placeholder="Enter the prerequisites here" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="capacity"
                    rules={[{ required: true }]}
                    label="Course Capacity"
                  >
                    <Input type="number" placeholder="20" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="waitlistCapacity"
                    rules={[{ required: true }]}
                    label="Waitlist Capacity"
                  >
                    <Input type="number" placeholder="20" />
                  </Form.Item>
                </Col>

                <Col lg={24} sm={24}>
                  <Form.Item
                    name="schedule"
                    rules={[{ required: false }]}
                    label="Course Schedule"
                  >
                    <TextArea
                      rows={1}
                      placeholder="Enter the course schedule here"
                    />
                  </Form.Item>
                </Col>

                <Col lg={24} sm={24}>
                  <Form.Item
                    name="courseDescription"
                    rules={[{ required: false }]}
                    label="Course Description"
                  >
                    <TextArea
                      rows={3}
                      placeholder="Enter the course description here"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Button htmlType="submit">Next</Button>
            </Form>
          </TabPane>
          <TabPane tab="Location Info" key="1">
            <Form layout="vertical" onFinish={onFinalFormFinish}>
              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="department"
                    label="Department"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter department here" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="college"
                    label="College"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Enter college here" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={8} sm={24}>
                  <Form.Item
                    name="classroom"
                    label="Classroom"
                    rules={[{ required: false }]}
                  >
                    <Input placeholder="Enter classroom here" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="building"
                    label="Building"
                    rules={[{ required: false }]}
                  >
                    <Input placeholder="Enter building name here" />
                  </Form.Item>
                </Col>

                <Col lg={8} sm={24}>
                  <Form.Item
                    name="campus"
                    label="Campus"
                    rules={[{ required: false }]}
                  >
                    <Select>
                      <Option value={'Boston'}>Boston</Option>
                      <Option value={'Seattle'}>Seattle</Option>
                      <Option value={'Silicon Valley'}>Silicon Valley</Option>
                      <Option value={'San Francisco'}>San Francisco</Option>
                      <Option value={'Portland'}>Portland</Option>
                    </Select>
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
