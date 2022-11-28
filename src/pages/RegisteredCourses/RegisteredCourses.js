import React from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import RegisteredList from './RegisteredList';

function RegisteredCourses() {
  return (
    <div>
      <DefaultLayout>
        <RegisteredList />
      </DefaultLayout>
    </div>
  );
}

export default RegisteredCourses;
