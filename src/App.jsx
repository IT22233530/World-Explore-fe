import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { Routes, Route, Navigate,Router } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import CountryDetails from './pages/CountryDetails';
import Navbar from './components/Navbar';
import { useUser } from './context/UserContext';
import Favourite from './pages/Favourite';
import AboutUs from './pages/AboutUs';
import UserProfile from './pages/UserProfile';

function App() {

  const { isAuthenticated } = useUser();

  return (
    <>


    {isAuthenticated && <Navbar />}
    <Routes>
      
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/country/:code" 
        element={
          <ProtectedRoute>
            <CountryDetails />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/favorites" 
        element={
          <ProtectedRoute>
            <Favourite />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/about" 
        element={
          <ProtectedRoute>
            <AboutUs />
          </ProtectedRoute>
        } 
      />

      
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } 
      />


    </Routes>

    </>
  );
}

export default App;
