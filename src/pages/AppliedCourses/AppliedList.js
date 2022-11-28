import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';

function AppliedList() {
  const { courses } = useSelector((state) => state.coursesReducer);

  const user = JSON.parse(localStorage.getItem('user'));

  const userAppliedCourses = [];

  for (const course of courses) {
    const appliedCandidates = course.appliedCandidates;

    const temp = appliedCandidates.find(
      (candidate) => candidate.userid === user._id,
    );

    if (temp) {
      const obj = {
        title: course.title,
        company: course.company,
        appliedDate: temp.appliedDate,
        courseId: (
          <Link to={`/courses/${course._id}`}>
            <Button>Redirect</Button>
          </Link>
        ),
      };

      userAppliedCourses.push(obj);
    }
  }

  const columns = [
    {
      title: 'Course Title',
      dataIndex: 'title',
    },
    {
      title: 'Company',
      dataIndex: 'company',
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
    },
    {
      title: 'Link to Course',
      dataIndex: 'courseId',
    },
  ];

  return (
    <div>
      <h1>AppliedCourses</h1>
      <Table columns={columns} dataSource={userAppliedCourses} />
    </div>
  );
}

export default AppliedList;
