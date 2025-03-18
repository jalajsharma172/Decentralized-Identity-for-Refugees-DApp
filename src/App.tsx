import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import Web3Provider from './context/Web3Provider';
import { Userdocuments } from './pages/Userdocuments.tsx';

function App() {
  return (
    <Web3Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="userdocuments" element={<Userdocuments />} />
            {/* Other routes will be added as we implement them */}
            <Route path="*" element={<div>Page not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Web3Provider>
  );
}

export default App;