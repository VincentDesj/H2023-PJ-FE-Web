import { React, useState } from "react";
import { ReactComponent as EditSymbol } from "./../../images/symboles/edit.svg";
import { ReactComponent as CloseSymbol } from "./../../images/symboles/close.svg";
import AdminModalCompagnie from "./../modals/admin/AdminModalCompagnie";
import Axios from 'axios';

/**
 * Affiche la liste des compagnies des utilisateurs sur la DB.
 * Cet affichage permet de faire des ajout/modifications/suppression de compagnies.
 * @param {*} props
 * @param {[]} props.listShown liste des Compagnies inscrit sur la DB.
 * @param {() => void} props.updateListeCompagnie Permet de relancer "getListeAdminCompagnie()" pour remettre à jour la liste.
 * @returns 
 */
function AdminListeCompagnie(props) {

    const [isAddCompagnie, setIsAddCompagnie] = useState(false);
    const [compagnieModifActuel, setCompagnieModifActuel] = useState(null);

    return (
        <>
            {isAddCompagnie ? <AdminModalCompagnie setModalShow={() => setIsAddCompagnie()} addCompagnie={(nom, adresse, noRegistre, courriel, telephone, idUtilisateur) => addCompagnie(nom, adresse, noRegistre, courriel, telephone, idUtilisateur)} /> : null
            }
            {compagnieModifActuel !== null ? <AdminModalCompagnie setModalShow={() => setCompagnieModifActuel(null)} modifCompagnie={(id, nom, adresse, noRegistre, courriel, telephone, idUtilisateur) => modifCompagnie(id, nom, adresse, noRegistre, courriel, telephone, idUtilisateur)} compagnieModifActuel={compagnieModifActuel} /> : null
            }
            <div className=' bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-2xl mt-7' onClick={() => setIsAddCompagnie(true)}>
                Ajouter une compagnie
            </div>
            <table className="white-bx w-full">
                <thead>
                    <tr className="my-8">
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>No de Registre</th>
                        <th>Courriel</th>
                        <th>Téléphone</th>
                        <th>Utilisateur</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listShown.map((compagnie) => (
                        <tr>
                            <td>{compagnie.nom}</td>
                            <td>{compagnie.adresse}</td>
                            <td>{compagnie.noRegistre}</td>
                            <td>{compagnie.courriel}</td>
                            <td>{compagnie.telephone ? compagnie.telephone : "-"}</td>
                            <td>{compagnie.idUtilisateur}</td>
                            <td className="flex flex-row">
                                <EditSymbol className='w-6 mx-2 fill-slate-500 hover:fill-slate-700' onClick={() => setCompagnieModifActuel(compagnie)} />
                                <CloseSymbol className='w-6  mx-1 fill-slate-500 hover:fill-slate-700' onClick={() => deleteCompagnie(compagnie.id)} />
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </>
    );

    /**
     * Ajouter une nouvelle compagnie
     * @param {*} nom nom de la compagnie
     * @param {*} adresse adresse de la compagnie
     * @param {*} noRegistre Numéro de Registre de la compagnie
     * @param {*} courriel courriel de la compagnie
     * @param {*} telephone téléphone de la compagnie
     * @param {*} idUtilisateur Utilisateur lié à la compagnie
     */
    function addCompagnie(nom, adresse, noRegistre, courriel, telephone, idUtilisateur) {
        Axios.post(process.env.REACT_APP_BASE_URL + "/AdminCompagnie", {
            idUtilisateur: idUtilisateur,
            nom: nom,
            adresse: adresse,
            noRegistre: noRegistre,
            courriel: courriel,
            telephone: telephone
        }).then((response) => {
            if (response.data.AjoutCompagnie) {
                props.updateListeCompagnie();
                setIsAddCompagnie(false);
            }
        });
    }

    /**
     * Modifie une compagnie déjà existante dans la BD.
     * @param {*} id id de la compagnie
     * @param {*} nom nom de la compagnie
     * @param {*} adresse adresse de la compagnie
     * @param {*} noRegistre Numéro de Registre de la compagnie
     * @param {*} courriel courriel de la compagnie
     * @param {*} telephone téléphone de la compagnie
     * @param {*} idUtilisateur Utilisateur lié à la compagnie
     */
    function modifCompagnie(id, nom, adresse, noRegistre, courriel, telephone, idUtilisateur) {
        Axios.put(process.env.REACT_APP_BASE_URL + "/AdminCompagnie", {
            idCompagnie: id,
            nom: nom,
            adresse: adresse,
            noRegistre: noRegistre,
            courriel: courriel,
            telephone: telephone,
            idUtilisateur: idUtilisateur
        }).then((response) => {
            if (response.data.ModifCompagnie) {
                props.updateListeCompagnie();
                setCompagnieModifActuel(null);
            }
        });
    }

    /**
     * Supprime la compagnie selon le id en paramètre
     * @param {number} id id représentant la compagnie
     */
    function deleteCompagnie(id) {
        Axios.delete(process.env.REACT_APP_BASE_URL + "/AdminCompagnie", {
            data: {
                idCompagnie: Number(id)
            }
        }).then((response) => {
            if (response.data.Suppression) {
                props.updateListeCompagnie();
            }
        });
    }

}
export default AdminListeCompagnie;