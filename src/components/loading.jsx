import '../assets/styles/loading.scss';
import goku from '../assets/gif/goku.gif';
import React from 'react';

function Loading() {
    return(
        <div className="loading-container">
            <img src={goku} alt="goku"/>
        </div>
    )
}

export default Loading;