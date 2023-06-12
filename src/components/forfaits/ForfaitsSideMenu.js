import React from 'react';

/**
 * Affiches en onglets les différents forfaitque l'utilisateur peu choisir.
 * @param {*} props
 * @param {[]} props.listeForfaitUtilisateur Liste des forfaits que l'utilisateur a déjà acheté.
 * @param {() => void} props.forfaitAffiche Permet de mettre à jour le forfait sélectionné par l'utilisateur.
 * @returns 
 */
function ForfaitsSideMenu(props) {

    return (
        <div className='flex flex-col w-3/12'>
            <div className='text-left text-2xl py-4'>Forfaits</div>
            {props.listeForfaitUtilisateur.map((forfait) =>
                forfait.select === true ?
                    <div className='p-4 my-1 bg-slate-500 hover:bg-slate-700 text-white' onClick={() => props.updateSelect(forfait.id)}>{forfait.nomForfait}</div> :
                    <div className='p-4 my-1 bg-white border hover:bg-gray-200 text-slate-500' onClick={() => props.updateSelect(forfait.id)}>{forfait.nomForfait}</div>
            )}
        </div>

    )


}

export default ForfaitsSideMenu;