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
      title: 'Title',
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
      title: 'Applied Candidates',
      dataIndex: 'appliedCandidates',
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
                showModal(course);
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
      title: course.title,
      courseId: (
        <Link to={`/courses/${course._id}`}>
          <Button>Redirect</Button>
        </Link>
      ),
      postedOn: moment(course.createdAt).format('MMM DD yyyy'),
      appliedCandidates: course.appliedCandidates.length,
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
        title: 'Candidate Id',
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
      { title: 'Applied Date', dataIndex: 'appliedDate' },
    ];

    let candidatesDatasource = [];

    for (let candidate of selectedCourse.appliedCandidates) {
      let user = allusers.find((user) => user._id === candidate.userid);

      let obj = {
        candidateId: user._id,
        fullName: user.firstName + ' ' + user.lastName,
        appliedDate: candidate.appliedDate,
      };

      candidatesDatasource.push(obj);
    }

    return (
      <Table columns={candidatesColumns} dataSource={candidatesDatasource} />
    );
  }

  console.log(userPostedCourses);
  return (
    <div>
      <h1>Posted Courses</h1>

      <Table columns={columns} dataSource={dataSource} />

      <Modal
        title="Applied Candidates List"
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
