import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { useState } from 'react';

const getAuthenticatedUser = () => {
  const item = localStorage.getItem('authenticated_user')
  return JSON.parse(item)
}

const setAuthenticatedUser = (user) => {
  const stringfiedUser = JSON.stringify(user)
  localStorage.setItem('authenticated_user', stringfiedUser)
}

const PrivateRoute = ({ children }) => {
  return getAuthenticatedUser() ? children : <Navigate to="/login" />
}

function App() {
  const [loggedUser, setLoggedUser] = useState(getAuthenticatedUser());

  const loginUser = (user) => {
    setAuthenticatedUser(user)
    setLoggedUser(user)
  }

  const logoutUser = () => {
    localStorage.removeItem('authenticated_user')
    setLoggedUser(null)
  }

  return (
    <Router>
      <div className='App'>
        <Header 
          loggedUser={loggedUser}
          onLogout={logoutUser}
        />
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                loggedUser ? 
                <Navigate to="/dashboard" /> :
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/login" 
              element={
                <Login onLogin={loginUser} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
