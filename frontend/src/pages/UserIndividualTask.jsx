import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTaskById, updateTask, deleteTask } from "../features/tasks/taskSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function UserIndividualTask() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading: isUsersLoading, isError: isUsersError, message: usersMessage } = useSelector((state) => state.auth);
  const { task, isLoading: isTasksLoading, isError: isTasksError, isSuccess, message: tasksMessage } = useSelector((state) => state.tasks);
  

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [assignedUser, setAssignedUser] = useState("");
  const [status, setStatus] = useState("");

  // Fetch task and users when component mounts
  useEffect(() => {
    if (user) {
      dispatch(getTaskById(id));
    }
  }, [dispatch, id, user]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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
    // if (isUsersError) {
    //   toast.error(usersMessage);
    // }
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

  if (!task || !user) {
    return <h3>Loading task details...</h3>;
  }



  return (
    <>
      <BackButton url="/tasks" />
      <section className="heading">
        <h1>Update Status</h1>
        <p></p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
        <div className="form-group">
            <label htmlFor="status">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              required
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description..."
              required
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} disabled>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
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

export default UserIndividualTask;
