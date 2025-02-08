import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasks, reset } from '../features/tasks/taskSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TaskItem from '../components/TaskItem';

function AllTasks() {
    const { tasks, isLoading, isSuccess, isError, message } = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

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

    return (
        <>
        <BackButton url="/" />
        <h1>All Tasks</h1>
        <div className="">
          
            {tasks && Array.isArray(tasks) && tasks.length > 0 ? (
                tasks.map((task) => <TaskItem key={task._id} task={task} />)
            ) : (
                <p>No tasks found.</p>
            )}
        </div>
    </>
    );
}

export default AllTasks;
