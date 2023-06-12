import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import img_profil from "./images/img_profil.png";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * Représente le menu dans l'application.
 * @param {object} props
 * @param {boolean} props.isLoggedIn variable représentant si un utilisateur est inscrit ou non
 * @param {() => void} props.handleLogAndRole callback sur la fonction de state handleLogAndRole.
 * @returns 
 */
function Menu(props) {

    const navigate = useNavigate();

    const goToInscription = () => { navigate("/"); };
    const goToProfil = () => { navigate("/profil"); };

    return (
        <div className="w-full">
            <div className="flex flex-row bg-slate-500 p-2">
                {!props.isLoggedIn ? <NavLink className='navLink' to='/' end style={({ isActive }) => ({ color: isActive ? 'white' : 'darkgrey' })}>Accueil</NavLink> : null}
                {props.isLoggedIn ? <NavLink className='navLink' to='/videos' end style={({ isActive }) => ({ color: isActive ? 'white' : 'darkgrey' })}>Vidéos</NavLink> : null}
                <NavLink className='navLink' to='/forfaits' end style={({ isActive }) => ({ color: isActive ? 'white' : 'darkgrey' })}>Forfaits</NavLink>
                <div className="flex justify-end items-center w-full flex-row">
                    {props.isLoggedIn ?
                        <div className="navLink text-white cursor-pointer" onClick={() => Logout()}>Déconnecter</div>
                        : null}
                    <img className="w-10 h-10 mx-6 rounded-full" onClick={() => goToProfil()} src=
                        //{user != null ? getImageProfil() : "img_profil_default.png"}
                        {img_profil} alt="Profil" />
                </div>

            </div>
        </div>
    );

    /**
     * Permet à l'utilisateur de terminer sa session avec le back-end 
     * et par la suite changer l'état de isLoggedIn sur le front-end.
     */
    function Logout() {
        Axios.get(process.env.BASE_URL + "/deconnection", {
        }).then((response) => {
            props.handleLogAndRole(false, null);
            goToInscription();
        })
    }
}

export default Menu;