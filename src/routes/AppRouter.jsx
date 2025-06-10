import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Home from '../pages/Home';
import ChatRoom from '../pages/ChatRoom';
import Tagged from '../pages/Tagged';
import Settings from '../pages/Settings';
import VideoCall from '../pages/VideoCall';
import PublicChat from '../pages/PublicChat';
import SecuredChat from '../pages/SecuredChat';
import ProtectedRoute from '../components/Shared/ProtectedRoute';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/tagged" element={<Tagged />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/video-call" element={<VideoCall />} />
        <Route path="/public-chat" element={<PublicChat />} />
        <Route
          path="/secured-chat"
          element={
            <ProtectedRoute>
              <SecuredChat />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
