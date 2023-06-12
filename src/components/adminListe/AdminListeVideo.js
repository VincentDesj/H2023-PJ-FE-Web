import { React, useState } from "react";
import { ReactComponent as EditSymbol } from "./../../images/symboles/edit.svg";
import { ReactComponent as CloseSymbol } from "./../../images/symboles/close.svg";
import AdminModalVideo from "../modals/admin/AdminModalVideo";
import Axios from 'axios';

/**
 * Affiche la liste des vidéos sur la DB.
 * Cet affichage permet de faire des ajout/modifications/suppression de vidéo.
 * @param {*} props
 * @param {[]} props.listShown liste des vidéos inscrit sur la DB.
 * @param {() => void} props.updateListeVideo Permet de relancer "getListeAdminVideo()" pour remettre à jour la liste.
 * @returns 
 */
function AdminListeVideo(props) {

    const [isAddVideo, setIsAddVideo] = useState(false);
    const [videoModifActuel, setVideoModifActuel] = useState(null);

    return (
        <>
            {isAddVideo ? <AdminModalVideo setModalShow={() => setIsAddVideo()} addVideoDone={() => addVideoDone()} /> : null
            }
            {videoModifActuel !== null ? <AdminModalVideo setModalShow={() => setVideoModifActuel(null)} modifVideoDone={() => modifVideoDone()} videoModifActuel={videoModifActuel} /> : null
            }
            <div className=' bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-2xl mt-7' onClick={() => setIsAddVideo(true)}>
                Ajouter une vidéo
            </div>
            <table className="white-bx w-full">
                <thead>
                    <tr className="my-8">
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Forfait</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listShown.map((video) => (
                        <tr>
                            <td>{video.titre}</td>
                            <td>{video.description}</td>
                            <td>{video.id_forfait}</td>
                            <td className="flex flex-row">
                                <EditSymbol className='w-6 mx-2 fill-slate-500 hover:fill-slate-700' onClick={() => setVideoModifActuel(video)} />
                                <CloseSymbol className='w-6  mx-1 fill-slate-500 hover:fill-slate-700' onClick={() => deleteVideo(video.id)} />
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </>
    );

    /**
     * Complète l'ajout d'un vidéo.
     */
    function addVideoDone() {
        props.updateListeVideo();
        setIsAddVideo(false);
    }

    /**
     * Complète la modification d'un vidéo.
     */
    function modifVideoDone() {
        props.updateListeVideo();
        setVideoModifActuel(null);
    }

    /**
     * Complète la suppression d'un vidéo.
     * @param {*} id id de la vidéo à supprimer
     */
    function deleteVideo(id) {
        Axios.delete(process.env.REACT_APP_BASE_URL + "/AdminVideo", {
            data: {
                idVideo: Number(id)
            }
        }).then((response) => {
            if (response.data.Video) {
                props.updateListeVideo();
            }
        });
    }

}
export default AdminListeVideo;