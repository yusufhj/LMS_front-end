import { useState, createContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'
import * as authService from '../src/services/authService' 
import * as  courseService from '../src/services/courseService'
import CourseList from './components/CourseList/CourseList'

const App = () => {

const [courses, setcourses] = useState([]);

useEffect(() => {
  const fetchAllCourses = async () => {
    const coursesData = await courseService.index();
    setHoots(hootsData);
  };
  if (user) fetchAllCourses();
}, [user]);

  return (
    <>
   
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/courses" element={<CourseList courses={courses} />} />
          
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>

    </>
  )
}

export default App