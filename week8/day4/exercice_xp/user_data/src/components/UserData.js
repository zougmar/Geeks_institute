import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../redux/userSlice";

const UserData = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          User Data
        </h2>

        {loading && <p className="text-gray-500 text-center">Loading...</p>}
        {error && (
          <p className="text-red-500 text-center">Error: {error}</p>
        )}

        {user && user.name && (
          <div className="text-center space-y-2">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserData;
