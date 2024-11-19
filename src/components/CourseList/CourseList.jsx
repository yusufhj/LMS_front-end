import { Link } from 'react-router-dom';

const CourseList = (props) => {
  
  return (
    <main>
      <h1>Course List</h1>
      {props.courses.map(course => (
        <Link key={course._id} to={`/courses/${course._id}`}>
          <article>
            <header>
              <h2>{course.title}</h2>
              <p>By {course.instructor.user.username}</p>
            </header>
            <p>{course.description}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default CourseList;
