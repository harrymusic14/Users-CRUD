import UserCard from "./UserCard";

function UserList ({users, showEditModal, showDeleteConfirmation }) {
    return (
        <div>
            {users.map((user) => (
                <UserCard  
                key={user.id} 
                user= {user} 
                showEditModal={showEditModal} 
                showDeleteConfirmation = {showDeleteConfirmation}
                />
                
                ))}
                {users.length === 0 && <p>No users found</p>}
            </div>
        )
    }
export default UserList