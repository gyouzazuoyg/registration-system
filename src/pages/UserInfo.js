import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import {useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../redux/actions/userActions";
import {PageHeader} from "antd";
function UserInfo({ match }) {
  const { users } = useSelector((state) => state.usersReducer);
  useDispatch(getAllUsers());
  const user = users.find((user) => user._id === match.params.id);
  return (
    <div>
      <DefaultLayout>
        {user && (
          <div className="p-4">
              <PageHeader
                  ghost={false}
                  onBack={() => window.history.back()}
                  title="Profile"
                  subTitle={user.username}
              />
            <h3>
              <b>Personal information</b>
            </h3>
            <p>
              <b>First name : </b>
              {user.firstName}
            </p>
            <p>
              <b>Last name : </b>
              {user.lastName}
            </p>
            <p>
              <b>Email : </b>
              {user.email}
            </p>
              {user.about.length === 0 ? ('') : (
                  <>
                      <p>
                          <b>About : </b>
                          {user.about}
                      </p>
                  </>
              )}

              {user.skills[0].length === 0 ? ('') : (
                  <>
                      <hr />
                      <h3>
                          <b>Skills</b>
                      </h3>
                      {user.skills.map((skill) => {
                          return <li>{skill}</li>;
                      })}
                  </>
              )}

              {user.education[0].length === 0 ? ('') : (
                  <>
                      <hr />
                      <h3>
                          <b>Education</b>
                      </h3>
                      {user.education.map((education) => {
                          return <li>{education}</li>;
                      })}
                  </>)}

              {user.projects[0].length === 0 ? ('') : (
                  <>
                      <hr />
                      <h3>
                          <b>Projects</b>
                      </h3>
                      {user.projects.map((project) => {
                          return <li>{project}</li>;
                      })}
                  </>
              )}

              {user.experience[0].length === 0 ? ('') : (
                  <>
                      <hr />
                      <h3>
                          <b>Experience</b>
                      </h3>
                      {user.experience.map((experience) => {
                          return <li>{experience}</li>;
                      })}
                  </>
              )}
          </div>
        )}
      </DefaultLayout>
    </div>
  );
}

export default UserInfo;
