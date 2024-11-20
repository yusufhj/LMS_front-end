import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthedUserContext } from '../../App';
import * as courseService from '../../services/courseService';
import * as authService from '../../services/authService';
import LessonForm from '../LessonForm/LessonForm';

const CourseDetails = (props) => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [editingLessonId, setEditingLessonId] = useState(null); 
    const [editingLessonData, setEditingLessonData] = useState({ title: '', content: '' }); 

    const user = useContext(AuthedUserContext);

    useEffect(() => {
        const fetchCourse = async () => {
            const CourseData = await courseService.show(courseId);
            CourseData.instructor = await authService.getInstructorById(CourseData.instructor);
            setCourse(CourseData);
        };
        fetchCourse();
    }, [courseId]);

    const handleAddLesson = async (lessonFormData) => {
        const newLesson = await courseService.createLesson(courseId, lessonFormData);
        setCourse({ ...course, lessons: [...course.lessons, newLesson] });
    };

    const handleEditLesson = async () => {
        const updatedLesson = await courseService.updateLesson(courseId, editingLessonId, editingLessonData);
        setCourse({
            ...course,
            lessons: course.lessons.map((lesson) =>
                lesson._id === editingLessonId ? updatedLesson : lesson
            ),
        });
        setEditingLessonId(null); 
    };

    const handleDeleteLesson = async (lessonId) => {
        await courseService.deleteLesson(courseId, lessonId);
        setCourse({
            ...course,
            lessons: course.lessons.filter((lesson) => lesson._id !== lessonId),
        });
    };

    if (!course) return <h1>Loading...</h1>;

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
            </header>
            <p>{course.description}</p>
            <section>
                {course.instructor.user._id === user._id && (
                    <LessonForm handleAddLesson={handleAddLesson} />
                )}
                <h2>Lessons</h2>
                {!course.lessons.length && <p>There are no lessons.</p>}
                {course.lessons.map((lesson) => (
                    <article key={lesson._id}>
                        <header>
                            <p>{lesson.title}</p>
                            {course.instructor.user._id === user._id && (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditingLessonId(lesson._id);
                                            setEditingLessonData({ title: lesson.title, content: lesson.content });
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteLesson(lesson._id)}>Delete</button>
                                </>
                            )}
                        </header>
                        <p>{lesson.content}</p>

                        {editingLessonId === lesson._id && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleEditLesson();
                                }}
                            >
                                <label>
                                    Lesson Title:
                                    <input
                                        type="text"
                                        value={editingLessonData.title}
                                        onChange={(e) =>
                                            setEditingLessonData({ ...editingLessonData, title: e.target.value })
                                        }
                                    />
                                </label>
                                <label>
                                    Lesson Content:
                                    <textarea
                                        value={editingLessonData.content}
                                        onChange={(e) =>
                                            setEditingLessonData({ ...editingLessonData, content: e.target.value })
                                        }
                                    ></textarea>
                                </label>
                                <button type="submit">Save Changes</button>
                                <button
                                    type="button"
                                    onClick={() => setEditingLessonId(null)}
                                >
                                    Cancel
                                </button>
                            </form>
                        )}
                    </article>
                ))}
            </section>
        </main>
    );
};

export default CourseDetails;