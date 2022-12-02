import {
  Button,
  PageHeader,
  Tag,
  Comment,
  List,
  Avatar,
  message,
  Popconfirm,
} from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import Comments from '../components/Comments';
import {
  registerCourse,
  commentCourses,
  deleteComment,
  deleteCourse,
  getAllCourses,
} from '../redux/actions/courseActions';
import { DeleteOutlined } from '@ant-design/icons';
import { getAllUsers } from '../redux/actions/userActions';

function CourseInfo({ match }) {
  const dispatch = useDispatch();

  const course = JSON.parse(localStorage.getItem('courses')).find(
    (course) => course._id === match.params.id,
  );
  const postAuthor = JSON.parse(localStorage.getItem('users')).find(
    (user) => user._id === course.postedBy,
  );
  const user = JSON.parse(localStorage.getItem('user'));

  const userid = user._id;

  const registeredStudents = course.registeredStudents;

  const alreadyRegistered = registeredStudents.find(
    (candidate) => candidate.userid === userid,
  );

  const comments = course.comments;

  function registerNow() {
    dispatch(registerCourse(course));
  }

  function deletePost() {
    dispatch(deleteCourse(course));
  }

  function promptToLogin() {
    message.warning('Please login first!');
    dispatch({ type: 'LOADING', payload: false });
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  }

  function confirmDeletePost(e) {
    console.log(e);
    deletePost();
  }

  function cancel(e) {
    console.log(e);
  }

  function confirmDeleteComment(id) {
    dispatch(deleteComment(course, id));
  }

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(props) => (
        <Comment
          author={<Link to={`/users/${props.userid}`}>{props.author}</Link>}
          avatar={
            <Link to={`/users/${props.userid}`}>
              <Avatar src={props.avatar} />
            </Link>
          }
          content={props.content}
          datetime={props.datetime}
        />
      )}
    />
  );

  const CommentListAdmin = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(props) => (
        <Comment
          actions={[
            <Popconfirm
              title="Are you sure to delete this comment?"
              onConfirm={() => confirmDeleteComment(props._id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a>
                <DeleteOutlined />
              </a>
            </Popconfirm>,
          ]}
          author={<Link to={`/users/${props.userid}`}>{props.author}</Link>}
          avatar={
            <Link to={`/users/${props.userid}`}>
              <Avatar src={props.avatar} />
            </Link>
          }
          content={props.content}
          datetime={props.datetime}
        />
      )}
    />
  );

  const content = (data) => {
    dispatch(commentCourses(course, data.props.children));
  };

  return (
    <div>
      <DefaultLayout>
        {course && (
          <div className="p-4">
            <PageHeader
              ghost={false}
              onBack={() => window.history.back()}
              title={course.courseId + ' - ' + course.courseName}
            />
            <p>
              <b>CRN</b> : {course.crn}
            </p>
            <p>
              <b>Term</b> : {course.term}
            </p>
            <p>
              <b>Credits</b> : {course.credits}
            </p>
            <p>
              <b>Professor</b> : {course.professor}
            </p>
            <p>
              <b>Department</b> : {course.department}
            </p>
            <p>
              <b>College</b> : {course.college}
            </p>
            <p>
              <b>Location</b> :{' '}
              {'Room: ' +
                course.classroom +
                ', Building: ' +
                course.building +
                ', ' +
                course.campus}
            </p>
            <p>
              <b>Prerequisites</b> : {course.prerequisites}
            </p>
            <p>
              <b>Course Description</b> : {course.courseDescription}
            </p>
            <p>
              <b>Total Students Registered</b> :{' '}
              {course.registeredStudents.length} / {course.capacity}
            </p>
            <p>
              <b>Total Students Waitlisted</b> :{' '}
              {course.waitlistedStudents.length} / {course.waitlistCapacity}
            </p>

            <hr />

            <div className="flex justify-content-between">
              {course.postedBy === userid ? (
                <Button>
                  <Link to={`/editcourse/${course._id}`}>Edit Now</Link>
                </Button>
              ) : user.role === 'student' ? (
                alreadyRegistered ? (
                  <Tag color="green">Already Registered</Tag>
                ) : (
                  <Button onClick={registerNow}>Register Now</Button>
                )
              ) : user.role === 'admin' ? (
                <Popconfirm
                  title="Are you sure to delete this post?"
                  onConfirm={confirmDeletePost}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button>Delete post</Button>
                </Popconfirm>
              ) : (
                <></>
              )}
              <p>
                <b>Posted by </b>
                <Link to={`/users/${postAuthor._id}`}>
                  {' '}
                  {postAuthor.username}
                </Link>
                <b> on </b> {moment(course.createdAt).format('MMM DD yyyy')}
              </p>
            </div>
          </div>
        )}
        {comments.length > 0 &&
          (user.role === 'admin' ? (
            <CommentListAdmin comments={comments} />
          ) : (
            <CommentList comments={comments} />
          ))}
        {<Comments content={content} />}
      </DefaultLayout>
    </div>
  );
}

export default CourseInfo;
