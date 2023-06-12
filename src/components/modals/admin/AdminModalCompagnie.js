import React, { useState, useEffect } from "react";
import { ReactComponent as CloseSymbol } from "./../../../images/symboles/close.svg";
import Axios from 'axios';

/**
 * Fenêtre modale affiché pour soit Ajouter ou Modifier une compagnie.
 * @param {*} props 
 * @param {() => void} props.setModalShow Permet de changer l'état du booléen qui permet d'afficher la fenêtre modale.
 * @param {() => void} props.addCompagnie Permet d'ajouter une compagnie dans la BD.
 * @param {() => void} props.modifCompagnie Permet de modifier une compagnie dans la BD.
 * @returns 
 */
function AdminModalCompagnie(props) {

  const [nom, setNom] = useState(props.compagnieModifActuel ? props.compagnieModifActuel.nom : '');
  const [adresse, setAdresse] = useState(props.compagnieModifActuel ? props.compagnieModifActuel.adresse : '');
  const [noRegistre, setNoRegistre] = useState(props.compagnieModifActuel ? props.compagnieModifActuel.noRegistre : '');
  const [courriel, setCourriel] = useState(props.compagnieModifActuel ? props.compagnieModifActuel.courriel : '');
  const [telephone, setTelephone] = useState(props.compagnieModifActuel ? props.compagnieModifActuel.telephone : '');
  const [idUtilisateur, setIdUtilisateur] = useState(1);

  const [listeUtilisateurs, setListeUtilisateurs] = useState([]);

  useEffect(() => {
    getListeUtilisateurs();
  }, []);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{props.compagnieModifActuel ? "Modifier la compagnie" : "Ajouter une compagnie"}</h3>

              <CloseSymbol className='w-6' onClick={() => props.setModalShow(props.compagnieModifActuel ? null : false)} />

            </div>
            <form onSubmit={props.compagnieModifActuel ? (e) => modifCompagnie(e) : (e) => addCompagnie(e)}>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div className='flex flex-col'>
                  <label className="pt-2">Nom</label>
                  <input className="border rounded-2xl p-2" type="text" name="nom" onChange={(e) => { setNom(e.target.value) }} placeholder={props.compagnieModifActuel ? props.compagnieModifActuel.nom : 'Nom'} value={nom} required />
                  <label className="pt-2">Adresse</label>
                  <input className="border rounded-2xl p-2" type="text" name="adresse" onChange={(e) => { setAdresse(e.target.value) }} placeholder={props.compagnieModifActuel ? props.compagnieModifActuel.adresse : 'Adresse'} value={adresse} required />
                  <label className="pt-2">Numéro de Registre</label>
                  <input className="border rounded-2xl p-2" type="number" name="noRegistre" onChange={(e) => { setNoRegistre(e.target.value) }} placeholder={props.compagnieModifActuel ? props.compagnieModifActuel.noRegistre : 'Numéro de Registre'} value={noRegistre} required />
                  <label className="pt-2">Courriel</label>
                  <input className="border rounded-2xl p-2" type="email" name="courriel" onChange={(e) => { setCourriel(e.target.value) }} placeholder={props.compagnieModifActuel ? props.compagnieModifActuel.courriel : 'Courriel'} value={courriel} required />
                  <label className="pt-2">Téléphone</label>
                  <input className="border rounded-2xl p-2" type="tel" name="telephone" onChange={(e) => { setTelephone(e.target.value) }} placeholder={props.compagnieModifActuel ? props.compagnieModifActuel.telephone : 'Numéro de téléphone'} value={telephone} required />
                  <label className="pt-2">Utilisateur</label>
                  <select name="utilisateur" id="idUtilisateur" onChange={(e) => { setIdUtilisateur(e.target.value) }}>
                    {listeUtilisateurs.map((utilisateur) => (
                      (props.compagnieModifActuel && props.compagnieModifActuel.idUtilisateur === utilisateur.id) ?
                        <option selected value={utilisateur.id}>{utilisateur.nom}</option> :
                        <option value={utilisateur.id}>{utilisateur.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <input
                  className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-2xl mr-4" type="submit"
                  value={props.compagnieModifActuel ? "Modifier" : "Enregistrer"} />
                <button
                  className="bg-white border border-slate-500 hover:bg-gray-200 text-slate-500 font-bold py-2 px-4 rounded-2xl" type="button"
                  onClick={() => props.setModalShow(props.compagnieModifActuel ? null : false)}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );

  /**
   * Récupère tout les utilisateurs sur la BD
   */
  function getListeUtilisateurs() {
    Axios.get("https://pc-et-associe-node.herokuapp.com" + "/Admin", {
    }).then((response) => {
      if (response.data.Utilisateurs) {
        const newlistRoles = [];
        response.data.Utilisateurs.map((utilisateur) => {
          newlistRoles.push({
            id: utilisateur.id_utilisateur,
            nom: utilisateur.prenom_utilisateur + ' ' + utilisateur.nom_utilisateur
          });
          return null;
        });
        setListeUtilisateurs(newlistRoles);
      }
    });
  }

  /**
 * Appele dans les props "addCompagnie" pour ajouter une compagnie.
 * @param {*} e 
 */
  function addCompagnie(e) {
    e.preventDefault();
    props.addCompagnie(nom, adresse, noRegistre, courriel, telephone, idUtilisateur);
  }

  /**
* Appele dans les props "compagnieModifActuel" pour modifier la compagnie actuellement sélectionné.
* @param {*} e 
*/
  function modifCompagnie(e) {
    e.preventDefault();
    props.modifCompagnie(props.compagnieModifActuel.id, nom, adresse, noRegistre, courriel, telephone, idUtilisateur);
  }
}

export default AdminModalCompagnie;