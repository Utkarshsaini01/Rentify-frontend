import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import Login from './Components/Login/Login';
import Signup from './Components/Login/Signup';
import Home from './Components/Home/Home';
import BuyerDashboard from './Components/Buyer/BuyerDashboard';
import SellerDashboard from './Components/Seller/SellerDashboard';

function App() {
  const { isAuthenticated, userType, setAuth } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        {!isAuthenticated && (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </>
        )}

        {/* Private routes for authenticated users */}
        {isAuthenticated && userType === 'buyer' && (
          <Route path="/" element={<BuyerDashboard />} />
        )}
        {isAuthenticated && userType === 'seller' && (
          <Route path="/" element={<SellerDashboard />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
