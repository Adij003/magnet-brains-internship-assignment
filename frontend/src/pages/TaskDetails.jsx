import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, reset as resetUsers } from "../features/auth/authSlice";
import { getTaskById, updateTask, deleteTask } from "../features/tasks/taskSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function TaskDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, allUsers, isLoading: isUsersLoading, isError: isUsersError, message: usersMessage } = useSelector((state) => state.auth);
  const { task, isLoading: isTasksLoading, isError: isTasksError, isSuccess, message: tasksMessage } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignedUser, setAssignedUser] = useState("");
  const [status, setStatus] = useState("");

  // Fetch task and users when component mounts
  useEffect(() => {
    dispatch(getTaskById(id));
    dispatch(getAllUsers());
  }, [dispatch, id]);

  // Sync state with fetched task data 
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
      setPriority(task.priority || "medium");
      setAssignedUser(task.assignedUser || "");
      setStatus(task.status || "pending");
    }
  }, [task]);

  // Handle error messages
  useEffect(() => {
    if (isTasksError) {
      toast.error(tasksMessage);
    }
    if (isUsersError) {
      toast.error(usersMessage);
    }
  }, [isTasksError, isUsersError, tasksMessage, usersMessage]);

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      id, 
      title,
      description,
      dueDate,
      priority,
      assignedUser,
      status,
    };

    dispatch(updateTask(updatedTask));
    toast.success("Task updated successfully!");
    navigate("/tasks"); // Redirect after update
  };

  if (isUsersLoading || isTasksLoading) {
    return <Spinner />;
  }

  if (!task) {
    return <h3>Loading task details...</h3>;
  }

  const onDelete = (e) => {
    e.preventDefault()
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;  
    dispatch(deleteTask(id));
    toast.success("Task Deleted successfully!");
    navigate("/tasks"); 


  }

  return (
    <>
      <BackButton url="/tasks" />
      <section className="heading">
        <h1>Update Task</h1>
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
            <label htmlFor="status">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
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

          <div className="form-group form-group-submit-btn ">
            <button onClick={onDelete} className="btn-del btn-block submit-btn-new">Delete</button>
          </div>
        </form>
      </section>
    
    </>

  );
}

export default TaskDetails;
