import { useEffect, useState } from "react"

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  birthday: '',
  image_url: ''
}

function AddEditForm ({submitData, user = null}) {
  const [dataForm, setDataForm] = useState(initialValues)
  
  useEffect(()=>{
    if (user) setDataForm(user)
  }, [user])
  
  const handleChange = (e) => {
    const {name , value} = e.target
    
    setDataForm({
      ...dataForm,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user){

      submitData(user.id, dataForm)
    } else {
      
      submitData(dataForm)
    }
    setDataForm(initialValues)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          First Name:
          <input 
          type="text" 
          name="first_name" 
          placeholder="First name"
          value = {dataForm.first_name}
          onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input 
          type="text" 
          name="last_name" 
          placeholder="Last Name"
          value = {dataForm.last_name}
          onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input 
          type="email" 
          name="email" 
          placeholder="Email"
          value = {dataForm.email}
          onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input 
          type="password" 
          name="password" 
          placeholder="Password"
          value = {dataForm.password}
          onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Birthday
          <input 
            type="date" 
            name="birthday"
            placeholder="Birthday"
            value = {dataForm.birthday.split('T')[0]}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input 
          type="url" 
          name="image_url" 
          placeholder="Image URL"
          value = {dataForm.image_url}
          onChange={handleChange}
          />
        </label>
      </div>
    <button>
      {user ? 'Edit' : 'Add'}
    </button>
    {user && (
      <button onClick={()=> setDataForm(initialValues)}>
        Cancel
      </button>
    )}
    </form>
  )
}

export default AddEditForm