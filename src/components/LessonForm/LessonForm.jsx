import { useState } from 'react'

const LessonForm = ({ handleAddLesson }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddLesson(formData)
    setFormData({ title: '', content: '' }) 
  }

  return (
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
  )
}

export default LessonForm
