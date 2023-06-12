import { React, useState } from "react";
import { ReactComponent as EditSymbol } from "./../../images/symboles/edit.svg";
import { ReactComponent as CloseSymbol } from "./../../images/symboles/close.svg";
import AdminModalUtilisateur from "../modals/admin/AdminModalUtilisateur";
import Axios from 'axios';

/**
 * Affiche la liste des utilisateurs sur la DB.
 * Cet affichage permet de faire des ajout/modifications/suppression d'utilisateurs.
 * @param {*} props
 * @param {[]} props.listShown liste des Utilisateurs inscrit sur la DB.
 * @param {() => void} props.updateListeUtilisateur Permet de relancer "getListeAdminUtilisateur()" pour remettre à jour la liste.
 * @returns 
 */
function AdminListeUtilisateur(props) {

    const [isAddUtilisateur, setIsAddUtilisateur] = useState(false);
    const [utilisateurModifActuel, setUtilisateurModifActuel] = useState(null);

    return (
        <>
            {isAddUtilisateur ? <AdminModalUtilisateur setModalShow={() => setIsAddUtilisateur()} addUtilisateur={(nom, prenom, motDePasse, courriel, telephone, role) => addUtilisateur(nom, prenom, motDePasse, courriel, telephone, role)} /> : null
            }
            {utilisateurModifActuel !== null ? <AdminModalUtilisateur setModalShow={() => setUtilisateurModifActuel(null)} modifUtilisateur={(id, nom, prenom, motDePasse, courriel, telephone, role) => modifUtilisateur(id, nom, prenom, motDePasse, courriel, telephone, role)} utilisateurModifActuel={utilisateurModifActuel} /> : null
            }

            <div className=' bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-2xl mt-7' onClick={() => setIsAddUtilisateur(true)}>
                Ajouter utilisateur
            </div>
            <table className="white-bx w-full">
                <thead>
                    <tr className="my-8">
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Courriel</th>
                        <th>Téléphone</th>
                        <th>Rôle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listShown.map((utilisateur) => (
                        <tr>
                            <td>{utilisateur.nom}</td>
                            <td>{utilisateur.prenom}</td>
                            <td>{utilisateur.courriel}</td>
                            <td>{utilisateur.telephone ? utilisateur.telephone : "-"}</td>
                            <td>{utilisateur.typeRole ? utilisateur.typeRole : "Client"}</td>
                            <td className="flex flex-row">
                                <EditSymbol className='w-6 mx-2 fill-slate-500 hover:fill-slate-700' onClick={() => setUtilisateurModifActuel(utilisateur)} />
                                <CloseSymbol className='w-6  mx-1 fill-slate-500 hover:fill-slate-700' onClick={() => deleteUtilisateur(utilisateur.id)} />
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </>
    );

    /**
     * Ajouter un nouvel utilisateur
     * @param {number} nom nom de l'utilisateur
     * @param {string} prenom prénom de l'utilisateur
     * @param {string} motDePasse mot de passe de l'utilisateur
     * @param {string} courriel courriel de l'utilisateur
     * @param {string} telephone téléphone de l'utilisateur
     * @param {number} role rôle assigné à l'utilisateur
     */
    function addUtilisateur(nom, prenom, motDePasse, courriel, telephone, role) {
        Axios.post(process.env.REACT_APP_BASE_URL + "/Admin", {
            nom: nom,
            prenom: prenom,
            motDePasse: motDePasse,
            courriel: courriel,
            telephone: telephone,
            idRole: role
        }).then((response) => {
            if (response.data.Utilisateurs) {
                props.updateListeUtilisateur();
                setIsAddUtilisateur(false);
            }
        });
    }

    /**
     * Modifie un utilisateur déjà existant dans la BD.
     * @param {*} id id de l'utilisateur
     * @param {number} nom nom de l'utilisateur
     * @param {string} prenom prénom de l'utilisateur
     * @param {string} motDePasse mot de passe de l'utilisateur
     * @param {string} courriel courriel de l'utilisateur
     * @param {string} telephone téléphone de l'utilisateur
     * @param {number} role rôle assigné à l'utilisateur
     */
    function modifUtilisateur(id, nom, prenom, motDePasse, courriel, telephone, role) {
        Axios.put(process.env.REACT_APP_BASE_URL + "/Admin", {
            idUtilisateur: id,
            nom: nom,
            prenom: prenom,
            motDePasse: motDePasse,
            courriel: courriel,
            telephone: telephone,
            idRole: role
        }).then((response) => {
            if (response.data.Modification) {
                props.updateListeUtilisateur();
                setUtilisateurModifActuel(null);
            }
        });
    }

    /**
     * Supprime l'utilisateur selon le id en paramètre
     * @param {number} id id représentant l'utlisateur
     */
    function deleteUtilisateur(id) {
        Axios.delete(process.env.REACT_APP_BASE_URL + "/Admin", {
            data: {
                idUtilisateur: Number(id)
            }
        }).then((response) => {
            if (response.data.Suppression) {
                props.updateListeUtilisateur();
            }
        });
    }
}
export default AdminListeUtilisateur;