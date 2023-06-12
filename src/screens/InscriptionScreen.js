import React from 'react';
import { useState } from 'react';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * Représente la page d'Inscription, permet la création de compte.
 * @param {object} props 
 * @param {() => void} props.setIsLoggedIn callback sur la fonction de state setIsLoggedIn, pour le bool isLoggedIn.
 * @returns 
 */
function InscriptionScreen(props) {

    const navigate = useNavigate();

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [courriel, setCourriel] = useState("");
    const [password, setPassword] = useState("");

    const goToConnexion = () => {
        console.log("GoTo")
        navigate("/");
    }

    return (
        <div className='w-1/3'>
            <div className="flex flex-col bg-white border rounded-2xl mt-16">­­
                <form className='flex flex-col pb-8 m-10' onSubmit={(e) => { inscription(e) }}>
                    <div className='text-center text-4xl mb-8'>Nouvel utilisateur</div>
                    <label className='mb-2'>Prénom</label>
                    <input className="border rounded-2xl p-2 mb-4" type="text" name="prenom" onChange={(e) => { setPrenom(e.target.value) }} placeholder='Prénom' required />
                    <label className='mb-2'>Nom</label>
                    <input className="border rounded-2xl p-2 mb-4" type="text" name="nom" onChange={(e) => { setNom(e.target.value) }} placeholder='Nom' required />
                    <label className='mb-2'>Courriel</label>
                    <input className="border rounded-2xl p-2 mb-4" type="email" name="courriel" onChange={(e) => { setCourriel(e.target.value) }} placeholder='Courriel' required />
                    <label className='mb-2'>Mot de passe</label>
                    <input className="border rounded-2xl p-2 mb-4" type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Mot de passe' required minLength="6" />

                    <input className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-2xl mt-7' type='submit' value="S'inscrire" />
                </form>

            </div>
        </div>

    );

    /**
     * Permet d'envoyer les informations inscrite dans la page au back-end pour créer un nouvel utilisateur.
     * Si l'inscription réussi, la fonction login est lancé.
     */
    function inscription(e) {
        e.preventDefault();
        Axios.post(process.env.REACT_APP_DOMAIN + "/homeInscription", {
            nom: nom,
            prenom: prenom,
            courriel: courriel,
            motDePasse: password,
        }).then((response) => {
            if (response.data.Inscription) {
                console.log("Dans inscription")
                goToConnexion();
            }
        });
    };

}



export default InscriptionScreen;