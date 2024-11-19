const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/courses`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (courseId) => {
  try {
      const res = await fetch(`${BASE_URL}/${courseId}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      console.log(res)
      return res.json()
  } catch (error) {
      console.log(error)
  }
}

const create = async (courseFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseFormData)
      })
      return res.json()
  } catch (error) {
      console.log(error)
  }
}

const update = async (courseId, courseFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}`, {
      method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseFormData)
      })
      return res.json()
  } catch (error) {
    console.log(error)
  }
}
const deleteCourse = async (courseId) => {
  try {
      const res = await fetch(`${BASE_URL}/${courseId}`, {
          method: 'DELETE',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      return res.json()
  } catch (error) {
      console.log(error)
  }
}

const createLesson = async (courseId, lessonFormData) => {
  try {
      const res = await fetch(`${BASE_URL}/${courseId}/lessons`, {
          method: 'POST',
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(lessonFormData)
      })
      console.log(res)
      return res.json()
  } catch (error) {
      console.log(error)
  }
}

const deleteLesson = async (courseId, lessonId) => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/lessons/${lessonId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
  
const updateLesson = async (courseId, lessonId, lessonFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${courseId}/lessons/${lessonId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lessonFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


export { index, show, create, createLesson, deleteCourse, update, updateLesson, deleteLesson }
  

