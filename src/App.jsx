import { useState } from "react"
import { useCrudApi } from "./hooks/useCrudApi"

const baseUrl = 'https://users-crud-api-production-9c59.up.railway.app/api/v1/users/'


function App() {
 const [users] = useCrudApi(baseUrl)
  return (
    <div>
      <h1>Users App</h1>
      <pre>
        {JSON.stringify(users, null, 2)}
      </pre>

      <AddEditForm/> 
    </div>
  )
}

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  birthdate: '',
  image_url: ''
}

function AddEditForm ({user = null}) {
  const [dataForm, setDataForm] = useState(initialValues)
  
  const handleChange = (e) => {
    const {name} = e.target
  }

  const handleSubmit = (e) => {}
  
  return (
    <form>
      <div>
        <label>
          First Name:
          <input 
          type="text" 
          name="first_name" 
          placeholder="First name"
          value = {dataForm.first_name}
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
          />
        </label>
      </div>
      <div>
        <label>
          Birthdate:
          <input 
          type="birthadte" 
          name="birthadate" 
          placeholder="Birthdate"
          value = {dataForm.birthdate}
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
          />
        </label>
      </div>
    <button>
      {user ? 'Edit' : 'Add'}
    </button>
    </form>
  )
}

export default App
