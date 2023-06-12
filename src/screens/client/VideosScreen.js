import { React, useEffect, useState } from 'react';
import Axios from 'axios';
import ForfaitsSideMenu from '../../components/forfaits/ForfaitsSideMenu'
import ForfaitsAllVideos from '../../components/forfaits/ForfaitsAllVideos'

/**
 * Représente les vidéos que l'utilisateur à acheté dans ses forfaits.
 * C'est dans cette page qu'il peut naviguer à travers ses forfaits
 * et sélectionner les vidéos qu'il veut voir.
 * @returns 
 */
function VideosScreen() {
    const [listeForfaitUtilisateur, setListeForfaitUtilisateur] = useState([]);
    const [listeVideoUtilisateur, setListeVideoUtilisateur] = useState([]);

    const updateSelect = (idSelect) => {
        let newlistForfait = listeForfaitUtilisateur.slice();
        newlistForfait.map((forfait) =>
            forfait.select = false
        );
        newlistForfait.find(x => x.id === idSelect).select = true;
        setListeForfaitUtilisateur(newlistForfait);
    };

    useEffect(() => {
        getListeForfaitsUtilisateur();
        getListeVideosUtilisateur();
    }, []);

    return (
        <div className='flex flex-row justify-center w-full h-full mt-16'>
            <ForfaitsSideMenu listeForfaitUtilisateur={listeForfaitUtilisateur} forfaitAffiche={listeForfaitUtilisateur.find(x => x.select)} updateSelect={(id) => updateSelect(id)} />
            <ForfaitsAllVideos listeVideoUtilisateur={listeVideoUtilisateur} forfaitAffiche={listeForfaitUtilisateur.find(x => x.select)} />
        </div>
    );

    /**
     * Retourne la liste de tout les forfaits que l'utilisateur possède.
     */
    function getListeForfaitsUtilisateur() {
        Axios.get(process.env.REACT_APP_DOMAIN + "/profilForfait", {
        }).then((response) => {
            if (response.data.Forfait) {
                const newlistForfaits = [];

                response.data.Forfait.map((forfait, index) => {
                    newlistForfaits.push({
                        id: forfait.ID,
                        nomForfait: forfait.Nom,
                        description: forfait.Description,
                        select: index === 0 ? true : false
                    });
                    return null;
                });

                setListeForfaitUtilisateur(newlistForfaits);
            }
        });
    }

    /**
     * Retourne la liste de tout les vidéos liés aux forfaits que l'utilisateur possède.
     */
    function getListeVideosUtilisateur() {
        Axios.get(process.env.REACT_APP_DOMAIN + "/videos", {
        }).then((response) => {
            if (response.data.videos) {
                const newlistVideos = [];

                response.data.videos.map((video) => {
                    newlistVideos.push({
                        idVideo: video.Id,
                        nomVideo: video.Titre,
                        description: video.Description,
                        imageUrl: video.Image,
                        videoUrl: video.Video,
                        idForfait: video.Forfait
                    });

                    return null;
                });

                setListeVideoUtilisateur(newlistVideos);
            }
        });
    }
}

export default VideosScreen;