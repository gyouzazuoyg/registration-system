import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { Row, Col, Form, Tabs, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { editCourse } from '../redux/actions/courseActions';
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

function EditCourse({ match }) {
  const [courseInfo, setCourseInfo] = useState({});
  const [activeTab, setActiveTab] = useState('0');
  const dispatch = useDispatch();
  function onFirstFormFinish(values) {
    setCourseInfo(values);
    setActiveTab('1');
  }
  function onFinalFormFinish(values) {
    const finalObj = { ...courseInfo, ...values };

    finalObj._id = match.params.id;
    console.log(finalObj);
    dispatch(editCourse(finalObj));
  }

  const { courses } = useSelector((state) => state.coursesReducer);

  const course = courses.find((course) => course._id === match.params.id);

  console.log(course);

  return (
    <div>
      <DefaultLayout>
        <Tabs defaultActiveKey="0" activeKey={activeTab}>
          <TabPane tab="Course Info" key="0">
            <Form
              layout="vertical"
              onFinish={onFirstFormFinish}
              initialValues={course}
            >
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

                <Col lg={24} sm={24}>
                  <Form.Item
                    name="courseDescription"
                    rules={[{ required: true }]}
                    label="Small description"
                  >
                    <TextArea
                      rows={3}
                      placeholder="Tell candidates more about this course"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Button htmlType="submit">Next</Button>
            </Form>
          </TabPane>
          <TabPane tab="Department Info" key="1">
            <Form
              layout="vertical"
              onFinish={onFinalFormFinish}
              initialValues={course}
            >
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
              </Row>
              <Button
                onClick={() => {
                  setActiveTab('0');
                }}
              >
                Previous
              </Button>
              <Button htmlType="submit">Edit Course</Button>
            </Form>
          </TabPane>
        </Tabs>
      </DefaultLayout>
    </div>
  );
}

export default EditCourse;
