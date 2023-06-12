import React, { useState, useEffect } from 'react';
import Axios from 'axios';


/**
 * Affiche les forfaits pas achetés par l'utilisateur que le site offre.
 * Si il n'y a pas d'utilisateurs de connecté, tout les forfaits sont affichés.
 * @returns 
 */
function ForfaitScreen() {

    const [listeForfaits, setListForfaits] = useState([]);

    useEffect(() => {
        getListeForfaitsNonAchete();
    }, []);

    return (
        <>
            <div className='text-left text-2xl my-4 py-4'>Les Forfaits disponibles</div>
            {listeForfaits.map((forfait, index) => (
                <div className='m-1 white-bx p-4 w-8/12' key={index}>
                    <div className='text-left text-2xl font-bold mt-4 ml-4'>{forfait.nomForfait}</div>
                    <div className='text-left mt-4 ml-4'>{forfait.description}</div>
                    <div className='text-left mt-4 ml-4'>{forfait.prix} $</div>
                    <div className='text-left mt-4 ml-4'>Acheter</div>
                </div>
            ))}
        </>
    );

    /**
     * Permet de récupérer la liste des forfaits non-achetés par l'utilisateur.
     */
    function getListeForfaitsNonAchete() {
        Axios.get(process.env.REACT_APP_BASE_URL + "/achatForfaits", {
        }).then((response) => {
            if (response.data.Forfaits) {
                const newlistForfaits = [];

                response.data.Forfaits.map((forfait) => {
                    newlistForfaits.push({
                        id: forfait.ID,
                        nomForfait: forfait.Nom,
                        description: forfait.Description,
                        prix: forfait.Prix
                    });
                    return null;
                });

                setListForfaits(newlistForfaits);
            }
        });
    }
}

export default ForfaitScreen;