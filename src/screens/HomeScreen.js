import React from 'react';
import { useState, useEffect } from 'react';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * Représente la page d'Accueil, plus précisement la connexion du compte au site.
 * @param {object} props 
 * @param {() => void} props.setIsLoggedIn callback sur la fonction de state setIsLoggedIn, pour le bool isLoggedIn.
 * @returns 
 */
function HomeScreen(props) {

    useEffect(() => {
        getCaptcha();
    }
        , []);

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msgErreur, setMessageErreur] = useState("");

    const [imgCaptcha, setImgCaptcha] = useState();
    const [captcha, setCaptcha] = useState();

    const goToProfil = () => { navigate("/profil"); }
    const goToInscription = () => { navigate("/inscription"); }

    console.log(imgCaptcha)

    return (
        <div className='w-1/3'>
            <div className="flex flex-col white-bx ">­­

                <form className='flex flex-col pb-8 m-10' onSubmit={(e) => { login(e) }}>
                    <div className='text-center text-4xl mb-8'>Bienvenue!</div>
                    <label>Courriel</label>
                    <input className="border rounded-2xl p-2" type="email" name="nom" onChange={(e) => { setUsername(e.target.value) }} placeholder='Courriel' required />
                    <label>Mot de passe</label>
                    <input className="border rounded-2xl p-2" type="password" name="motDePasse" onChange={(e) => { setPassword(e.target.value) }} placeholder='Mot de passe' required minLength="6" />

                    <button className='bg-white border border-slate-500 hover:bg-gray-200 text-slate-500 font-bold py-2 px-4 rounded-2xl mt-7' onClick={() => { getCaptcha() }}>Renouveler le Captcha</button>
                    <div className='py-2 px-4 mt-7' dangerouslySetInnerHTML={{ __html: imgCaptcha }}></div>
                    <input className="border rounded-2xl p-2" type="text" name="captcha" onChange={(e) => { setCaptcha(e.target.value) }} placeholder='Captcha' required />

                    <input className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-2xl mt-7' type='submit' value="Connexion" />
                    <button className='bg-white border border-slate-500 hover:bg-gray-200 text-slate-500 font-bold py-2 px-4 rounded-2xl mt-7' onClick={() => { goToInscription() }}>Inscription</button>
                </form>

                {msgErreur ?? <div className='text-red-500 font-extrabold text-center'>{msgErreur}</div>}
            </div>
        </div>
    );

    /**
     * La fonction login permet de tenter d'obtenir une session(connexion back-end) 
     * avec l'utilisateur et le mot de passe inscrit dans les champs respectifs.
     * Si c'est un succès, l'utilisateur est transféré avers sa page profil, 
     * sinon il est présenté un message d'erreur.
     */
    function login(e) {
        e.preventDefault();
        Axios.post(process.env.REACT_APP_BASE_URL + "/login", {
            courriel: username,
            motDePasse: password,
            captcha: captcha
        }).then((response) => {
            if (response.data.message) {
                setMessageErreur(response.data.message);
                getCaptcha();
            } else {
                props.handleLogAndRole(true, response.data.role);
                goToProfil();
            }
        });
    };

    /**
     * Retourne un CAPTCHA que l'utilisateur doit vérifier au moment de l'inscription.
     */
    function getCaptcha() {
        Axios.get("https://pc-et-associe-node.herokuapp.com" + "/captcha", {
        }).then((response) => {
            if (response.data) {
                setImgCaptcha(response.data);
            }
        });
    }
}



export default HomeScreen;