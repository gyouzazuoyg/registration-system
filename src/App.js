import './App.css';
import 'antd/dist/antd.css';
import Home from './pages/Home';
import CourseInfo from './pages/CourseInfo';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import RegisteredCourses from './pages/RegisteredCourses/RegisteredCourses';
import PostCourse from './pages/PostCourse';
import Profile from './pages/Profile';
import FadeLoader from 'react-spinners/FadeLoader';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from './redux/actions/courseActions';
import { useEffect } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import PostedCourses from './pages/PostedCourses/PostedCourses';
import EditCourse from './pages/EditCourse';
import { getAllUsers } from './redux/actions/userActions';
import UserInfo from './pages/UserInfo';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  const { loader } = useSelector((state) => state.loaderReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllUsers());
  }, []);
  return (
    <div className="App">
      {loader && (
        <div className="sweet-loading text-center">
          <FadeLoader color={'#001529'} />
        </div>
      )}

      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/privacypolicy" exact component={PrivacyPolicy} />

        <ProtectedRoute path="/" exact component={Home} />
        <ProtectedRoute path="/registeredcourses" exact component={RegisteredCourses} />
        <ProtectedRoute path="/postcourse" exact component={PostCourse} />

        <ProtectedRoute path="/profile" exact component={Profile} />
        <ProtectedRoute path="/courses/:id" exact component={CourseInfo} />

        <ProtectedRoute path="/posted" exact component={PostedCourses} />

        <ProtectedRoute path="/editcourse/:id" exact component={EditCourse} />
        <ProtectedRoute path="/users/:id" exact component={UserInfo} />
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute(props) {
  const user = localStorage.getItem('user');

  if (!user) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...props} />;
  }
}
