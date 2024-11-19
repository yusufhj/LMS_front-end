import { Link } from 'react-router-dom'

const CourseList = props => {
  return (
    <main>
      <h1>Course List</h1>
      {props.courses.map(course => (
        <Link key={course._id} to={`/courses/${course._id}`}>
          <article>
            <header>
              <h2>{course.title}</h2>

              {/* the course.instructor is an ObjectId('') i need to populate */}

            </header>
            <p>{course.description}</p>
          </article>
        </Link>
      ))}
    </main>
  )
}

export default CourseList