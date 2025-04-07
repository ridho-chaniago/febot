import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/molecules/navbar';
import Dashboard from './components/pages/Dashboard';
import Portfolio from './components/pages/Portfolio';
// import History from 'pages/History';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        {/* <Route path="/history" element={<History />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
