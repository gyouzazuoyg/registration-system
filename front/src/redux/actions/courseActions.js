import { message } from 'antd';
import axios from 'axios';
import moment from 'moment';

export const getAllCourses = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.get('/api/courses/getallcourses');
    for (const courseInfo of response.data) {
      const crn = courseInfo._id;
      const responseRegisteredStudents = await axios.post(
        '/api/courses/getregisteredstudents',
        { crn: crn },
      );
      const responseWaitlisttedStudents = await axios.post(
        '/api/courses/getwaitlistedstudents',
        { crn: crn },
      );
      const registeredStudents = responseRegisteredStudents.data;
      const waitlistedStudents = responseWaitlisttedStudents.data;
      courseInfo.registeredStudents = registeredStudents;
      courseInfo.waitlistedStudents = waitlistedStudents;
    }
    dispatch({ type: 'GET_ALL_JOBS', payload: response.data });
    dispatch({ type: 'LOADING', payload: false });
    localStorage.setItem('courses', JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const postCourse = (values) => async (dispatch) => {
  values.postedBy = JSON.parse(localStorage.getItem('user'))._id;
  values.createdAt = moment().format('YYYY-MM-DD hh:mm:ss');

  dispatch({ type: 'LOADING', payload: true });
  try {
    await axios.post('/api/courses/postcourse', values);

    dispatch({ type: 'LOADING', payload: false });
    message.success('Course Posted Successfully');

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const editCourse = (values) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    await axios.post('/api/courses/editcourse', values);

    dispatch({ type: 'LOADING', payload: false });
    message.success('Course Updated Successfully');

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const deleteCourse = (values) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    await axios.post('/api/courses/deletecourse', values);

    dispatch({ type: 'LOADING', payload: false });
    message.success('Course Deleted Successfully');

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const registerCourse = (course) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const dateTime = moment().format('YYYY-MM-DD hh:mm:ss');

  dispatch({ type: 'LOADING', payload: true });
  try {
    await axios.post('/api/users/registercourse', { course, user, dateTime });

    dispatch({ type: 'LOADING', payload: false });
    message.success('Course registered Successfully');

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const waitlistCourse = (course) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const dateTime = moment().format('YYYY-MM-DD hh:mm:ss');

  dispatch({ type: 'LOADING', payload: true });
  try {
    await axios.post('/api/users/waitlistcourse', { course, user, dateTime });

    dispatch({ type: 'LOADING', payload: false });
    message.success('Course Waitlisted Successfully');

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const searchCourses = (searchKey) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.get('/api/courses/getallcourses');

    const courses = response.data;

    let filteredCourses = courses;

    filteredCourses = courses.filter((course) =>
      (course.courseId + course.courseName)
        .toLowerCase()
        .includes(searchKey.toLowerCase()),
    );

    dispatch({ type: 'GET_ALL_JOBS', payload: filteredCourses });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const sortCourses = (values) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.get('/api/courses/getallcourses');

    const courses = response.data;
    console.log(values);

    let filteredCourses = courses;

    if (values.campus !== undefined) {
      filteredCourses = courses.filter(
        (course) => course.campus === values.campus,
      );
    }

    dispatch({ type: 'GET_ALL_JOBS', payload: filteredCourses });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const commentCourses = (course, content) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  dispatch({ type: 'LOADING', payload: true });
  try {
    await axios.post('/api/courses/commentcourse', { user, course, content });

    dispatch({ type: 'LOADING', payload: false });
    message.success('Comment Posted Successfully');

    const response = await axios.get('/api/courses/getallcourses');
    const courses = response.data;
    dispatch({ type: 'GET_ALL_JOBS', payload: courses });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const deleteComment = (course, id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(id);
  dispatch({ type: 'LOADING', payload: true });
  try {
    await axios.post('/api/courses/deletecomment', { course, user, id });

    dispatch({ type: 'LOADING', payload: false });
    message.success('Comment Deleted Successfully');

    const response = await axios.get('/api/courses/getallcourses');
    const courses = response.data;
    dispatch({ type: 'GET_ALL_JOBS', payload: courses });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};
