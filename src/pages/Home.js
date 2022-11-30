import React, { useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCourses } from '../redux/actions/courseActions';
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
function Home() {
  const { courses } = useSelector((state) => state.coursesReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);
  return (
    <div>
      <DefaultLayout>
        <Row gutter={16}>
          {courses.map((course) => {
            return (
              <Col lg={12} sm={24}>
                <div className="course-div bs m-2 p-4">
                  <h4>{course.courseId} - {course.courseName}</h4>
                  <hr />
                  <p>{course.smallDescription}</p>
                  <div className="flex">
                    <p>
                      Salary :{' '}
                      <b>
                        {course.salaryFrom} - {course.salaryTo}
                      </b>{' '}
                      ,{' '}
                    </p>
                    <p style={{ marginLeft: 20 }}>
                      Experience : <b>{course.experience} Years</b>{' '}
                    </p>
                  </div>
                  <hr />

                  <div className="flex justify-content-between">
                    <Link to={`/courses/${course._id}`}>
                      <Button>View</Button>
                    </Link>
                    <p>
                      Posted on : {moment(course.createdAt).format('MMM DD yyyy')}
                    </p>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </DefaultLayout>
    </div>
  );
}

export default Home;
