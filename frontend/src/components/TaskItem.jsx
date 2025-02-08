import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, reset as resetUsers } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function TaskItem({ task }) {
  const { user } = useSelector((state) => state.auth);

  
  const isAdmin = user?.isAdmin || false;
  const navigate = useNavigate();
  if (!task) {
    return null; // Prevent errors if task is undefined
  }
 
  return (
    <>
      <div
        className="task"
        onClick={() =>
          navigate(isAdmin ? `/tasks/${task._id}` : `/tasks-user/${task._id}`)
        }
      >
        <div className="first-box">
          <div>
            <h3>{task.title}</h3>
          </div>
          <div className="lilflex">
            <h4>Due date:</h4>
            <div className="lilgap">
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
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
            <div className="lilgap">{task.assignedUser}</div>
          </div>
          {/* <div className="lilflex">Update Task</div> */}
        </div>
        <div className="second-box">
          <h4>Description:</h4>
          <div className="lilgap">{task.description}</div>
        </div>
      </div>
    </>
  );
}

export default TaskItem;
