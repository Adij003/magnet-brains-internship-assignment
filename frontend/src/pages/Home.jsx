import { Link } from 'react-router-dom'
import { FaTicketAlt } from 'react-icons/fa'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {toast} from 'react-toastify'
// import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Home() {
//   const { user } = useSelector((state) => state.auth);

  // Check if user exists before accessing isAdmin
//   const isAdmin = user?.isAdmin || false;

  return (
    <>
      <section className='heading'>
        {/* {isAdmin ? (
          <h1>Welcome Admin</h1>  // If user is admin, show 'Welcome Admin'
        ) : (
          <h1>What do you need help with?</h1>  // If not, show 'What do you need help with?'
        )}

        {!isAdmin && <p>Please choose from an option below</p>}   */}
        <h1>What do you need help with?</h1> 
        <p>Please choose from an option below</p>
      </section>

      {/* {!isAdmin && (  // Only show this link if the user is not an admin
        <Link to='/new-faq' className='btn btn-reverse btn-block'>
          <FaQuestionCircle /> Ask a new Question
        </Link>
      )} */}
       <Link to='/new-task' className='btn btn-reverse btn-block'>
          <FaTicketAlt /> Assign a new Task
        </Link>

      
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
