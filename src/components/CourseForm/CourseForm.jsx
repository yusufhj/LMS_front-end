import './CourseForm.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as courseService from '../../services/courseService'

const CourseForm = props => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    lessons: [],
  })

  const [loading, setLoading] = useState(false)

  const { courseId } = useParams()

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true)
      try {
        const CourseData = await courseService.show(courseId)
        // console.log('COURSE DATAdaskjdbfjsdbfisdbfi:', CourseData)
        setFormData(CourseData)
      } catch (error) {
        console.error('Error fetching course data:', error)
      }
    }
    if (courseId) {
      fetchCourse()
    } else {
      setFormData({
        title: '',
        description: '',
        lessons: [],
      })
    }
    setLoading(false)
  }, [courseId])

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields.')
      return
    }
    if (courseId) {
      props.handleUpdateCourse(courseId, formData)
    } else {
      props.handleAddCourse(formData)
      console.log('COURSE FORM:', formData)
    }
  }

  return (
    <main className='course-form'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>{courseId ? 'Edit Course' : 'New Course'}</h1>
          <label htmlFor="title-input">Title</label>
          <input
            type="text"
            required
            name="title"
            id="title-input"
            value={formData.title}
            onChange={handleChange}
            placeholder='Course Title'
          />
          <label htmlFor="description-input">Description</label>
          <textarea
            type="text"
            required
            name="description"
            id="description-input"
            value={formData.description}
            onChange={handleChange}
            placeholder='Course Description'
          />
          <button type="submit">{courseId ? 'Update Course' : 'Add New Course'}</button>
        </form>
      )}
    </main>
  )
}

export default CourseForm