import { React, useState} from "react";
import { ReactComponent as EditSymbol } from "./../../images/symboles/edit.svg";
import { ReactComponent as CloseSymbol } from "./../../images/symboles/close.svg";
import AdminModalForfait from "../modals/admin/AdminModalForfait";
import Axios from 'axios';

/**
 * Affiche la liste des forfaits sur la DB.
 * Cet affichage permet de faire des ajout/modifications/suppression de forfaits.
 * @param {*} props
 * @param {[]} props.listShown liste des Forfaits inscrit sur la DB.
 * @param {() => void} props.updateListeForfait Permet de relancer "getListeAdminForfait()" pour remettre à jour la liste.
 * @returns 
 */
function AdminListeForfait(props) {

    const [isAddForfait, setIsAddForfait] = useState(false);
    const [forfaitModifActuel, setForfaitModifActuel] = useState(null);

    return (
        <>
            {isAddForfait ? <AdminModalForfait setModalShow={() => setIsAddForfait()} addForfait={(nom, type, prix, description) => addForfait(nom, type, prix, description)} /> : null
            }
            {forfaitModifActuel !== null ? <AdminModalForfait setModalShow={() => setForfaitModifActuel(null)} modifForfait={(id, nom, type, prix, description) => modifForfait(id, nom, type, prix, description)} forfaitModifActuel={forfaitModifActuel} /> : null
            }
            <div className=' bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-2xl mt-7' onClick={() => setIsAddForfait(true)}>
                Ajouter un forfait
            </div>
            <table className="white-bx w-full">
                <thead>
                    <tr className="my-8">
                        <th>Nom</th>
                        <th>Type</th>
                        <th>Prix</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listShown.map((forfait) => (
                        <tr>
                            <td>{forfait.nom}</td>
                            <td>{forfait.type}</td>
                            <td>{forfait.prix}</td>
                            <td>{forfait.description}</td>
                            <td className="flex flex-row">
                                <EditSymbol className='w-6 mx-2 fill-slate-500 hover:fill-slate-700' onClick={() => setForfaitModifActuel(forfait)} />
                                <CloseSymbol className='w-6  mx-1 fill-slate-500 hover:fill-slate-700' onClick={() => deleteForfait(forfait.id)} />
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </>
    );

    /**
     * Ajouter un nouveau forfait
     * @param {*} nom nom du forfait
     * @param {*} type type de forfait
     * @param {*} prix prix du forfait
     * @param {*} description description du forfait
     */
    function addForfait(nom, type, prix, description) {
        Axios.post(process.env.REACT_APP_DOMAIN + "/AdminForfait", {
            nom: nom,
            type: type,
            prix: prix,
            description: description
        }).then((response) => {
            if (response.data.Forfait) {
                props.updateListeForfait();
                setIsAddForfait(false);
            }
        });
    }

    /**
     * Modifie un forfait déjà existant dans la BD.
     * @param {*} id id du forfait
     * @param {*} nom nom du forfait
     * @param {*} type type de forfait
     * @param {*} prix prix du forfait
     * @param {*} description description du forfait
     */
    function modifForfait(id, nom, type, prix, description) {
        Axios.put(process.env.REACT_APP_DOMAIN + "/AdminForfait", {
            idForfait: id,
            nom: nom,
            type: type,
            prix: prix,
            description: description
        }).then((response) => {
            if (response.data.Forfait) {
                props.updateListeForfait();
                setForfaitModifActuel(null);
            }
        });
    }

    /**
     * Supprime le forfait selon le id en paramètre
     * @param {number} id id représentant le forfait
     */
    function deleteForfait(id) {
        Axios.delete(process.env.REACT_APP_DOMAIN + "/AdminForfait", {
            data: {
                idForfait: Number(id)
            }
        }).then((response) => {
            if (response.data.Forfait) {
                props.updateListeForfait();
            }
        });
    }

}
export default AdminListeForfait;