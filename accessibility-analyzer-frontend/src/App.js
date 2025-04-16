import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History'; // <-- import this
import ReportDetails from './pages/ReportDetails';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} /> {/* <-- new route */}
        <Route path="/report/:id" element={<ReportDetails />} />
      </Routes>
    </Router>
  );
}

export default App;





