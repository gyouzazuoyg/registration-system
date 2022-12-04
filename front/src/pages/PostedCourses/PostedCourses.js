import React, { useState } from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import PostedList from './PostedList';

function PostedCourses() {
  return (
    <div>
      <DefaultLayout>
        <PostedList />
      </DefaultLayout>
    </div>
  );
}

export default PostedCourses;
