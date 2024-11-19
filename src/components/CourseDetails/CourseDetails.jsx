import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { AuthedUserContext } from '../../App'

import * as courseService from '../../services/courseService'
import LessonForm from '../LessonForm/LessonForm'


const CourseDetails = (props) => {
    const { courseId } = useParams()
    const [course, setCourse] = useState(null)

    const user = useContext(AuthedUserContext)

  
    useEffect(() => {
      const fetchCourse = async () => {
        const CourseData = await courseService.show(courseId)
        // CourseData.instructor = await courseService.getInstructorUsername(CourseData.instructorId)
        console.log("COURSE DATA: ", CourseData)
        setCourse(CourseData)
      }
      fetchCourse()
    }, [courseId])


    const handleAddLesson = async lessonFormData => {
        const newLesson = await courseService.createLesson(courseId, lessonFormData)
        setCourse({ ...course, lessons: [...course.lessons, newLesson] })
      }

    if (!course) return <h1>Loading...</h1>
  
    return (
    <main>
      <header>

        <h1>{course.title}</h1>
        <p>{course.instructor}</p>
    
        {course.instructor === user._id && (
          <>
            <Link to={`/courses/${courseId}/edit`}>EDIT</Link>
            <button onClick={() => props.handleDeleteCourse(courseId)}>
              DELETE
            </button>
          </>
        )}
      </header>
      <p>{course.description}</p>
      <section>
        <h2>lessons</h2>
        <LessonForm handleAddLesson={handleAddLesson} />
        {!course.lessons.length && <p>There are no lessons.</p>}
        {course.lessons.map(lesson => (
          <article key={lesson._id}>
            <header>
              <p>
                {lesson.title}
              </p>
              {/* &&
              <>
              <link to={`/courses/${courseId}/lessons/${lesson._id}/edit`}>Edit</link>
              <button onClick={() => handleDeleteLesson(lesson._id)}>Delete</button>
              </> */}
              
            </header>
            <p>{lesson.content}</p>
          </article>
        ))}
      </section>
    </main>
  )

  };
  
  export default CourseDetails;