import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SopViewer from './pages/SopViewer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sop/:id" element={<SopViewer />} />
    </Routes>
  );
}

export default App;