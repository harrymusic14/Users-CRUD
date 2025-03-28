import { LuTrash2 } from "react-icons/lu";
import { GrEdit } from "react-icons/gr";
import "./UserCard.css";

function UserCard({ user, showEditModal, showDeleteConfirmation }) {
    return (
        <div className="user-card">
            <h2 className="user-name">{user.first_name} {user.last_name}</h2>
            <p className="user-email">{user.email}</p>
            <p className="user-birthday">{user.birthday.split('T')[0]}</p>
            <img className="user-image" src={user.image_url} alt={user.first_name} width={85} height={85} />
            <br/>
            <div className="user-actions">
                <button className="edit-button" onClick={() => showEditModal(user)}>
                    <GrEdit/>
                </button>
                <button className="delete-button" onClick={() => showDeleteConfirmation(user)} aria-label='Delete'>
                    <LuTrash2/>
                </button>
            </div>
        </div>
    );
}

export default UserCard;