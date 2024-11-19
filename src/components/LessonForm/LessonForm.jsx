import { useState } from 'react';

const LessonForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const [lessons, setLessons] = useState([]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLessons([...lessons, formData]);
    setFormData({ title: '', content: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="lesson-title">Lesson Title:</label>
        <input
          type="text"
          name="title"
          id="lesson-title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="lesson-content">Lesson Content:</label>
        <textarea
          name="content"
          id="lesson-content"
          value={formData.content}
          onChange={handleChange}
        ></textarea>
        <button type="submit">ADD LESSON</button>
      </form>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={index}>
            <h2>{lesson.title}</h2>
            <p>{lesson.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonForm;
