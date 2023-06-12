import React, { useState } from "react";
import { ReactComponent as CloseSymbol } from "./../../images/symboles/close.svg";

/**
 * Permet pour un utilisateur de modifier une entreprise déjà lié a son profil.
 * @param {*} props
 * @param {number} props.entrepriseModif L'id de la compagnie actuellement modifié.
 * @param {() => void} props.setIndexModifActuel Permet de quitter le modal.
 * @param {() => void} props.modifEntreprise Permet de modifier la compagnie en BD.
 * @returns 
 */
function ModalModifEntreprise(props) {

  const [nom, setNom] = useState('');
  const [noRegistre, setNoRegistre] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [courriel, setCourriel] = useState('');

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Modifier {props.entrepriseModif.nom}</h3>

              <CloseSymbol className='w-6' onClick={() => props.setIndexModifActuel(null)} />

            </div>
            <form onSubmit={(e) => modifEntreprise(e)}>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div className='flex flex-col'>
                  <label className="pt-2">Nom</label>
                  <input className="border rounded-2xl p-2" type="text" name="nom" onChange={(e) => { setNom(e.target.value) }} placeholder={props.entrepriseModif.nom} />
                  <label className="pt-2">noRegistre</label>
                  <input className="border rounded-2xl p-2" type="number" name="noRegistre" onChange={(e) => { setNoRegistre(e.target.value) }} placeholder={props.entrepriseModif.noRegistre} />
                  <label className="pt-2">Adresse</label>
                  <input className="border rounded-2xl p-2" type="text" name="adresse" onChange={(e) => { setAdresse(e.target.value) }} placeholder={props.entrepriseModif.adresse} />
                  <label className="pt-2">Telephone</label>
                  <input className="border rounded-2xl p-2" type="tel" name="telephone" onChange={(e) => { setTelephone(e.target.value) }} placeholder={props.entrepriseModif.telephone} pattern="^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$" />
                  <label className="pt-2">Courriel</label>
                  <input className="border rounded-2xl p-2" type="email" name="nom" onChange={(e) => { setCourriel(e.target.value) }} placeholder={props.entrepriseModif.courriel} />
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <input
                  className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-2xl mr-4" type="submit"
                  value="Enregistrer" />
                <button
                  className="bg-white border border-slate-500 hover:bg-gray-200 text-slate-500 font-bold py-2 px-4 rounded-2xl" type="button"
                  onClick={() => props.setIndexModifActuel(null)}
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
   * Modifie la compagnie en faisant appel au props "modifEntreprise()".
   * @param {*} e 
   */
  function modifEntreprise(e) {
    e.preventDefault();
    props.modifEntreprise(nom, noRegistre, adresse, telephone, courriel, props.entrepriseModif.noRegistre);
  }
}

export default ModalModifEntreprise;