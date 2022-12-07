import React from 'react';
import { Descriptions } from 'antd';
import DefaultLayout from '../components/DefaultLayout';

function Billing() {
  const CREDIT_PRICE = 1500;
  let total = 0;

  const userInfo = JSON.parse(localStorage.getItem('user'));
  const allCourses = JSON.parse(localStorage.getItem('courses'));
  const registeredCourseIds = userInfo.registeredCourses;
  let registeredCoursesInfo = [];
  for (const element of registeredCourseIds) {
    const courseId = element['courseid'];
    const courseInfo = allCourses.find((course) => {
      return course._id === courseId;
    });
    if (courseInfo) registeredCoursesInfo.push(courseInfo);
  }
  return (
    <div>
      <DefaultLayout>
        <h1>Billing Information</h1>
        <Descriptions column={1} bordered>
          {registeredCoursesInfo.map((course) => {
            const displayName = course.courseId + ' - ' + course.courseName;
            const credits = course.credits;
            const coursePrice = credits * CREDIT_PRICE;
            total += coursePrice;
            return (
              <Descriptions.Item label={displayName} span={3}>
                $ {coursePrice}
              </Descriptions.Item>
            );
          })}
          <hr />
          <Descriptions.Item label="Total">$ {total}</Descriptions.Item>
        </Descriptions>
      </DefaultLayout>
    </div>
  );
}

export default Billing;
