import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';

function RegisteredList() {
  const { courses } = useSelector((state) => state.coursesReducer);

  const user = JSON.parse(localStorage.getItem('user'));

  const userRegisteredCourses = [];

  for (const course of courses) {
    const registeredCandidates = course.registeredCandidates;

    const temp = registeredCandidates.find(
      (candidate) => candidate.userid === user._id,
    );

    if (temp) {
      const obj = {
        title: course.title,
        department: course.department,
        registeredDate: temp.registeredDate,
        courseId: (
          <Link to={`/courses/${course._id}`}>
            <Button>Redirect</Button>
          </Link>
        ),
      };

      userRegisteredCourses.push(obj);
    }
  }

  const columns = [
    {
      title: 'Course Title',
      dataIndex: 'title',
    },
    {
      title: 'Department',
      dataIndex: 'department',
    },
    {
      title: 'Registered Date',
      dataIndex: 'registeredDate',
    },
    {
      title: 'Link to Course',
      dataIndex: 'courseId',
    },
  ];

  return (
    <div>
      <h1>Registered Courses</h1>
      <Table columns={columns} dataSource={userRegisteredCourses} />
    </div>
  );
}

export default RegisteredList;
