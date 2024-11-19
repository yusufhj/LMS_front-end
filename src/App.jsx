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
      // setCourses(coursesData);
      // const coursesWithInstructors = await courseService.index({ populate: 'instructor' });
      // console.log("attempt to populate",coursesWithInstructors);
      // setCourses(coursesWithInstructors);
      console.log(coursesData);

      const fetchInstructorDetails = async (instructorId) => {
        const instructorData = await authService.getInstructorById(instructorId);
        // console.log(instructorData);
        return instructorData;
      };

      const coursesWithInstructors = await Promise.all(
        coursesData.map(async (course) => {
          if (course.instructor && user) {
            course.instructor = await fetchInstructorDetails(course.instructor);
          }
          // console.log('couuuruseeeee: ', course);
          return course;
        })
      );

      setCourses(coursesWithInstructors);
    };
    if (user) fetchAllCourses();
  }, [user]);

  const handleAddCourse = async (newCourseData) => {
    newCourseData.instructor = user;
    // console.log('New course data ',newCourseData);
    const newCourse = await courseService.create(newCourseData);
    setCourses([newCourse, ...courses]);
    // console.log('New Course after added to db',newCourse);

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