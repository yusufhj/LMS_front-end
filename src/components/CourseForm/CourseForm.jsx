import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as courseService from '../../services/courseService'
/*
const courseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        lessons: [lessonSchema],
    }, 
);

*/
const CourseForm = props => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    lessons: [],
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
      }
    }
    if (CourseId) {
      fetchCourse()
    } else {
      setFormData({
        title: '',
        description: '',
        lessons: [],
      })
    }
  }, [CourseId])

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields.')
      return
    }
    if (CourseId) {
      props.handleUpdateCourse(CourseId, formData)
    } else {
      props.handleAddCourse(formData)
      console.log('COURSE FORM:', formData)
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
          <label htmlFor="description-input">Description</label>
          <textarea
            type="text"
            required
            name="description"
            id="description-input"
            value={formData.text}
            onChange={handleChange}
          />
          <button type="submit">SUBMIT</button>
        </form>
      )}
    </main>
  )
}

export default CourseForm