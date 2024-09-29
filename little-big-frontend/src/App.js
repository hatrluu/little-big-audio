import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import About from './pages/about/About';
import Audio from './pages/audio/Audio';
import Home from './pages/home/Home';

//Functioning as router configs
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="audio" element={<Audio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;