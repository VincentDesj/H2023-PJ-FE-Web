import { React, useEffect } from 'react';
import Entreprises from '../../components/Entreprises';
import Forfaits from '../../components/Forfaits';
import Utilisateur from '../../components/Utilisateur'

/**
 * Affiche la page de profil de l'utilisateur avec ses forfaits, ses entreprises et ses informations de compte.
 * Cette page n'est accesible que si il n'a pas de session active.
 * @returns 
 */
function ProfilScreen(props) {

    useEffect(() => {
        getLoginUtilisateur();
    }, []);

    return (
        <div className='flex flex-row justify-center w-full h-full mt-16'>
            <div className='flex flex-col  w-6/12'>
                <Forfaits />
                <Entreprises />
            </div>
            <Utilisateur />
        </div>
    );

    function getLoginUtilisateur() {
        props.getLogin();
    }

}



export default ProfilScreen;