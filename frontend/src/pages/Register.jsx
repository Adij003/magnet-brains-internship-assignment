import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    isAdmin: "false"
  });

  const { name, email, password, password2, isAdmin } = formData;

  const { user, isError, isLoading, isSuccess, message} = useSelector(  (state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  useEffect(() => {
    if(isError){
      console.log('there is some error')
        toast.error(message)
    }

    // redirect when logged in
    if(isSuccess || user){
        navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,

    }));
  };

 


const onSubmit = (e) => {
    e.preventDefault()

    // console.log('submit button pressed')
    // console.log('here is all the submitted data', formData)

    if (password !== password2) {
        toast.error('Passwords do not match')
      } 
    else {
      // console.log('what is isAdmin', isAdmin)
        const userData = {
            name,
            email,
            password,
            isAdmin
            
        }
        
        dispatch(register(userData))
      }

  }

//   if(isLoading){
//     return <Spinner/>
//   }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register {user}
        </h1>
        <p> a new User/Admin</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}   >
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="email"
              className="form-control"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm password'
              required
            />
          </div>
          <div className="form-group">
  <select
    name="isAdmin"
    id="isAdmin"
    className="form-control"
    value={formData.isAdmin}
    onChange={ (e) =>
            setFormData((prevState) => ({
              ...prevState,
              isAdmin: e.target.value, // Updates isAdmin with "true" or "false"
            }))
    }
  >
    <option value="false">User</option>
    <option value="true">Admin</option>
  </select>
</div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
