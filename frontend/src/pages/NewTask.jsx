import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, reset as resetUsers } from "../features/auth/authSlice";
import { createTask, reset as resetTasks } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, allUsers, isLoading: isUsersLoading, isError: isUsersError, message: usersMessage } = useSelector((state) => state.auth);
  const { isLoading: isTasksLoading, isError: isTasksError, isSuccess, message: tasksMessage } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignedUser, setAssignedUser] = useState("");

//   console.log('here we are checning if we have user', user)
  useEffect(() => {
    dispatch(getAllUsers());
    return () => {
      dispatch(resetUsers());
      dispatch(resetTasks());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isTasksError) {
      toast.error(tasksMessage);
    }
    if (isUsersError) {
      toast.error(usersMessage);
    }
    if (isSuccess) {
      toast.success("Task created successfully!");
      navigate("/");
    }
  }, [isTasksError, isUsersError, isSuccess, tasksMessage, usersMessage, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('is admin user check: ', user.isAdmin)
    const taskData = { title, description, dueDate, priority, assignedUser };
    dispatch(createTask(taskData));
  };

  if (isUsersLoading || isTasksLoading) {
    return <Spinner />;
  }

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
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task title..." required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter task description..." required />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
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
