import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddImage from "./pages/AddImage";
import '../src/style/App.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddImage />} />
            </Routes>
        </Router>
    );
}

export default App;
