import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

// Placeholder Pages
const Courses = () => <div className="p-8"><h1 className="text-2xl font-bold">Cours</h1></div>;
const Exams = () => <div className="p-8"><h1 className="text-2xl font-bold">Épreuves</h1></div>;
const Messages = () => <div className="p-8"><h1 className="text-2xl font-bold">Messages</h1></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="exams" element={<Exams />} />
          <Route path="messages" element={<Messages />} />
          {/* Add more routes later */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
