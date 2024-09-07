import React from 'react';
import { BrowserRouter as Router, Routes, Route,useNavigate } from 'react-router-dom';
import PostCargo from './Components/Postcargo'; // Ensure correct import path
import BidCargo from './Components/BidCargo';

function Home() {
    const navigate = useNavigate(); // Hook to handle navigation

    return (
        <div>
            <h1>Welcome to the Tender System</h1>
            <button onClick={() => navigate('/PostCargo')}>
                Post Cargo
            </button>
            <button onClick={() => navigate('/BidCargo')}>
                Bid Cargo
            </button>
        </div>
    );
}

function App() {
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/BidCargo" element={<BidCargo />} />
                <Route path="/PostCargo" element={<PostCargo />} />
            
            </Routes>
        </Router>
        
    );
}


export default App;

