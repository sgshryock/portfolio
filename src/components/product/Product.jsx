import React from 'react'
import "./product.css"

const product = ({img,link}) => {
  return (
    <div className='p'>
        <div className="p-browser">
            <div className="p-cirlce"></div>
            <div className="p-cirlce"></div>
            <div className="p-cirlce"></div>
        </div>
        <a href={link} target="_blank" rel="noreferrer">
            <img src={img} alt="" className="p-img" />
        </a>
    </div>
  );
};

export default product