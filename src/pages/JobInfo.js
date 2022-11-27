import {Button, PageHeader, Tag, Comment, List, Avatar, message, Popconfirm} from "antd";
import moment from "moment";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import Comments from "../components/Comments";
import {applyJob, commentJobs, deleteComment, deleteJob, getAllJobs} from "../redux/actions/jobActions";
import {DeleteOutlined} from "@ant-design/icons";
import {getAllUsers} from "../redux/actions/userActions";


function JobInfo({ match }) {
  const dispatch = useDispatch();

  const job = JSON.parse(localStorage.getItem("jobs")).find((job) => job._id === match.params.id);
  const postAuthor = JSON.parse(localStorage.getItem("users")).find((user) => user._id === job.postedBy);
  const user = JSON.parse(localStorage.getItem("user"));

  const userid = user._id;

  const appliedCandidates = job.appliedCandidates;

  const alreadyApplied = appliedCandidates.find(
    (candidate) => candidate.userid === userid
  );

  const comments = job.comments;

  function applyNow() {
    dispatch(applyJob(job));
  }

  function deletePost() {
      dispatch(deleteJob(job));
  }

  function promptToLogin() {
      message.warning("Please login first!");
      dispatch({ type: "LOADING", payload: false });
      setTimeout(() => {
          window.location.href = "/login";
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
      dispatch(deleteComment(job, id));
  }

  const CommentList = ({ comments }) => (
      <List
          dataSource={comments}
          header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout="horizontal"
          renderItem={props => <Comment author={<Link to={`/users/${props.userid}`}>{props.author}</Link>}
                                        avatar={<Link to={`/users/${props.userid}`}><Avatar src={props.avatar}/></Link>}
                                        content={props.content}
                                        datetime={props.datetime} />}
      />
  );

  const CommentListAdmin = ({ comments }) => (
      <List
          dataSource={comments}
          header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout="horizontal"
          renderItem={props =>
              <Comment actions={[
                  <Popconfirm
                      title="Are you sure to delete this comment?"
                      onConfirm={() => confirmDeleteComment(props._id)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                  >
                      <a><DeleteOutlined /></a>
                  </Popconfirm>
                  ]}
                       author={<Link to={`/users/${props.userid}`}>{props.author}</Link>}
                       avatar={<Link to={`/users/${props.userid}`}><Avatar src={props.avatar}/></Link>}
                       content={props.content}
                       datetime={props.datetime}/>
          }
      />
      );

  const content = (data) => {
      dispatch(commentJobs(job, data.props.children));
  };

  return (
    <div>
      <DefaultLayout>
        {job && (
          <div className="p-4">
              <PageHeader
                  ghost={false}
                  onBack={() => window.history.back()}
                  title={job.title}
                  subTitle={job.company}
              />
            <p>
              <b>Title</b> : {job.title}
            </p>
            <p>
              <b>Company</b> : {job.company}
            </p>

            <p>
              <b>Small Description</b> : {job.smallDescription}
            </p>
            <p>
              <b>Full Description</b> : {job.fullDescription}
            </p>
            <p>
              <b>Title</b> : {job.title}
            </p>
            <p>
              <b>Skills Required</b> : {job.skillsRequired}
            </p>
            <p>
              <b>Experience</b> : {job.experience}
            </p>
            <p>
              <b>Minimum Qualification</b> : {job.minimumQualification}
            </p>

            <hr />

            <p>
              <b>Salary Range</b> : {job.salaryFrom} - {job.salaryTo}
            </p>
            <p>
              <b>Department</b> : {job.department}
            </p>
            <p>
              <b>Company Profile</b> : {job.companyDescription}
            </p>
            <p>
              <b>Total Candidates applied</b> : {job.appliedCandidates.length}
            </p>

            <hr />

            <div className="flex justify-content-between">
              {job.postedBy === userid ? (
                <Button>
                  <Link to={`/editjob/${job._id}`}>Edit Now</Link>
                </Button>
              ) : (user.role === "student" ? (alreadyApplied ? (
                <Tag color="green">Already Applied</Tag>
              ) : (
                <Button onClick={applyNow}>Apply Now</Button>
              )) : (user.role === 'guest' ? (
                  <Button onClick={promptToLogin}>Apply Now</Button>
              ) : (user.role === 'admin') ? (
                  <Popconfirm
                      title="Are you sure to delete this post?"
                      onConfirm={confirmDeletePost}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                  >
                      <Button>Delete post</Button>
                  </Popconfirm>

              ) : (<></>)))}
              <p>
                  <b>Posted by </b><Link to={`/users/${postAuthor._id}`}> {postAuthor.username}</Link><b> on </b> {moment(job.createdAt).format("MMM DD yyyy")}
              </p>
            </div>
          </div>
        )}
        {comments.length > 0 && (user.role === 'admin' ? <CommentListAdmin comments={comments}/> : <CommentList comments={comments} />)}
          {user.role === 'guest' ? (<></>) : (<Comments content={content}/>)}
      </DefaultLayout>
    </div>
  );
}

export default JobInfo;
