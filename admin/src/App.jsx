import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

const App = () => {
  const url = "https://food-delivery-fx0r.onrender.com";
  const [loading, setLoading] = useState(true);

  // Simulate loading for 2 seconds
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        {loading ? (
          <div className="loading-spinner">
            <ClipLoader color={'#646464'} loading={loading} size={50} />
          </div>
        ) : (
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
