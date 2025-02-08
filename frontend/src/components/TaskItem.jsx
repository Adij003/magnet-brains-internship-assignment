import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, reset as resetUsers } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function TaskItem({ task }) {
  const dispatch = useDispatch();
  const { user, allUsers } = useSelector((state) => state.auth);
  const isAdmin = user?.isAdmin || false;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers());
    return () => {
      dispatch(resetUsers());
    };
  }, [dispatch]);

  if (!task) return null; 

  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "yellow";
      default:
        return "gray";
    }
  };

  
  const assignedUserName = allUsers?.find((u) => u._id === task.assignedUser)?.name || "Unknown User";

  return (
    <div
      className="task"
      style={{ borderLeft: `20px solid ${getPriorityColor(task.priority)}` }}
      onClick={() =>
        navigate(isAdmin ? `/tasks/${task._id}` : `/tasks-user/${task._id}`)
      }
    >
      <div className="first-box">
        <h3>{task.title}</h3>
        <div className="lilflex">
          <h4>Due date:</h4>
          <div className="lilgap">{new Date(task.dueDate).toLocaleDateString()}</div>
        </div>
        <div className="lilflex">
          <h4>Status:</h4>
          <div className="lilgap">{task.status}</div>
        </div>
      </div>

      <div className="first-box">
        <div className="lilflex">
          <h4>Priority:</h4>
          <div className="lilgap">{task.priority}</div>
        </div>
        <div className="lilflex">
          <h4>Assigned To:</h4>
          {isAdmin && <div className="lilgap">{assignedUserName}</div>}
          {!isAdmin && <div className="lilgap">Me ({user.name})</div>}

        </div>
      </div>

      <div className="second-box">
        <h4>Description:</h4>
        <div className="lilgap">{task.description}</div>
      </div>
    </div>
  );
}

export default TaskItem;
