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

  const registeredCandidates = course.registeredCandidates;

  const alreadyRegistered = registeredCandidates.find(
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
              title={course.title}
              subTitle={course.department}
            />
            <p>
              <b>Title</b> : {course.title}
            </p>
            <p>
              <b> CRN </b> : {course.crn}
            </p>
            <p>
              <b>Department</b> : {course.department}
            </p>

            <p>
              <b>Small Description</b> : {course.smallDescription}
            </p>
            <p>
              <b>Full Description</b> : {course.fullDescription}
            </p>
            <p>
              <b>Title</b> : {course.title}
            </p>
            <p>
              <b>Skills Required</b> : {course.skillsRequired}
            </p>
            <p>
              <b>Experience</b> : {course.experience}
            </p>
            <p>
              <b>Minimum Qualification</b> : {course.minimumQualification}
            </p>

            <hr />

            <p>
              <b>Salary Range</b> : {course.salaryFrom} - {course.salaryTo}
            </p>
            <p>
              <b>Department</b> : {course.department}
            </p>
            <p>
              <b>Department Profile</b> : {course.departmentDescription}
            </p>
            <p>
              <b>Total Candidates registered</b> :{' '}
              {course.registeredCandidates.length}
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
              ) : user.role === 'guest' ? (
                <Button onClick={promptToLogin}>Register Now</Button>
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
        {user.role === 'guest' ? <></> : <Comments content={content} />}
      </DefaultLayout>
    </div>
  );
}

export default CourseInfo;
