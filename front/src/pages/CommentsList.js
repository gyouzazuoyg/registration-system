import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

function CommentsList() {
  const allusers = useSelector((state) => state.usersReducer).users;
  const userid = JSON.parse(localStorage.getItem('user'))._id;
  const user = allusers.find((user) => user._id === userid);
  console.log(JSON.parse(localStorage.getItem('users')))
  const userComments = user.comments;

  let commentsList = [];
  for (const comment of userComments) {
    const temp = comment;
    console.log(temp);

    if (temp) {
      const obj = {
        content: temp.content,
        postDate: temp.dateTime,
        courseId: (
          <Link to={`/courses/${temp.crn}`}>
            <Button>Details</Button>
          </Link>
        ),
      };

      commentsList.push(obj);
    }
  }

  const columns = [
    {
      title: 'Content',
      dataIndex: 'content',
    },
    {
      title: 'Date',
      dataIndex: 'postDate',
    },
    {
      title: 'Link to Post',
      dataIndex: 'courseId',
    },
  ];

  return (
    <div>
      <h1>Comments</h1>
      <Table columns={columns} dataSource={commentsList} />
    </div>
  );
}

export default CommentsList;
