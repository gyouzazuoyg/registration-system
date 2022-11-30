import { Input, Modal, Form, Select, Button } from 'antd';
import React, { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { searchCourses, sortCourses } from '../redux/actions/courseActions';

const { Search } = Input;
const { Option } = Select;
function Filter() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function sort(values) {
    dispatch(sortCourses(values));
    handleCancel();
  }

  function clearSort(values) {
    values.campus = undefined
    dispatch(sortCourses(values));
    handleCancel();
  }

  return (
    <div className="flex">
      <Search
        onSearch={(value) => {
          dispatch(searchCourses(value));
        }}
        placeholder="Search here"
      />
      <FilterOutlined onClick={showModal} />

      <Modal
        title="Select filters"
        footer={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={true}
      >
        <Form layout="vertical" onFinish={sort}>
          <Form.Item name="campus" label="Campus">
            <Select>
              <Option value={'Boston'}>Boston</Option>
              <Option value={'Seattle'}>Seattle</Option>
              <Option value={'Silicon Valley'}>Silicon Valley</Option>
              <Option value={'San Francisco'}>San Francisco</Option>
              <Option value={'Portland'}>Portland</Option>
            </Select>
          </Form.Item>
          <Button htmlType="submit">Filter</Button>
          <Button onClick={clearSort}>Clear</Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Filter;
