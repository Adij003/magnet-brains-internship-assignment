import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks, reset } from "../features/tasks/taskSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import TaskItem from "../components/TaskItem";
import {FaArrowCircleRight, FaArrowCircleLeft} from 'react-icons/fa'


function AllTasks() {
    const dispatch = useDispatch();
    
    const { tasks, isLoading, isSuccess, isError, message } = useSelector((state) => state.tasks);
    
    const [page, setPage] = useState(1);
    const limit = 5; // Number of tasks per page

    // Fetch tasks whenever 'page' changes
    useEffect(() => {
        dispatch(getAllTasks({ page, limit }));
    }, [dispatch, page]);

    // Reset state on component unmount
    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        };
    }, [dispatch, isSuccess]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <p>Error: {message}</p>;
    }

    console.log('tasks: ', tasks.length)
    // console.log('Redux state:', useSelector((state) => state.tasks));
console.log('tasks:', tasks);


    // if (tasks) {
    //     return <h3>Loading task details...</h3>;
    //   }

    return (
        <>
            <BackButton url="/" />
            <h1>All Tasks</h1>
            <div>
                {tasks && tasks.length > 0 ? (
                    tasks.map((task) => <TaskItem key={task._id} task={task} />)
                ) : (
                    <p>No tasks found.</p>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                <button className="btn btn-reverse btn-back"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                   <FaArrowCircleLeft/>  Previous
                </button>
                <span>Page {page}</span>
                <button className="btn btn-reverse btn-back pageNext"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={tasks.length < limit} // Disable if fewer tasks than limit
                >
                    <FaArrowCircleRight/> Next
                </button>
            </div>
        </>
    );
}

export default AllTasks;
