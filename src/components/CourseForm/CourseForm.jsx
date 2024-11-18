import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as courseService from '../../services/courseService'

const CourseForm = props => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'News',
  })

  const [loading, setLoading] = useState(false)

  const { CourseId } = useParams()

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true)
      try {
        const CourseData = await courseService.show(CourseId)
        setFormData(CourseData)
      } catch (error) {
        console.error('Error fetching course data:', error)
      } finally {
        setLoading(false)
      }
    }
    if (CourseId) {
      fetchCourse()
    } else {
      setFormData({
        title: '',
        text: '',
        category: 'News',
      })
    }
  }, [CourseId])

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!formData.title || !formData.text) {
      alert('Please fill in all required fields.')
      return
    }
    if (CourseId) {
      props.handleUpdateCourse(CourseId, formData)
    } else {
      props.handleAddCourse(formData)
    }
  }

  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>{CourseId ? 'Edit Course' : 'New Course'}</h1>
          <label htmlFor="title-input">Title</label>
          <input
            type="text"
            required
            name="title"
            id="title-input"
            value={formData.title}
            onChange={handleChange}
          />
          <label htmlFor="text-input">Text</label>
          <textarea
            type="text"
            required
            name="text"
            id="text-input"
            value={formData.text}
            onChange={handleChange}
          />
          <label htmlFor="category-input">Category</label>
          <select
            type="text"
            required
            name="category"
            id="category-input"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="News">News</option>
            <option value="Games">Games</option>
            <option value="Music">Music</option>
            <option value="Movies">Movies</option>
            <option value="Sports">Sports</option>
            <option value="Television">Television</option>
          </select>
          <button type="submit">SUBMIT</button>
        </form>
      )}
    </main>
  )
}

export default CourseForm
