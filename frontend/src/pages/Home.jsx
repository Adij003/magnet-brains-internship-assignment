import { Link } from 'react-router-dom'
import { FaTicketAlt } from 'react-icons/fa'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


function Home() {
  const { user } = useSelector((state) => state.auth);

  
  const isAdmin = user?.isAdmin || false;

  // console.log('User is logged in, and isAdmin: ', isAdmin)

  return (
    <>
      <section className='heading'>
  
        { isAdmin && <h1>Hello Admin, assign tasks easily!</h1> }
        {isAdmin && <p>Please choose from an option below</p>}

        { !isAdmin && <h1>Welcome!</h1> }
        {!isAdmin && <p>Please view your tasks</p>}
      </section>

       { isAdmin && <Link to='/new-task' className='btn btn-reverse btn-block'>
          <FaTicketAlt /> Assign a new Task
        </Link>}

      
      <Link  
      to='/tasks'
    //   to={isAdmin ? '/admin-tickets' : '/faqs'}
       className='btn btn-block'>
        <FaTicketAlt /> View all Tasks
      </Link>
    </>
  )
}

export default Home
