import { Link } from 'react-router-dom'

const CourseList = props => {
  return (
    <main>
      {props.courses.map(course => (
        <Link key={course._id} to={`/courses/${course._id}`}>
          <article>
            <header>
              <h2>{course.title}</h2>
              <p>
                {course.title.username} posted on{' '}
                {new Date(course.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{course.text}</p>
          </article>
        </Link>
      ))}
    </main>
  )
}

export default CourseList