
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../Redux/alluser'; // Ensure the path is correct

const Alluser = () => {
  const dispatch = useDispatch();
  
  // Accessing state from Redux store
  const { alluser, loading, error } = useSelector((state) => state.alluser);

  useEffect(() => {
    // Dispatch the thunk to fetch users when the component mounts
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>All Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p>Error fetching users: {error}</p>}
      <ul>
        {alluser.map((user) => (
          <li key={user._id}>{user.name}</li> // Replace `id` and `name` with actual properties of your user data
        ))}
      </ul>
    </div>
  );
};

export default Alluser;
