import React, { useState, useEffect } from "react";
import { ReactComponent as CloseSymbol } from "./../../../images/symboles/close.svg";
import Axios from 'axios';

/**
 * Fenêtre modale affiché pour soit Ajouter ou Modifier un vidéo.
 * @param {*} props 
 * @param {() => void} props.setModalShow Permet de changer l'état du booléen qui permet d'afficher la fenêtre modale.
 * @param {() => void} props.addVideoDone Permet de compléter l'ajout d'un vidéo dans la BD.
 * @param {() => void} props.modifVideoDone Permet de compléter la modification d'un vidéo dans la BD.
 * @returns 
 */
function AdminModalVideo(props) {

  const [titre, setTitre] = useState(props.videoModifActuel ? props.videoModifActuel.titre : '');
  const [description, setDescription] = useState(props.videoModifActuel ? props.videoModifActuel.description : '');
  const [forfait, setForfait] = useState(props.videoModifActuel ? props.videoModifActuel.forfait : '');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSelectImage = (e) => setImage(e.target.files[0]);
  const handleSelectVideo = (e) => setVideo(e.target.files[0]);

  const [listeForfait, setListeForfait] = useState([]);

  useEffect(() => {
    getListeForfait();
  }, []);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{props.videoModifActuel ? "Modifier la vidéo" : "Ajouter une vidéo"}</h3>

              <CloseSymbol className='w-6' onClick={() => props.setModalShow(props.videoModifActuel ? null : false)} />

            </div>
            <form onSubmit={props.videoModifActuel ? (e) => modifVideo(e) : (e) => addVideo(e)}>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div className='flex flex-col'>
                  <label className="pt-2">Titre</label>
                  <input className="border rounded-2xl p-2" type="text" name="titre" onChange={(e) => { setTitre(e.target.value) }} placeholder={props.videoModifActuel ? props.videoModifActuel.titre : 'Titre'} value={titre} required />
                  <label className="pt-2">Description</label>
                  <textarea className="border rounded-2xl p-2" type="text" name="description" onChange={(e) => { setDescription(e.target.value) }} placeholder={props.videoModifActuel ? props.videoModifActuel.description : 'Description'} value={description} required />

                  <label>Vidéo sélectionné</label>
                  {props.videoModifActuel ?
                    <input type="file" accept="video/*" id="video" onChange={handleSelectVideo} multiple={false} /> :
                    <input type="file" accept="video/*" id="video" onChange={handleSelectVideo} multiple={false} required />
                  }

                  <label>Image sélectionnée</label>
                  {props.videoModifActuel ?
                    <input type="file" accept="image/*" id="image" onChange={handleSelectImage} multiple={false} /> :
                    <input type="file" accept="image/*" id="image" onChange={handleSelectImage} multiple={false} required />
                  }

                  <label className="pt-2">Associé au forfait</label>
                  <select name="forfait" id="idForfait" onChange={(e) => { setForfait(e.target.value) }}>
                    {listeForfait.map((forfait, index) => (
                      ((props.videoModifActuel && props.videoModifActuel.idForfait === forfait.id) || index === 0) ?
                        <option selected value={forfait.id}>{forfait.nom}</option> :
                        <option value={forfait.id}>{forfait.nom}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <input
                  className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-2xl mr-4" type="submit"
                  value={props.videoModifActuel ? "Modifier" : "Enregistrer"} />
                <button
                  className="bg-white border border-slate-500 hover:bg-gray-200 text-slate-500 font-bold py-2 px-4 rounded-2xl" type="button"
                  onClick={() => props.setModalShow(props.videoModifActuel ? null : false)}
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
   * Récupère la liste complète des forfaits dans la BD.
   */
  function getListeForfait() {
    Axios.get(process.env.REACT_APP_BASE_URL + "/AdminForfait", {
    }).then((response) => {
      if (response.data.Forfaits) {
        const newlistForfaits = [];
        response.data.Forfaits.map((forfait) => {
          newlistForfaits.push({
            id: forfait.id_forfait,
            nom: forfait.nom_forfait
          });
          return null;
        });
        setListeForfait(newlistForfaits);
      }
    });
  }

  /**
   * Ajoute un vidéo et tout ses attributs dans la BD.
   * @param {*} e 
   */
  function addVideo(e) {
    e.preventDefault();

    let data = new FormData();
    data.append("video", video);
    data.append("image", image);
    data.append("titre", titre);
    data.append("description", description);
    data.append("idForfait", forfait);

    Axios.post(process.env.REACT_APP_BASE_URL + "/AdminVideo", data
    ).then((response) => {
      if (response.data.Video) {
        props.addVideoDone();
      }
    });
  }

  /**
   * Modifie un vidéo et tout ses attributs dans la BD.
   * @param {*} e 
   */
  function modifVideo(e) {
    e.preventDefault();

    let data = new FormData();
    data.append("video", video);
    data.append("image", image);
    data.append("idVideo", props.videoModifActuel.id)
    data.append("titre", titre);
    data.append("description", description);
    data.append("oldImageUrl", props.videoModifActuel.imageUrl)
    data.append("oldVideoUrl", props.videoModifActuel.videoUrl)
    data.append("idForfait", forfait);

    Axios.put(process.env.REACT_APP_BASE_URL + "/AdminVideo", data
    ).then((response) => {
      if (response.data.Video) {
        props.modifVideoDone();
      }
    });
  }
}

export default AdminModalVideo;