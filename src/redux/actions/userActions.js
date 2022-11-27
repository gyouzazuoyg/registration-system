import axios from 'axios';
import { message } from 'antd';
export const registerUser = (values) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    await axios.post('/api/users/register', values);
    message.success('User Registered Successfully');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    message.error('Username existed');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const loginUser = (values) => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const user = await axios.post('/api/users/login', values);
    if (values.username !== 'guest') {
      message.success('Login success');
    }
    localStorage.setItem('user', JSON.stringify(user.data));
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    message.error('invalid credentials');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const updateUser = (values) => async (dispatch) => {
  const userid = JSON.parse(localStorage.getItem('user'))._id;

  values._id = userid;

  dispatch({ type: 'LOADING', payload: true });

  try {
    const user = await axios.post('/api/users/update', values);
    message.success('User updated successfully');
    localStorage.setItem('user', JSON.stringify(user.data));
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    message.error('something went wrong , please try later');
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.get('/api/users/getallusers');
    dispatch({ type: 'GET_ALL_USERS', payload: response.data });
    dispatch({ type: 'LOADING', payload: false });
    localStorage.setItem('users', JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const searchSkills = (values) => async (dispatch) => {
  console.log('in actions');
  console.log(values);
  dispatch({ type: 'LOADING', payload: true });
  try {
    const response = await axios.post('/api/users/searchskills', values);
    localStorage.setItem('skills', JSON.stringify(response.data));
    dispatch({ type: 'SEARCH_SKILLS', payload: response.data });
    message.success('Skills fetched successfully');
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'LOADING', payload: false });
  }
};
