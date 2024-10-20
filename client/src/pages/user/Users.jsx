import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users-data', { withCredentials: true });
        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Something went wrong');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Toggle Block Status
  const toggleBlockStatus = async (userId, isBlocked) => {
    try {
      const updatedStatus = !isBlocked; // Invert the current isBlocked status
      await axios.patch(`http://localhost:8000/api/users/block/${userId}`, { isBlocked: updatedStatus }, { withCredentials: true });

      // Update the user's block status in the UI
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isBlocked: updatedStatus } : user
        )
      );
    } catch (err) {
      console.error('Error updating block status:', err);
    }
  };

  // Render loading, error, or the grid of users
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="p-4 border rounded-lg shadow-md bg-white">
            <img 
              src={`http://localhost:8000${user.profile_pic.replace(/\\/g, '/')}`} 
              alt={`${user.first_name} Logo`} 
              className="h-24 w-24 object-cover rounded-full mx-auto mb-4" 
            />
            <h3 className="text-lg font-bold">{user.first_name} {user.last_name}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            {/* Make the status clickable to toggle block/unblock */}
            <p 
              onClick={() => toggleBlockStatus(user._id, user.isBlocked)} 
              className={`cursor-pointer ${user.isBlocked ? 'text-red-600' : 'text-green-600'}`}
            >
              Status: {user.isBlocked ? 'Blocked' : 'Active'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
