import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Inventory from "./Pages/Inventory";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="*" element={<Login />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
