import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";

import Inventory from "./Pages/Inventory/Inventory";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
    return (
        <>
            <Router>
                <Navigation/>
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
