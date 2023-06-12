import React, { useState } from "react";
import { ReactComponent as CloseSymbol } from "./../../images/symboles/close.svg";

/**
 * Permet de modifier les détails du compte par l'utilisateur.
 * @param {*} props
 * @param {string} props.nom nom de l'utilisateur
 * @param {string} props.prenom prenom de l'utilisateur
 * @param {string} props.telephone telephone de l'utilisateur
 * @param {() => void} props.setModalShow Permet de changer l'état du booléen qui permet d'afficher la fenêtre modale.
 * @param {() => void} props.modifUtilisateur Permet de modifier les données de l'utilisateur dans la BD.
 * @returns 
 */
function ModalModifUtilisateur(props) {

  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [telephone, setTelephone] = useState();
  const [motDePasse, setMotDePasse] = useState();

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Modifier les informations de {props.prenom + " " + props.nom}</h3>
              <CloseSymbol className='w-6' onClick={() => props.setShowModal(false)} />
            </div>
            <form onSubmit={(e) => modifUtilisateur(e)}>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div className='flex flex-col'>
                  <label className="pt-2">Prénom</label>
                  <input className="border rounded-2xl p-2" type="text" name="noRegistre" onChange={(e) => { setPrenom(e.target.value) }} placeholder={props.prenom} />
                  <label className="pt-2">Nom</label>
                  <input className="border rounded-2xl p-2" type="text" name="nom" onChange={(e) => { setNom(e.target.value) }} placeholder={props.nom} />
                  <label className="pt-2">Telephone</label>
                  <input className="border rounded-2xl p-2" type="tel" name="telephone" onChange={(e) => { setTelephone(e.target.value) }} placeholder={props.telephone} pattern="^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$" />
                  <label className="pt-2">Mot de passe</label>
                  <input className="border rounded-2xl p-2" type="password" name="motDePasse" onChange={(e) => { setMotDePasse(e.target.value) }} placeholder="*********" />
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <input
                  className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-2xl mr-4" type="submit"
                  value="Enregistrer" />
                <button
                  className="bg-white border border-slate-500 hover:bg-gray-200 text-slate-500 font-bold py-2 px-4 rounded-2xl" type="button"
                  onClick={() => props.setShowModal(false)}
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
   * Modifie les données de l'utilisateur en faisant appel au props "modifUtilisateur()".
   * @param {*} e 
   */
  function modifUtilisateur(e) {
    e.preventDefault();
    props.modifUtilisateur(nom, prenom, telephone, motDePasse);
  }
}

export default ModalModifUtilisateur;