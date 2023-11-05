import React from 'react';


const Picture = ({ url, id }) => {
    return (
        <img 
           
            className='w-full h-full object-cover rounded-xl '
            src={url} 
            alt='draggable'
        />
    );
};

export default Picture;

