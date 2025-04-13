import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History'; // <-- import this
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} /> {/* <-- new route */}
      </Routes>
    </Router>
  );
}

export default App;





