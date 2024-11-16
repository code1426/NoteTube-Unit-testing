import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import MyDeck from "./pages/MyDecksPage";
import ProfilePage from "./pages/ProfilePage";
import LoadingScreen from "./components/LoadingScreen";

import useUserVerification from "./hooks/useUserVerification";

const App = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading: loadingVerification,
  } = useUserVerification();

  return loadingVerification ? (
    <LoadingScreen />
  ) : (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? <LandingPage /> : <Navigate to="/home" />
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage setAuth={setIsAuthenticated} />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <RegisterPage setAuth={setIsAuthenticated} />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <HomePage setAuth={setIsAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/decks"
            element={isAuthenticated ? <MyDeck /> : <Navigate to="/" />}
          />
          <Route
            path="/flashcards/:deckId/:deckName"
            element={isAuthenticated ? <FlashcardsPage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
