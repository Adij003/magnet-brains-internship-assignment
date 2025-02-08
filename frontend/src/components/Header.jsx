import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.isAdmin || false;

  const onLogout = () => {
    console.log("logout button pressed");
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Task Management Admin</Link>
      </div>
      <ul>
        {user ? (
          <div style={{ display: "flex" }}>
         {isAdmin && ( 
              <li>
                <Link to="/allUsers">
                  <button className="btn">
                    <FaUser /> Employees
                  </button>
                </Link>
              </li>
            )}
            <li>
              <button className="btn " onClick={onLogout}>
                {" "}
                <FaSignOutAlt /> Logout{" "}
              </button>
            </li>
          </div>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            {/* <li>
              <Link to='/register'>
              <FaUser/> Register
              </Link>
          </li> */}
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
