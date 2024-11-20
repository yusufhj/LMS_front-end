import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthedUserContext } from '../../App';
import * as courseService from '../../services/courseService';
import * as authService from '../../services/authService';
import LessonForm from '../LessonForm/LessonForm';

const CourseDetails = (props) => {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [enrollment, setEnrollment] = useState(null)

  const user = useContext(AuthedUserContext);

  useEffect(() => {
    const fetchCourse = async () => {
      const CourseData = await courseService.show(courseId)
      CourseData.instructor = await authService.getInstructorById(CourseData.instructor)
      // console.log("COURSE DATA: ", CourseData)
      setCourse(CourseData)
    }
    fetchCourse()
  }, [courseId])

  const handleAddLesson = async lessonFormData => {
    try {
      const newLesson = await courseService.createLesson(courseId, lessonFormData)
      setCourse({ ...course, lessons: [...course.lessons, newLesson] })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteLesson = async (lessonId) => {
      await courseService.deleteLesson(courseId, lessonId);
      setCourse({
          ...course,
          lessons: course.lessons.filter((lesson) => lesson._id !== lessonId),
      });
  };

  const handleEnroll = async (courseId) => {
    try {
      let existingEnrollment = await courseService.getEnrollmentForUser(courseId, user._id);
      setEnrollment(existingEnrollment);
      // if it exists, unenroll
      if (existingEnrollment) {
        if (existingEnrollment.status === 'completed') {
          setEnrollment(existingEnrollment);
          console.log('Already completed course', enrollment);
          return;
        } else if (existingEnrollment.status === 'pending') {
          existingEnrollment = await courseService.unenroll(courseId);
          setEnrollment(existingEnrollment);
          console.log('Unenrolled from course', enrollment);
          return
        } else if (existingEnrollment.status === 'withdrawn') {
          existingEnrollment = await courseService.enrollAgain(courseId);
          setEnrollment(existingEnrollment);
          console.log('Enrolled Again in course', existingEnrollment);
          return
        }
      }
  
      // if not enrolled, create new enrollment
      const newEnrollment = await courseService.createEnrollment(courseId);
      setEnrollment(newEnrollment.enrollment);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchEnrollment = async () => {
      const existingEnrollment = await courseService.getEnrollmentForUser(courseId, user._id);
      setEnrollment(existingEnrollment);
    }
    if (user.role === 'student') {
      fetchEnrollment();
    }
  }, [courseId, user._id, enrollment?.status, user.role]);

  const enrollmentDisplay = () => {
    if (user.role === 'student') {
      if (enrollment?.status) {
        if (enrollment.status === 'completed') {
          return <p>Completed</p>
        } else if (enrollment.status === 'pending') {
          return <button onClick={() => handleEnroll(courseId)}>Unenroll</button>
        } else if (enrollment.status === 'withdrawn') {
          return <button onClick={() => handleEnroll(courseId)}>Enroll Again</button>
        }
      }
      return <button onClick={() => handleEnroll(courseId)}>Enroll</button>
    } else {
      return null;
    }
  }

  const completeLesson = async (lessonId) => {
    try {
      await courseService.completeLesson(courseId, lessonId);
      const updatedCompletedLessons = [...enrollment.completedLessonIds, lessonId];
      setEnrollment({ ...enrollment, completedLessonIds: updatedCompletedLessons });

      // Check if all lessons are completed
      if (updatedCompletedLessons.length === course.lessons.length) {
        await completeCourse();
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  }

  const completeCourse = async () => {
    const completedCourse = await courseService.completeCourse(courseId);
    setEnrollment({ ...enrollment, status: 'completed' });
    console.log('Completed Course', completedCourse);
    console.log('Enrollment after completing course', enrollment);
  }

  if (!course) return <h1>Loading...</h1>
  
  return (
    <main>
      <header>

        <h1>{course.title}</h1>
        <p>By {course.instructor.user.username}</p>
    
        {course.instructor.user._id === user._id && (
          <>
            <Link to={`/courses/${courseId}/edit`}>EDIT</Link>
            <button onClick={() => props.handleDeleteCourse(courseId)}>
              DELETE
            </button>
          </>
        )}
        {user.role === 'student' && (
          <>
            {enrollmentDisplay()}
          </>
        )}
      </header>
      <p>{course.description}</p>
      <section>
      {course.instructor.user._id === user._id && (
        <LessonForm handleAddLesson={handleAddLesson} />
      )}
        <h2>lessons</h2>
        {!course.lessons.length && <p>There are no lessons.</p>}
        <ul>
        {course.lessons.map(lesson => (
          <li key={lesson._id}>
            <header>
              <h3>{lesson.title}</h3>
              <p>{lesson.content}</p>

              {course.instructor.user._id === user._id &&  (
                <>
                  <Link to={`/courses/${courseId}/lessons/${lesson._id}/edit`}>Edit</Link>
                  <button onClick={() => handleDeleteLesson(lesson._id)}>Delete</button>
                </>
              )}
            </header>
            
            {user.role === 'student' && enrollment.status === 'pending' ? (
              enrollment.completedLessonIds.includes(lesson._id) ? (
                <p>Completed</p>
              ) : (
                <button onClick={() => completeLesson(lesson._id)}>Complete</button>
              )
            ) : null}
          </li>
        ))}
        </ul>
      </section>
    </main>
  )
}

export default CourseDetails;