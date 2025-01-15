import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputForm from './pages/InputForm';
import Result from './pages/Result';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputForm />} />
        {/* <Route path="/" element={<div>Hello</div>} /> */}
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
