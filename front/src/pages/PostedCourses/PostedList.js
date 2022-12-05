import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Modal, Button } from 'antd';
import { EditOutlined, OrderedListOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom';

function PostedList() {
  let course;
  const allcourses = useSelector((state) => state.coursesReducer).courses;
  const allusers = useSelector((state) => state.usersReducer).users;
  const userid = JSON.parse(localStorage.getItem('user'))._id;
  const userPostedCourses = allcourses.filter((course) => course.postedBy === userid);
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState();

  const columns = [
    {
      title: 'Course Number',
      dataIndex: 'title',
    },
    {
      title: 'Posted On',
      dataIndex: 'postedOn',
    },
    {
      title: 'Link to Post',
      dataIndex: 'courseId',
    },
    {
      title: 'Registered Students',
      dataIndex: 'registeredStudents',
    },
    {
      title: 'Waitlisted Students',
      dataIndex: 'waitlistedStudents'
    },
    {
      title: 'Actions',
      render: (text, data) => {
        return (
          <div className="flex">
            <EditOutlined
              className="mr-2"
              style={{ fontSize: 20 }}
              onClick={() => {
                history.push(`/editcourse/${data.completeCourseData._id}`);
              }}
            />
            <OrderedListOutlined
              style={{ fontSize: 20 }}
              onClick={() => {
                showModal(data.completeCourseData);
              }}
            />
          </div>
        );
      },
    },
  ];

  const dataSource = [];

  for (course of userPostedCourses) {
    const obj = {
      title: course.courseId,
      courseId: (
        <Link to={`/courses/${course._id}`}>
          <Button>Details</Button>
        </Link>
      ),
      postedOn: moment(course.createdAt).format('MMM DD yyyy'),
      registeredStudents: course.registeredStudents.length,
      completeCourseData: course,
    };
    dataSource.push(obj);
  }

  const showModal = (course) => {
    setIsModalVisible(true);
    setSelectedCourse(course);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function CandidatesList() {
    const candidatesColumns = [
      {
        title: 'Student Id',
        dataIndex: 'candidateId',
        render: (text, data) => {
          return (
            <Link to={`/users/${data.candidateId}`}>{data.candidateId}</Link>
          );
        },
      },
      {
        title: 'Full Name',
        dataIndex: 'fullName',
      },
      { title: 'Registered Date', dataIndex: 'registeredDate' },
    ];

    let candidatesDatasource = [];

    for (let candidate of selectedCourse.registeredStudents) {
      let user = allusers.find((user) => user._id === candidate.userid);

      let obj = {
        candidateId: user._id,
        fullName: user.firstName + ' ' + user.lastName,
        registeredDate: candidate.registeredDate,
      };

      candidatesDatasource.push(obj);
    }

    return (
      <Table columns={candidatesColumns} dataSource={candidatesDatasource} />
    );
  }


  return (
    <div>
      <h1>Posted Courses</h1>

      <Table columns={columns} dataSource={dataSource} />

      <Modal
        title="Registered Students List"
        visible={isModalVisible}
        closable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <CandidatesList />
      </Modal>
    </div>
  );
}

export default PostedList;
