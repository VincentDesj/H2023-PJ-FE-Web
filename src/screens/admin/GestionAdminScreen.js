import { React, useState, useEffect } from "react";
import Axios from 'axios';
import AdminOnglet from '../../components/AdminOnglet';
import AdminListeCompagnie from '../../components/adminListe/AdminListeCompagnie';
import AdminListeForfait from '../../components/adminListe/AdminListeForfait';
import AdminListeUtilisateur from '../../components/adminListe/AdminListeUtilisateur';
import AdminListeVideo from '../../components/adminListe/AdminListeVideo';


/**
 * Affichage qui remplace la page profil-utilisateur pour les administrateurs.
 * Elle offre la possibilité de ajouter/modifier/supprimer les utilisateurs, compagnies, forfaits et videos.
 * @returns 
 */
function GestionAdminScreen() {

    const nomsOnglets = ["Utilisateurs", "Compagnie", "Forfaits", "Vidéos"];
    const [showOnglet, setshowOnglet] = useState([true, false, false, false]);

    const [listeAdminUtilisateur, setListeAdminUtilisateur] = useState([]);
    const [listeAdminCompagnie, setListeAdminCompagnie] = useState([]);
    const [listeAdminForfait, setListeAdminForfait] = useState([]);
    const [listeAdminVideo, setListeAdminVideo] = useState([]);


    useEffect(() => {
        getListeAdminUtilisateur();
        getListeAdminCompagnie();
        getListeAdminForfait();
        getListeAdminVideo();
    }, []);

    let ongletActuel = showOnglet.indexOf(true);

    return (
        <div className='flex flex-row justify-center w-full h-full mt-16'>
            <div className='flex flex-col w-8/12 items-start'>
                <div className='flex flex-row justify-around items-center '>
                    {nomsOnglets.map((nom, index) => (
                        <div onClick={() => changeOnglet(index)}>
                            <AdminOnglet key={index} isShown={showOnglet.at(index)} nom={nom} />
                        </div>

                    ))}
                </div>
                {
                    {
                        0: listeAdminUtilisateur ? <AdminListeUtilisateur listShown={listeAdminUtilisateur} updateListeUtilisateur={() => getListeAdminUtilisateur()} /> : null,
                        1: listeAdminCompagnie ? <AdminListeCompagnie listShown={listeAdminCompagnie} updateListeCompagnie={() => getListeAdminCompagnie()} /> : null,
                        2: listeAdminForfait ? <AdminListeForfait listShown={listeAdminForfait} updateListeForfait={() => getListeAdminForfait()} /> : null,
                        3: listeAdminVideo ? <AdminListeVideo listShown={listeAdminVideo} updateListeVideo={() => getListeAdminVideo()} /> : null
                    }[ongletActuel]
                }

            </div>
        </div>
    );

    /**
     * Permet de changer l'affichage de la liste selon l'index de l'onglet selectionné. 
     * @param {*} index Représente l'onglet sélectionné.
     */
    function changeOnglet(index) {
        const newShowOnglet = [false, false, false, false];

        newShowOnglet[index] = true
        setshowOnglet(newShowOnglet);
    }

    /**
     * Retourne la liste des utilisateurs inscrits dans la BD.
     */
    function getListeAdminUtilisateur() {
        Axios.get(process.env.BASE_URL + "/Admin", {
        }).then((response) => {
            if (response.data.Utilisateurs) {
                const newlistUtilisateurs = [];

                response.data.Utilisateurs.map((utilisateur) => {
                    newlistUtilisateurs.push({
                        id: utilisateur.id_utilisateur,
                        nom: utilisateur.nom_utilisateur,
                        prenom: utilisateur.prenom_utilisateur,
                        courriel: utilisateur.courriel_utilisateur,
                        telephone: utilisateur.telephone_utilisateur,
                        typeRole: utilisateur.type_role
                    });
                    return null;
                });

                setListeAdminUtilisateur(newlistUtilisateurs);
            }
        });
    }

    /**
     * Retourne la liste des compagnies liés aux utilisateurs inscrits dans la BD.
     */
    function getListeAdminCompagnie() {
        Axios.get(process.env.BASE_URL + "/AdminCompagnie", {
        }).then((response) => {
            if (response.data.Compagnies) {
                const newlistCompagnies = [];

                response.data.Compagnies.map((compagnie) => {
                    newlistCompagnies.push({
                        id: compagnie.id_compagnie,
                        nom: compagnie.nom_compagnie,
                        adresse: compagnie.adresse_compagnie,
                        noRegistre: compagnie.noRegistre_compagnie,
                        courriel: compagnie.courriel_compagnie,
                        telephone: compagnie.telephone_compagnie,
                        idUtilisateur: compagnie.id_utilisateur
                    });
                    return null;
                });

                setListeAdminCompagnie(newlistCompagnies);
            }
        });
    }

    /**
     * Retourne la liste des forfaits inscrits dans la BD.
     */
    function getListeAdminForfait() {
        Axios.get(process.env.BASE_URL + "/AdminForfait", {
        }).then((response) => {
            if (response.data.Forfaits) {
                const newlistForfaits = [];

                response.data.Forfaits.map((forfait) => {
                    newlistForfaits.push({
                        id: forfait.id_forfait,
                        nom: forfait.nom_forfait,
                        type: forfait.type_forfait,
                        prix: forfait.prix_forfait,
                        description: forfait.description_forfait
                    });
                    return null;
                });

                setListeAdminForfait(newlistForfaits);
            }
        });
    }

    /**
     * Retourne la liste des vidéos inscrits dans la BD.
     */
    function getListeAdminVideo() {
        Axios.get(process.env.BASE_URL + "/AdminVideo", {
        }).then((response) => {
            if (response.data.Videos) {
                const newlistVideos = [];

                response.data.Videos.map((video) => {
                    newlistVideos.push({
                        id: video.id_video,
                        titre: video.titre_video,
                        description: video.description_video,
                        id_forfait: video.id_forfait,
                        imageUrl: video.image_video,
                        videoUrl: video.video_video,
                    });
                    return null;
                });

                setListeAdminVideo(newlistVideos);
            }
        });
    }

}
export default GestionAdminScreen;