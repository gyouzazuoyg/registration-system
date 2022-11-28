import React from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import AppliedList from './AppliedList';

function AppliedCourses() {
  return (
    <div>
      <DefaultLayout>
        <AppliedList />
      </DefaultLayout>
    </div>
  );
}

export default AppliedCourses;
