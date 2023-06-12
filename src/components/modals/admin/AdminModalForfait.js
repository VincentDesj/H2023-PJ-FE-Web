import React, { useState } from "react";
import { ReactComponent as CloseSymbol } from "./../../../images/symboles/close.svg";

/**
 * Fenêtre modale affiché pour soit Ajouter ou Modifier un forfait.
 * @param {*} props 
 * @param {() => void} props.setModalShow Permet de changer l'état du booléen qui permet d'afficher la fenêtre modale.
 * @param {() => void} props.addForfait Permet d'ajouter un forfait dans la BD.
 * @param {() => void} props.modifForfait Permet de modifier un forfait dans la BD.
 * @returns 
 */
function AdminModalForfait(props) {

  const [nom, setNom] = useState(props.forfaitModifActuel ? props.forfaitModifActuel.nom : '');
  const [type, setType] = useState(props.forfaitModifActuel ? props.forfaitModifActuel.type : '');
  const [prix, setPrix] = useState(props.forfaitModifActuel ? props.forfaitModifActuel.prix : '');
  const [description, setDescription] = useState(props.forfaitModifActuel ? props.forfaitModifActuel.description : '');

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{props.forfaitModifActuel ? "Modifier le forfait" : "Ajouter un forfait"}</h3>

              <CloseSymbol className='w-6' onClick={() => props.setModalShow(props.forfaitModifActuel ? null : false)} />

            </div>
            <form onSubmit={props.forfaitModifActuel ? (e) => modifForfait(e) : (e) => addForfait(e)}>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div className='flex flex-col'>
                  <label className="pt-2">Nom</label>
                  <input className="border rounded-2xl p-2" type="text" name="nom" onChange={(e) => { setNom(e.target.value) }} placeholder={props.forfaitModifActuel ? props.forfaitModifActuel.nom : 'Nom'} value={nom} required />
                  <label className="pt-2">Type</label>
                  <input className="border rounded-2xl p-2" type="text" name="type" onChange={(e) => { setType(e.target.value) }} placeholder={props.forfaitModifActuel ? props.forfaitModifActuel.type : 'Type'} value={type} required />
                  <label className="pt-2">Prix</label>
                  <input className="border rounded-2xl p-2" type="number" name="prix" onChange={(e) => { setPrix(e.target.value) }} placeholder={props.forfaitModifActuel ? props.forfaitModifActuel.prix : 'Prix'} value={prix} required />
                  <label className="pt-2">Description</label>
                  <textarea className="border rounded-2xl p-2" type="text" name="description" onChange={(e) => { setDescription(e.target.value) }} placeholder={props.forfaitModifActuel ? props.forfaitModifActuel.description : 'Description'} value={description} required />
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <input
                  className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-2xl mr-4" type="submit"
                  value={props.forfaitModifActuel ? "Modifier" : "Enregistrer"} />
                <button
                  className="bg-white border border-slate-500 hover:bg-gray-200 text-slate-500 font-bold py-2 px-4 rounded-2xl" type="button"
                  onClick={() => props.setModalShow(props.forfaitModifActuel ? null : false)}
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
   * Appele dans les props "addForfait" pour ajouter un forfait.
   * @param {*} e 
   */
  function addForfait(e) {
    e.preventDefault();
    props.addForfait(nom, type, prix, description);
  }

  /**
   * Appele dans les props "forfaitModifActuel" pour modifier le forfait actuellement sélectionné.
   * @param {*} e 
   */
  function modifForfait(e) {
    e.preventDefault();
    props.modifForfait(props.forfaitModifActuel.id, nom, type, prix, description);
  }
}

export default AdminModalForfait;