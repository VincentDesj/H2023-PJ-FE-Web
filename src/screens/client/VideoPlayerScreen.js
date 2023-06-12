import React from 'react';
import { useLocation } from "react-router-dom";


/**
 * Affiche le vidéo qui a été sélectionné pour l'écoute.
 * @returns 
 */
function VideoPlayerScreen() {

    const { state } = useLocation();
    const { nom, description, videoUrl } = state;

    console.log(nom, description, videoUrl)

    return (
        <div className='flex flex-col items-center mt-16'>
            <div className='text-left text-4xl pt-4 pb-8'>{nom}</div>
            <video className='w-9/12' controls>
                <source src={videoUrl} type="video/mp4" />
            </video>
            <div className='pt-12 pb-12'>{description}</div>
        </div>
    );
}

export default VideoPlayerScreen;