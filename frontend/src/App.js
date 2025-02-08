import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import AllUsers from './pages/AllUsers';
import PrivateRoute from "./components/PrivateRoute";
import NewTask from './pages/NewTask';
import AllTasks from './pages/AllTasks';
import TaskDetails from './pages/TaskDetails';
import UserIndividualTask from './pages/UserIndividualTask';



function App() {
  return <>
  <Router>
    <div className="container">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/allUsers' element={<AllUsers/>}/>
        <Route path="/new-task" element={<PrivateRoute />}>
              <Route path="/new-task" element={<NewTask />} />
            </Route>
            <Route path="/tasks" element={<PrivateRoute />}>
              <Route path="/tasks" element={<AllTasks />} />
            </Route>
            <Route path="/tasks/:id" element={<PrivateRoute />}>
              <Route path="/tasks/:id" element={<TaskDetails />} />
            </Route>
            <Route path="/tasks-user/:id" element={<PrivateRoute />}>
              <Route path="/tasks-user/:id" element={<UserIndividualTask />} />
            </Route>

      </Routes>
    </div>
  </Router>
  <ToastContainer />

  </>
}

export default App;
