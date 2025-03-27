import { useState } from "react"
import { createPortal } from "react-dom"
import { useCrudApi } from "./hooks/useCrudApi"
import Modal from './components/Modal'
import AddEditForm from './components/AddEditForm'
import UsersList from "./components/UsersList"
import { useModal } from "./hooks/useModal"

const baseUrl = 'https://users-crud-api-production-9c59.up.railway.app/api/v1/users/'


function App() {
 const [users, {create, update, remove}] = useCrudApi(baseUrl)

 const modal = useModal()

const createUser = (newUser) => {
  create(newUser)
  modal.closeModal()
}

const showAddModal = () => {
  modal.showModal()
  modal.setChild(<AddEditForm submitData ={createUser} />)
}

const updateUser = (id, updatedUser) => {
  update(id, updatedUser)
  modal.closeModal()
}

const showEditModal = (user) => {
  modal.showModal()
  modal.setChild(<AddEditForm submitData={updateUser} user={user} />)
}

const confirmDelete = (id) => {
  remove(id)
  modal.closeModal()
}
const rejectDelete = () => {
  modal.closeModal()
} 

const showDeleteConfirmation = (user) => {
  modal.showModal()
  modal.setChild(
    <div>
      <h2>Are you sure you want to delete {user.firt_name}?</h2>
      <button onClick={() => confirmDelete(user.id)}>Yes</button>
      <button onClick={rejectDelete}>No</button>
    </div>
  )
}

  return (
    <div>
      <div>
      <h1>Users App</h1>
      <button onClick={showAddModal}>
        Add new user
      </button>
    </div>
    
    {users && <UsersList 
    users={users} 
    showEditModal={showEditModal}
    showDeleteConfirmation={showDeleteConfirmation}
    />}
    
    {createPortal(
      <Modal openModal = {modal.isOpen} closeModal={modal.closeModal}>
        {modal.child}
      </Modal>,
      document.body
    )}
      </div>
  )
} 

export default App
