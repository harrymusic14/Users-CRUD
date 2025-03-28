import { useState } from "react";
import { createPortal } from "react-dom";
import { useCrudApi } from "./hooks/useCrudApi";
import Modal from "./components/Modal";
import AddEditForm from "./components/AddEditForm";
import UsersList from "./components/UsersList";
import { useModal } from "./hooks/useModal";
import "./App.css";

const baseUrl = "https://users-crud-api-production-9c59.up.railway.app/api/v1/users/";

function App() {
  const [users, { create, update, remove }] = useCrudApi(baseUrl);
  const modal = useModal();

  const createUser = (newUser) => {
    create(newUser);
    modal.closeModal();
  };

  const showAddModal = () => {
    modal.showModal();
    modal.setChild(<AddEditForm submitData={createUser} />);
  };

  const updateUser = (id, updatedUser) => {
    update(id, updatedUser);
    modal.closeModal();
  };

  const showEditModal = (user) => {
    modal.showModal();
    modal.setChild(<AddEditForm submitData={updateUser} user={user} />);
  };

  const confirmDelete = async (id) => {
    try {
      await remove(id); // Espera a que la eliminación termine
      modal.closeModal(); // Cierra el modal después de eliminar
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  

  const rejectDelete = () => {
    modal.closeModal();
  };

  const showDeleteConfirmation = (user) => {
    modal.showModal();
    modal.setChild(
      <div className="delete-confirmation">
        <h2>Are you sure you want to delete {user.first_name}?</h2>
        <button className="confirm-button" onClick={() => confirmDelete(user.id)}>Yes</button>
        <button className="cancel-button" onClick={rejectDelete}>No</button>
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">Users App</h1>
        <button className="add-button" onClick={showAddModal}>
          Add new user
        </button>
      </div>

      {users && (
        <div className="users-list-container">
          <UsersList users={users || []} showEditModal={showEditModal} showDeleteConfirmation={showDeleteConfirmation} />
        </div>
      )}

      {createPortal(
        <Modal openModal={modal.isOpen} closeModal={modal.closeModal}>
          {modal.child}
        </Modal>,
        document.body
      )}
    </div>
  );
}

export default App;