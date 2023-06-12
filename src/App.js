import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Menu from "./Menu";
import HomeScreen from "./screens/HomeScreen";
import InscriptionScreen from "./screens/InscriptionScreen";
import VideosScreen from "./screens/client/VideosScreen";
import ProfilScreen from "./screens/client/ProfilScreen";
import ForfaitsScreen from "./screens/client/ForfaitsScreen";
import VideoPlayerScreen from "./screens/client/VideoPlayerScreen";
import GestionAdminScreen from './screens/admin/GestionAdminScreen';
import './App.css';
import "./ressource/theme.css";
import Axios from 'axios';

Axios.defaults.withCredentials = true;

/**
 * Représente le site Web en son entier. Récupère au début la session du back-en si elle existe. 
 * Comprends le routing du site.
 */
function App() {

  const [isLoggedInAndHasRole, setIsLoggedInAndHasRole] = useState(() => ({ isLoggedIn: false, hasRole: null }));

  useEffect(() => {
    getLogin();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <BrowserRouter>
        <Menu isLoggedIn={isLoggedInAndHasRole.isLoggedIn} handleLogAndRole={(log, role) => handleLogAndRole(log, role)} />
        <Routes>
          <Route exact path="/" element={isLoggedInAndHasRole.isLoggedIn ? <Navigate replace to="/profil" /> : <HomeScreen handleLogAndRole={(log, role) => handleLogAndRole(log, role)} />} />
          <Route exact path="/inscription" element={isLoggedInAndHasRole.isLoggedIn ? <Navigate replace to="/profil" /> : <InscriptionScreen handleLogAndRole={(log, role) => handleLogAndRole(log, role)} />} />
          <Route exact path="/videos" element={<VideosScreen />} />
          <Route exact path="/profil" element={isLoggedInAndHasRole.isLoggedIn ?
            isLoggedInAndHasRole.hasRole ?
              <GestionAdminScreen /> :
              <ProfilScreen getLogin={() => getLogin()} /> :
            <Navigate replace to="/" />} />
          <Route exact path="/forfaits" element={<ForfaitsScreen />} />
          <Route exact path="/videoplayer" element={<VideoPlayerScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

  /**
   * Vérifie si il y a un utilisateur dan la session.
   */
  function getLogin() {
    Axios.get(process.env.REACT_APP_BASE_URL + "/login", {
    }).then((response) => {
      handleLogAndRole(response.data.loggedIn, response.data.hasRole);
    });
  }

  /**
   * Met à jour le LogIn et le rôle.
   * @param {boolean} isloggedInNew 
   * @param {boolean} hasRoleNew 
   */
  function handleLogAndRole(isloggedInNew, hasRoleNew) {
    setIsLoggedInAndHasRole(
      () => {
        return { isLoggedIn: isloggedInNew, hasRole: hasRoleNew }
      })
  }
}


export default App;
