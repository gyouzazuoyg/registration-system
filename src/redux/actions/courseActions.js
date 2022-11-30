import { message } from 'antd';
import axios from 'axios';
export const getAllCourses = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.get('/api/courses/getallcourses');
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

  dispatch({ type: 'LOADING', payload: true });
  try {
    await axios.post('/api/courses/registercourse', { course, user });

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

export const searchCourses = (searchKey) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.get('/api/courses/getallcourses');

    const courses = response.data;

    const filteredCourses = courses.filter((course) =>
      course.title.toLowerCase().includes(searchKey.toLowerCase()),
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

    let filteredCourses = courses;

    if (values.experience !== undefined) {
      filteredCourses = courses.filter(
        (course) => course.experience <= values.experience,
      );
    }
    // if (values.salary !== undefined) {
    //   filteredCourses = courses.filter((course) => course.salaryTo >= values.salary);
    // }

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
