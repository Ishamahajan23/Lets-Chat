import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { ChatWindow } from "../pages/ChatWindow";
import Settings from "../pages/Settings";
import ChatLayout from "../pages/ChatLayout";
import ChatRoom from "../pages/ChatRoom";
import GroupList from "../components/Groups/GroupList";
import GroupChats from "../components/Groups/GroupChats";


const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/" />;
};

export const AppRouter = ({ darkMode, toggleDarkMode }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      />
      <Route
        path="/register"
        element={
          <Register darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        }
      />
      <Route
        path="/chatwindow"
        element={
          <ProtectedRoute>
            <ChatWindow darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chatlayout"
        element={
          <ProtectedRoute>
            <ChatLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/:id/:name"
        element={
          <ProtectedRoute>
            <ChatRoom darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/groups"
        element={
          <ProtectedRoute>
            <GroupList darkMode={darkMode} />
          </ProtectedRoute>
        }
      />
       <Route
        path="/group/:id/:name"
        element={
          <ProtectedRoute>
            <GroupChats darkMode={darkMode} />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};
