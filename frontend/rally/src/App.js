import logo from './logo.svg';
import './App.css';
import background, { Background } from './main/main.jsx';
import { Bar } from './main/horizontalBar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import ProfilePage from './profile/ProfilePage.jsx';
import CreateEventPage from './pages/Create_Event.jsx';
import Create_account from './pages/create_account.jsx';
import BroadcastPage from './broadcasts/BroadcastPage.js';
import { useEffect, useState } from 'react';
import Log_In from './pages/Log_In';
import Invites from './pages/invites.jsx';
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      // Replace this with your actual login check logic
      const userLoggedIn = localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null;
      setIsLoggedIn(userLoggedIn);
    }, []);

    return (
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Log_In />} />
          <Route path="/signup" element={<Create_account />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event/:id" element={<Events />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/broadcast" element={<BroadcastPage />} />
          <Route path="/invites/:id" element={<Invites />} />
        </Routes>
      </Router>
    );
}

export default App;
