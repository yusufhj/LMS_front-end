import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { AuthedUserContext } from '../../App'

import * as courseService from '../../services/courseService'
import LessonForm from '../LessonForm/LessonForm'


const CourseDetails = (props) => {
    const { courseId } = useParams()

    const user = useContext(AuthedUserContext)

    const [course, setCourse] = useState(null)
  
    useEffect(() => {
      const fetchCourse = async () => {
        const CourseData = await courseService.show(courseId)
        setCourse(CourseData)
      }
      fetchCourse()
    }, [courseId])


    const handleAddLesson = async lessonFormData => {
        const newLesson = await courseService.createLesson(courseId, lessonFormData)
        setHoot({ ...course, lessons: [...course.lessons, newLesson] })
      }

  
    return (
    <main>
      <header>
        <p>{course.category.toUpperCase()}</p>
        <h1>{course.title}</h1>
        <p>
          {course.title.username} posted on{' '}
          {new Date(course.createdAt).toLocaleDateString()}
        </p>
        {course.title._id === user._id && (
          <>
            <Link to={`/courses/${courseId}/edit`}>EDIT</Link>
            <button onClick={() => props.handleDeleteCourse(courseId)}>
              DELETE
            </button>
          </>
        )}
      </header>
      <p>{course.text}</p>
      <section>
        <h2>lessons</h2>
        <LessonForm handleAddLesson={handleAddLesson} />
        {!course.lessons.length && <p>There are no lessons.</p>}
        {course.lessons.map(lesson => (
          <article key={lesson._id}>
            <header>
              <p>
                {lesson.title.username} posted on{new Data (lesson.createdAt).toLocaleDateString}
              </p>
              &&
              <>
              <link to={`/courses/${courseId}/lessons/${lesson._id}/edit`}>Edit</link>
              <button onClick={() => handleDeleteLesson(lesson._id)}>Delete</button>
              </>
              
            </header>
            <p>{lesson.text}</p>
          </article>
        ))}
      </section>
    </main>
  )

  };
  
  export default CourseDetails;