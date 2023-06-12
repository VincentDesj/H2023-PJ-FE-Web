import React, { useState, useEffect } from "react";
import { ReactComponent as CloseSymbol } from "./../../../images/symboles/close.svg";
import Axios from 'axios';

/**
 * Fenêtre modale affiché pour soit Ajouter ou Modifier un utilisateur.
 * @param {*} props 
 * @param {() => void} props.setModalShow Permet de changer l'état du booléen qui permet d'afficher la fenêtre modale.
 * @param {() => void} props.addUtilisateur Permet d'ajouter un utilisateur dans la BD.
 * @param {() => void} props.modifUtilisateur Permet de modifier un utilisateur dans la BD.
 * @returns 
 */
function AdminModalUtilisateur(props) {

  const [nom, setNom] = useState(props.utilisateurModifActuel ? props.utilisateurModifActuel.nom : '');
  const [prenom, setPrenom] = useState(props.utilisateurModifActuel ? props.utilisateurModifActuel.prenom : '');
  const [motDePasse, setMotDePasse] = useState("");
  const [courriel, setCourriel] = useState(props.utilisateurModifActuel ? props.utilisateurModifActuel.courriel : '');
  const [telephone, setTelephone] = useState(props.utilisateurModifActuel ? props.utilisateurModifActuel.telephone : '');
  const [typeRole, setTypeRole] = useState(null);

  const [listeRole, setListeRole] = useState([]);

  useEffect(() => {
    getListeRole();
  }, []);

  function handleUtilisateurRole(id) {
    id === "Client" ? setTypeRole(null) : setTypeRole(id) ;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{props.utilisateurModifActuel ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}</h3>

              <CloseSymbol className='w-6' onClick={() => props.setModalShow(props.utilisateurModifActuel ? null : false)} />

            </div>
            <form onSubmit={props.utilisateurModifActuel ? (e) => modifUtilisateur(e) : (e) => addUtilisateur(e)}>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div className='flex flex-col'>
                  <label className="pt-2">Nom</label>
                  <input className="border rounded-2xl p-2" type="text" name="nom" onChange={(e) => { setNom(e.target.value) }} placeholder={props.utilisateurModifActuel ? props.utilisateurModifActuel.nom : 'Nom'} value={nom} required />
                  <label className="pt-2">Prénom</label>
                  <input className="border rounded-2xl p-2" type="text" name="prenom" onChange={(e) => { setPrenom(e.target.value) }} placeholder={props.utilisateurModifActuel ? props.utilisateurModifActuel.prenom : 'Prénom'} value={prenom} required />
                  <label className="pt-2">Mot de passe</label>
                  {
                    motDePasse !== "" ?
                      <input className="border rounded-2xl p-2" type="password" name="motDePasse" onChange={(e) => { setMotDePasse(e.target.value) }} placeholder='Mot de passe' required minLength="6" value={motDePasse} /> :
                      <input className="border rounded-2xl p-2" type="password" name="motDePasse" onChange={(e) => { setMotDePasse(e.target.value) }} placeholder='Mot de passe' value={motDePasse} />
                  }
                  <label className="pt-2">Courriel</label>
                  <input className="border rounded-2xl p-2" type="email" name="nom" onChange={(e) => { setCourriel(e.target.value) }} placeholder={props.utilisateurModifActuel ? props.utilisateurModifActuel.courriel : 'Courriel'} value={courriel} required />
                  <label className="pt-2">Telephone</label>
                  <input className="border rounded-2xl p-2" type="tel" name="telephone" onChange={(e) => { setTelephone(e.target.value) }} placeholder={props.utilisateurModifActuel ? props.utilisateurModifActuel.telephone : 'Numéro de téléphone'} value={telephone} required />
                  <label className="pt-2">Rôle</label>
                  <select name="role" id="role" onChange={(e) => { handleUtilisateurRole(e.target.value) }}>
                    {listeRole.map((role) => (
                      (props.utilisateurModifActuel && props.utilisateurModifActuel.typeRole === role.type) ?
                        <option selected value={role.id}>{role.type}</option> :
                        <option value={role.id}>{role.type}</option>
                    ))}
                    <option value={null}>Client</option>
                  </select>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <input
                  className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-2xl mr-4" type="submit"
                  value={props.utilisateurModifActuel ? "Modifier" : "Enregistrer"} />
                <button
                  className="bg-white border border-slate-500 hover:bg-gray-200 text-slate-500 font-bold py-2 px-4 rounded-2xl" type="button"
                  onClick={() => props.setModalShow(props.utilisateurModifActuel ? null : false)}
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
   * Récupère tout les rôles disponible pourles utilisateurs
   */
  function getListeRole() {
    Axios.get(process.env.BASE_URL + "/AdminRole", {
    }).then((response) => {
      if (response.data.Role) {
        const newlistRoles = [];
        response.data.Role.map((role) => {
          newlistRoles.push({
            id: role.id_role,
            type: role.type_role
          });
          return null;
        });
        setListeRole(newlistRoles);
      }
    });
  }

  /**
   * Appele dans les props "addUtilisateur" pour ajouter un utilisateur.
   * @param {*} e 
   */
  function addUtilisateur(e) {
    e.preventDefault();
    props.addUtilisateur(nom, prenom, motDePasse, courriel, telephone, typeRole);
  }

    /**
   * Appele dans les props "utilisateurModifActuel" pour modifier l'utilisateur actuellement sélectionné.
   * @param {*} e 
   */
  function modifUtilisateur(e) {
    e.preventDefault();
    props.modifUtilisateur(props.utilisateurModifActuel.id, nom, prenom, motDePasse, courriel, telephone, typeRole);
  }
}

export default AdminModalUtilisateur;