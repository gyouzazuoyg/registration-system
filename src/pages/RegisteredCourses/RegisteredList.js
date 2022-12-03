import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions/userActions';
import { Button, Table, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

function RegisteredList(props) {
  const { courses } = useSelector((state) => state.coursesReducer);

  const user = JSON.parse(localStorage.getItem('user'));
  // const { users } = useSelector((state) => state.usersReducer);
  // useDispatch(getAllUsers());
  // const user = users.find((user) => user._id === props.id);

  const isWaitlist = props.isWaitlist ? true : false;

  const userRegisteredCourses = [];

  function dropCourse() {
    //dispatch(deleteCourse(course));
  }

  function confirmDropCourse(e) {
    dropCourse();
  }

  function cancel(e) {}

  for (const course of courses) {
    const registeredStudents = isWaitlist
      ? course.waitlistedStudents
      : course.registeredStudents;

    const temp = registeredStudents.find(
      (candidate) => candidate.userid === user._id,
    );

    if (temp) {
      const obj = {
        title: course.courseId,
        department: course.department,
        registeredDate: isWaitlist ? temp.waitlistedDate : temp.registeredDate,
        courseId: [
          <>
            <Link to={`/courses/${course._id}`}>
              <Button>Details</Button>
            </Link>
            <Popconfirm
              title="Are you sure to drop this course?"
              onConfirm={confirmDropCourse}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button>Drop</Button>
            </Popconfirm>
          </>,
        ],
      };

      userRegisteredCourses.push(obj);
    }
  }

  const columns = [
    {
      title: 'Course Number',
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
      title: 'Action',
      dataIndex: 'courseId',
    },
  ];

  return (
    <div>
      <h1>{isWaitlist ? 'Waitlisted Courses' : 'Registered Courses'}</h1>
      <Table columns={columns} dataSource={userRegisteredCourses} />
    </div>
  );
}

export default RegisteredList;
