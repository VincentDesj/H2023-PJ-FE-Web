import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import img_profil from "./../images/img_profil.png";
import { ReactComponent as EditSymbol } from "./../images/symboles/edit.svg";
import ModalModifUtilisateur from "./modals/ModalModifUtilisateur";

/**
 * Affiche la page de profil de l'utilisateur avec ses forfaits, ses entreprises et ses informations de compte.
 * Cette page n'est accesible que si il n'a pas de session active.
 * @returns 
 */
function Utilisateur() {

    const [showModalModifUtilisateur, setShowModalModifUtilisateur] = useState(false);

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [courriel, setCourriel] = useState("");
    const [telephone, setTelephone] = useState("(999) 999-9999");

    useEffect(() => {
        getUtilisateur();
    }, []);

    return (
        <div className='flex flex-col items-end w-3/12 pr-8'>
            <img className="w-2/3 aspect-square rounded-full mt-4" src={img_profil} alt="Profil" />
            <div className='text-right text-4xl font-bold mt-4'>{prenom + " " + nom}</div>
            <div className='text-right mt-4'>{courriel}</div>
            <div className='text-right mt-1'>{telephone}</div>
            <EditSymbol className='w-6 fill-slate-500 hover:fill-slate-700' onClick={() => setShowModalModifUtilisateur(true)} />
            {showModalModifUtilisateur ?
                < ModalModifUtilisateur nom={nom} prenom={prenom} telephone={telephone}
                    setShowModal={() => setShowModalModifUtilisateur(false)}
                    modifUtilisateur={(nom, prenom, telephone, motDePasse) => modifUtilisateur(nom, prenom, telephone, motDePasse)} />
                : null}
        </div>
    );

    /**
     * Récupère le profil de l'utilisateur qui est connecté.
     */
    function getUtilisateur() {
        Axios.get("https://pc-et-associe-node.herokuapp.com" + "/profilUtilisateur", {
        }).then((response) => {
            if (response.data.Utilisateur) {
                setPrenom(response.data.Utilisateur.prenom_utilisateur);
                setNom(response.data.Utilisateur.nom_utilisateur);
                setCourriel(response.data.Utilisateur.courriel_utilisateur);
                console.log(response.data.Utilisateur.telephone_utilisateur)
                if (response.data.Utilisateur.telephone_utilisateur) {
                    let telFormat = response.data.Utilisateur.telephone_utilisateur.replace(/\D+/g, '')
                        .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                    setTelephone(telFormat)
                };
            }
        });
    }

    /**
     * Permet à l'utilisateur de modifier ses informations.
     * @param {*} nom nom de l'utilisateur
     * @param {*} prenom prenom de l'utilisateur
     * @param {*} telephone telephone de l'utilisateur
     * @param {*} motDePasse mot de passe de l'utilisateur
     */
    function modifUtilisateur(nom, prenom, telephone, motDePasse) {
        Axios.put("https://pc-et-associe-node.herokuapp.com" + "/profil", {
            nom: nom === undefined ? "" : nom,
            prenom: prenom === undefined ? "" : prenom,
            motDePasse: motDePasse === undefined ? "" : motDePasse,
            telephone: telephone === undefined ? "" : telephone
        }).then((response) => {
            if (response.data.Modification) {
                getUtilisateur();
            }
        });
        setShowModalModifUtilisateur(false);
    }
}

export default Utilisateur;