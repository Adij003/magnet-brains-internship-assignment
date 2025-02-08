import axios from 'axios'

const API_URL = '/api/tasks/'

const createTask = async (taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    
    const response = await axios.post(API_URL, taskData, config)

    return response.data
}

const getAllTasks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    
    const response = await axios.get(API_URL, config)

    return response.data
}

// Get a single task by ID
const getTaskById = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(API_URL + id, config);
    console.log('This is from taskService js', response.data)
    return response.data;
  };
  
  // Update a task
  const updateTask = async (taskData, token) => {
    const { id, ...updateFields } = taskData; // Extract id from taskData
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.put(API_URL + id, updateFields, config);
    return response.data;
  };

  const deleteTask = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.delete(API_URL + id, config);
    console.log('Deleted task, this message is from taskServices')
    return response.data;
  };

const taskService = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}

export default taskService