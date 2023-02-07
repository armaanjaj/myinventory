import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";

import Inventory from "./Pages/Inventory/Inventory";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";

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
