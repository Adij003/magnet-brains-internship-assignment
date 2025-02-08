import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, reset } from "../features/auth/authSlice";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
// import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewTask() {
  // const { isLoading, isError, isSuccess, message } = useSelector((state) => state.tickets)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsers, isLoading, isError, message } = useSelector((state) => state.auth);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignedUser, setAssignedUser] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    // dispatch(createTicket({ title, description, dueDate, priority, assignedUser }));

    console.log({ title, description, dueDate, priority, assignedUser });
  };

  return (
    <>
    <BackButton url="/" />
    <section className="heading">
      <h1>Assign a New Task</h1>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="assignedUser">Assign To</label>
          <select value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)} required>
            <option value="">Select a user</option>
            {allUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group form-group-submit-btn">
          <button className="btn btn-block submit-btn-new">Submit</button>
        </div>
      </form>
    </section>
  </>
  );
}

export default NewTask;
