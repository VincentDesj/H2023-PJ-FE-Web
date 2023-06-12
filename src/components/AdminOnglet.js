import { React } from "react";

/**
 * 
 * @param {object} props
 * @param {number} props.key
 * @param {boolean} props.isShown  Bolléen qui représente si c'est l'onglet affiché actuellement.
 * @param {string} props.nom  Nom de l'onglet.
 * @returns 
 */
function AdminOnglet(props) {

    return (
        <div>
            {props.isShown ?
                <div className='m-1 p-2 bg-slate-500 hover:bg-slate-700 text-white'>
                    {props.nom}
                </div>
                :
                <div className='m-1 p-2 bg-white border hover:bg-gray-200 text-slate-500 '>
                    {props.nom}
                </div>}

        </div>
    );

}
export default AdminOnglet;