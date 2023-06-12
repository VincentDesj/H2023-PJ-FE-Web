import React from 'react';
import imgVideoDefault from './../../images/video_default.png';
import { useNavigate } from "react-router-dom";

/**
 * @param {*} props
 * @param {[]} props.listeVideoUtilisateur Liste de tout les vidéos en lien avec les forfaits que l'utilisateur possède.
 * @param {object} props.forfaitAffiche Représente le forfait sélectionné.
 * @returns 
 */
function ForfaitsAllVideos(props) {

    const navigate = useNavigate();
    const goToVideoPlayer = (nomVideo, description, videoUrl) => { navigate("/videoplayer", { state: { nom: nomVideo, description: description, videoUrl: videoUrl } }); };

    return (
        <div className='flex flex-col pl-4 w-6/12'>
            {
                props.forfaitAffiche === undefined ?
                    null :
                    <div>
                        <div className='text-left text-2xl py-4'>{props.forfaitAffiche.nomForfait}</div>
                        <div className='text-left py-4'>{props.forfaitAffiche.description}</div>
                        <div className='flex flex-row flex-wrap content-center'>
                            {
                                props.listeVideoUtilisateur.map((video) =>
                                    props.forfaitAffiche.id === video.idForfait ?
                                        <div className='flex flex-col content-center items-center w-1/3 p-4 hover:bg-gray-200 text-slate-500' onClick={() => goToVideoPlayer(video.nomVideo, video.description, video.videoUrl)}>
                                            <img className='aspect-square' src={video.imageUrl === "" ? imgVideoDefault : video.imageUrl} alt={video.nomVideo} width="125" height="100" />
                                            <div>{video.nomVideo}</div>
                                        </div> :
                                        null
                                )}
                        </div>
                    </div>
            }
        </div>
    );
}

export default ForfaitsAllVideos;