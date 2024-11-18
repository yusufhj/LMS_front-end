import { useParams } from 'react-router-dom';
import * as courseServices from '../../services/courseService'


const CourseDetails = (props) => {
    const { courseId } = useParams()

    const user = useContext(AuthedUserContext)

    const [course, setCourse] = useState(null)
  
    useEffect(() => {
      const fetchCourse = async () => {
        const CourseData = await courseServices.show(courseId)
        setCourse(CourseData)
      }
      fetchCourse()
    }, [courseId])

    if (!course) return <Loading />
  
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
                {lesson.author.username} posted on{' '}
                {new Date(lesson.createdAt).toLocaleDateString()}
              </p>
              
            </header>
            <p>{lesson.text}</p>
          </article>
        ))}
      </section>
    </main>
  )

  };
  
  export default CourseDetails;