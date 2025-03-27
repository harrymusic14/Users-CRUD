import { LuTrash2 } from "react-icons/lu"

function UserCard ({user, showEditModal, showDeleteConfirmation }) {
    return (
        <div>
            <h2>{user.first_name} {user.last_name}</h2>
            <p>{user.email}</p>
            <p>{user.birthday.split('T')[0]}</p>
            <img src={user.image_url} alt={user.first_name} width={85} height={85} />
            <br/>
            <div>
                <button onClick={() => showEditModal(user)}>
                    Edit
                </button>
                <button onClick={() => showDeleteConfirmation(user)} arial-label='Delete'>
                    <LuTrash2/>
                </button>
            </div>
        </div>
    )
}
export default UserCard