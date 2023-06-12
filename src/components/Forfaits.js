import { React, useState, useEffect } from "react";
import Axios from 'axios';

/**
 * Composante affichant tout les forfaits qu'un utilisateur a acheté.
 * @param {*} props 
 * @returns 
 */
function Forfaits() {

    const [listeForfaitUser, setListeForfaitUser] = useState([]);

    useEffect(() => {
        getListeForfaits();
    }, []);

    return (
        <>
            <div className='text-left text-4xl font-bold my-4'>{listeForfaitUser.length > 1 ? "Vos Forfaits" : "Votre Forfait"}</div>
            {listeForfaitUser.length === 0 ?
                <>
                    <div className='text-slate-500 text-xl mt-4'>Vous avez aucun forfait à votre nom.</div>
                    <div className='text-slate-500 text-xl font-bold'>Voir les forfaits</div>
                </>
                :
                listeForfaitUser.map((forfait, index) => (
                    <div className='m-1 white-bx p-4' key={index}>
                        <div className='text-left text-2xl font-bold mt-4 ml-4'>{forfait.nom}</div>
                        <div className='text-left mt-4 ml-4'>{forfait.description}</div>
                        <div className='text-left mt-4 ml-4'>Voir plus</div>
                    </div>
                ))
            }
        </>
    );

    /**
     * Récupère la liste des forfaits que l'utilisateur a déjà acheté.
     */
    function getListeForfaits() {
        Axios.get(process.env.BASE_URL + "/profilForfait", {
        }).then((response) => {
            if (response.data.Forfait) {
                const newlistForfaits = [];

                response.data.Forfait.map((forfait) => {
                    newlistForfaits.push({
                        nom: forfait.Nom,
                        description: forfait.Description,
                        prix: forfait.Prix
                    });
                    return null;
                });

                setListeForfaitUser(newlistForfaits);
            }
        });
    };

}

export default Forfaits;