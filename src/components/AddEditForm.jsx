import { useEffect, useState } from "react";
import "./AddEditForm.css";

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  birthday: '',
  image_url: ''
};

function AddEditForm({ submitData, user = null }) {
  const [dataForm, setDataForm] = useState(initialValues);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user) setDataForm(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value
    });

    if (name === "password" && value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataForm.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    if (user) {
      submitData(user.id, dataForm);
    } else {
      submitData(dataForm);
    }
    setDataForm(initialValues);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name:</label>
        <input
          className="form-input"
          type="text"
          name="first_name"
          placeholder="First name"
          value={dataForm.first_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input
          className="form-input"
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={dataForm.last_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          className="form-input"
          type="email"
          name="email"
          placeholder="Email"
          value={dataForm.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          className="form-input"
          type="password"
          name="password"
          placeholder="Password"
          value={dataForm.password}
          onChange={handleChange}
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
      </div>
      <div className="form-group">
        <label>Birthday:</label>
        <input
          className="form-input"
          type="date"
          name="birthday"
          placeholder="Birthday"
          value={dataForm.birthday.split("T")[0]}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Image URL:</label>
        <input
          className="form-input"
          type="url"
          name="image_url"
          placeholder="Image URL"
          value={dataForm.image_url}
          onChange={handleChange}
        />
      </div>
      <div className="form-buttons">
        <button className="submit-button" type="submit">
          {user ? "Edit" : "Add"}
        </button>
        {user && (
          <button className="cancel-button" type="button" onClick={() => setDataForm(initialValues)}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AddEditForm;
