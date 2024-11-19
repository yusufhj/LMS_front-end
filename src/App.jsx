import { useState, createContext, useEffect  } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// Components
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm'
import SigninForm from './components/SigninForm/SigninForm'

// Course Components
import CourseList from './components/CourseList/CourseList'
import CourseForm from './components/CourseForm/CourseForm'
import CourseDetails from './components/CourseDetails/CourseDetails'; 

// Services
import * as authService from '../src/services/authService';
import * as  courseService from '../src/services/courseService'


// eslint-disable-next-line react-refresh/only-export-components
export const AuthedUserContext = createContext(null);


const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }

  useEffect(() => {
    const fetchAllCourses = async () => {
      const coursesData = await courseService.index();
      setCourses(coursesData);
      console.log(coursesData);
      coursesData.forEach(course => {
        // pull the instructor data from the course
        console.log(course.instructor);
      });
      console.log(coursesData[0].instructor);
    };
    if (user) fetchAllCourses();
  }, [user]);

  const handleAddCourse = async (newCourseData) => {
    newCourseData.instructor = user;
    const newCourse = await courseService.create(newCourseData);
    setCourses([newCourse, ...courses]);

    navigate('/courses');
  }

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          { user ? (
              // all signed in user routes
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/courses" element={<CourseList courses={courses} />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />


              
              { user.role === 'instructor' ? (
                  // instructor routes
                <>
                  <Route path="/courses/new" element={<CourseForm handleAddCourse={handleAddCourse} />} />
                </>

              ) : (

                // student routes
                <>
                  <Route path="/" element={<Dashboard user={user} />} />
                </>
              )}
            </>
          ) : (

            // not signed in routes
            <Route path="/" element={<Landing />} />
          )}

          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path='/signin' element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;