import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import Game from './Game';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/projects' element={<ProjectList />} />
        <Route path='/add-project' element={<ProjectForm />} />
        {/* <Route path='/game' element={<Game />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
