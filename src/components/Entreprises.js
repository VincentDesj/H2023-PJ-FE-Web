import { React, useState, useEffect } from "react";
import Axios from 'axios';
import ModalNewEntreprise from "./modals/ModalNewEntreprise";
import ModalModifEntreprise from "./modals/ModalModifEntreprise";
import { ReactComponent as PlusSymbol } from "./../images/symboles/plus.svg";
import { ReactComponent as EditSymbol } from "./../images/symboles/edit.svg";
import { ReactComponent as CloseSymbol } from "./../images/symboles/close.svg";


function Entreprises() {

    const [showModalNewEntreprise, setShowModalNewEntreprise] = useState(false);

    const [listeEntrepriseUser, setListeEntrepriseUser] = useState([]);

    const [indexModifActuel, setIndexModifActuel] = useState(null);

    useEffect(() => {
        getListeEntreprise();
    }, []);

    return (
        <>
            <div className='flex flex-row justify-start items-end'>
                <div className='text-left text-4xl font-bold my-4 mt-8'>{listeEntrepriseUser.length > 1 ? "Vos Entreprises" : "Votre Entreprise"}</div>
                <div className='bg-slate-500 hover:bg-slate-700 text-white rounded-full my-4 ml-10 p-1'><PlusSymbol className='w-6 fill-white' onClick={() => setShowModalNewEntreprise(true)} /></div>
            </div>

            {showModalNewEntreprise ? <ModalNewEntreprise setShowModalNewEntreprise={() => setShowModalNewEntreprise()} addNewEntreprise={(nom, noRegistre, adresse, telephone, courriel) => addNewEntreprise(nom, noRegistre, adresse, telephone, courriel)} /> : null}
            {indexModifActuel !== null ? <ModalModifEntreprise entrepriseModif={listeEntrepriseUser[indexModifActuel]} setIndexModifActuel={() => setIndexModifActuel(null)} modifEntreprise={(nom, noRegistre, adresse, telephone, courriel, noRegistreActuel) => modifEntreprise(nom, noRegistre, adresse, telephone, courriel, noRegistreActuel)} /> : null}

            {listeEntrepriseUser.length === 0 ?
                <div className='text-slate-500 text-xl my-4'>Vous n'avez pas d'entreprises inscrite à votre nom.</div>
                :
                listeEntrepriseUser.map((entreprise, index) => (
                    <div className='m-1 white-bx p-4' key={index}>
                        <div className='flex flex-row justify-between items-end'>
                            <div className='text-left text-2xl font-bold mt-4 ml-4'>{entreprise.nom}</div>
                            <div className="flex flex-row">
                                <EditSymbol className='w-6 mx-2 fill-slate-500 hover:fill-slate-700' onClick={() => setIndexModifActuel(index)} />
                                <CloseSymbol className='w-6  mx-2 fill-slate-500 hover:fill-slate-700' onClick={() => deleteEntreprise(entreprise.noRegistre)} />
                            </div>
                        </div>
                        <div className='text-left mt-4 ml-4'>Numéro de Registre : {entreprise.noRegistre}</div>
                        <div className='text-left mt-1 ml-4'>{entreprise.adresse}</div>
                        <div className='text-left mt-1 ml-4'>{telFormating(entreprise.telephone)}</div>
                        <div className='text-left mt-1 ml-4'>{entreprise.courriel}</div>
                    </div>
                ))
            }
        </>
    );

    /**
     * Formatte le numéro de téléphone afin d'avoir le format suivant "(***) ***-****".
     * @param {string} telephone 
     * @returns 
     */
    function telFormating(telephone) {
        return telephone.replace(/\D+/g, '')
            .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }

    /**
     * Récupère la liste des entreprise que l'utilisateur possède.
     */
    function getListeEntreprise() {
        Axios.get(process.env.REACT_APP_DOMAIN + "/profilCompagnie", {
        }).then((response) => {
            if (response.data.Compagnie) {
                const newlistEntreprises = [];

                response.data.Compagnie.map((compagnie) => {
                    newlistEntreprises.push({
                        nom: compagnie.nom_compagnie,
                        adresse: compagnie.adresse_compagnie,
                        courriel: compagnie.courriel_compagnie,
                        noRegistre: compagnie.noRegistre_compagnie,
                        telephone: compagnie.telephone_compagnie
                    });
                    return null;
                });

                setListeEntrepriseUser(newlistEntreprises);
            }
        });
    };

    /**
     * Ajoute une nouvelle entreprise à l'utilisateur.
     * @param {string} nom nom de l'entreprise
     * @param {number} noRegistre numéro de Registre de l'entreprise
     * @param {string} adresse adresse de l'entreprise
     * @param {string} telephone téléphone de l'entreprise
     * @param {string} courriel courriel de l'entreprise
     */
    function addNewEntreprise(nom, noRegistre, adresse, telephone, courriel) {
        Axios.post(process.env.REACT_APP_DOMAIN + "/profilCompagnie", {
            nom: nom,
            noRegistre: noRegistre,
            adresse: adresse,
            telephone: telephone,
            courriel: courriel
        }).then((response) => {
            if (response.data.AjoutCompagnie) {
                getListeEntreprise();
                setShowModalNewEntreprise(false);
            }
        });
    }

    /**
     * Modifie une entreprise déjà inscrit au nom de l'utilisateur.
     * @param {string} nom nom de l'entreprise
     * @param {number} noRegistre nouveau numéro de Registre de l'entreprise
     * @param {string} adresse adresse de l'entreprise
     * @param {string} telephone téléphone de l'entreprise
     * @param {string} courriel courriel de l'entreprise
     * @param {number} noRegistreActuel ancien numéro de Registre de l'entreprise
     */
    function modifEntreprise(nom, noRegistre, adresse, telephone, courriel, noRegistreActuel) {
        Axios.put(process.env.REACT_APP_DOMAIN + "/profilCompagnie", {
            nom: nom,
            noRegistre: noRegistre,
            adresse: adresse,
            telephone: telephone,
            courriel: courriel,
            noRegistreActuel: noRegistreActuel
        }).then((response) => {
            if (response.data.ModifCompagnie) {
                getListeEntreprise();
            }
        });
        setIndexModifActuel(null);
    }

    /**
     * Supprime la compagnie de la BD.
     * @param {number} noRegistre 
     */
    function deleteEntreprise(noRegistre) {
        console.log(Number(noRegistre));
        Axios.delete(process.env.REACT_APP_DOMAIN + "/profilCompagnie", {
            data: {
                noRegistre: Number(noRegistre)
            }
        }).then((response) => {
            if (response.data.Compagnie) {
                getListeEntreprise();
            }
        });
    }

}
export default Entreprises;