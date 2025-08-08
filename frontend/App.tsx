import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DatingDatePage from './pages/DatingDatePage';
import CountdownPage from './pages/CountdownPage';
import BirthdayMessagePage from './pages/BirthdayMessagePage';
import PersonalMessagePage from './pages/PersonalMessagePage';
import WishesPage from './pages/WishesPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';

export default function App() {
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route 
            path="/" 
            element={
              <DatingDatePage 
                onCorrectAnswer={() => {
                  setHasAnsweredCorrectly(true);
                  setCurrentPage(2);
                }}
                hasAnswered={hasAnsweredCorrectly}
              />
            } 
          />
          <Route 
            path="/countdown" 
            element={
              hasAnsweredCorrectly ? (
                <CountdownPage onContinue={() => setCurrentPage(3)} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/birthday" 
            element={
              currentPage >= 3 ? (
                <BirthdayMessagePage onContinue={() => setCurrentPage(4)} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/message" 
            element={
              currentPage >= 4 ? (
                <PersonalMessagePage onContinue={() => setCurrentPage(5)} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/wishes" 
            element={
              currentPage >= 5 ? (
                <WishesPage onContinue={() => setCurrentPage(6)} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/gallery" 
            element={
              currentPage >= 6 ? (
                <PhotoGalleryPage />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}
