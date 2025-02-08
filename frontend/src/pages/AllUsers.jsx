import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, reset as resetUsers } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'


import BackButton from "../components/BackButton";
function AllUsers() {

  const dispatch = useDispatch();
  const { user, allUsers, isLoading: isUsersLoading, isError: isUsersError, message: usersMessage } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAllUsers());
    return () => {
      dispatch(resetUsers());
    };
  }, [dispatch]);
  return (
    <div>
      <div className="allUser">

        <div>
        <BackButton url='/'/> 

        </div>
        <div>
        <Link to='/register'>
              <FaUser/> Register
              </Link>
        </div>
      </div>
      <div className="allUser-main">
        <h3>
          Name
        </h3>
        <h3>
          Email
        </h3>
        <h3>
          Role
        </h3>
      </div>
      <div>
        {allUsers.map((user) => (
           <div className="allUser-main lilpad">
            <div>
            {user.name}
            </div>
            <div>
            {user.email}
           </div>
           <div>
            {user.isAdmin? 'Admin' : 'User'}
           </div>
           </div>
        ))}
      </div>

    </div>
  )
}

export default AllUsers