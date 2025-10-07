import React from 'react';

const BootstrapCard = ({ title, imageUrl, description, buttonLabel, buttonUrl }) => {
  return (
    <div className="card m-5" style={{ width: '30rem' }}>
      <img className="card-img-top" src={imageUrl} alt={`${title} image`} />
      <div className="card- text-center">
        <h5 className="card-title mt-3">{title}</h5>
        <p className="card-text">{description}</p>
        <a href={buttonUrl} className="btn btn-primary mb-3" target="_blank" rel="noopener noreferrer">
          {buttonLabel}
        </a>
      </div>
    </div>
  );
};

export default BootstrapCard;
