import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/actions/userActions';
import { PageHeader, Tabs } from 'antd';
import RegisteredList from './RegisteredCourses/RegisteredList';

function UserInfo({ match }) {
  const [activeTab, setActiveTab] = useState('1');
  const { TabPane } = Tabs;

  const { users } = useSelector((state) => state.usersReducer);
  useDispatch(getAllUsers());
  const user = users.find((user) => user._id === match.params.id);

  function callbackTabClicked(key, event) {
    setActiveTab(key);
  }
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
            <Tabs
              defaultActiveKey="1"
              activeKey={activeTab}
              onTabClick={callbackTabClicked}
            >
              <TabPane tab="Personal Info" key="1">
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
              </TabPane>
              <TabPane tab="Academic Info" key="2">
                <p>
                  <b>Department : </b>
                  {user.department}
                </p>
                <p>
                  <b>College : </b>
                  {user.college}
                </p>
                <p>
                  <b>Campus : </b>
                  {user.campus}
                </p>
                <p>
                  <b>Required credits : </b>
                  {user.requiredCredits}
                </p>
                <p>
                  <b>Acquired credits : </b>
                  {user.accquiredCredits}
                </p>
                <p>
                  <b>Time ticket : </b>
                  {user.timeTicketFrom} - {user.timeTicketTo}
                </p>
              </TabPane>
              <TabPane tab="Registrated Courses" key="3">
                <RegisteredList isWaitlist={false} />
              </TabPane>
              <TabPane tab="Waitlisted Courses" key="4">
                <RegisteredList isWaitlist={true} />
              </TabPane>
            </Tabs>
          </div>
        )}
      </DefaultLayout>
    </div>
  );
}

export default UserInfo;
