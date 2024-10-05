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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Create_account />} />
        <Route path="/home" element={<Home />} />
        <Route path="/event/:id" element={<Events />} />
        {/* <Route path="/event" element={<Events />} /> */}
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/create-event" element={<CreateEventPage />} /> {/* Add the new route */}
        <Route path="/broadcast" element={<BroadcastPage/>} />
      </Routes>
    </Router>
    // <div className="App">
    //   {/* <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header> */}
    //   <Background/>
    //   <Bar/>
    // </div>
  );
}

export default App;
