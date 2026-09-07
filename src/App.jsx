import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import TiffinProviders from './pages/TiffinProviders.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
        <Routes>
          {/* Your existing home route */}
          <Route index path="/" element={<Home />} />
          
          {/* Your new page route */}
          <Route index path="/tiffin-provider" element={<TiffinProviders />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
