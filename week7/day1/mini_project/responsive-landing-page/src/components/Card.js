import React from 'react';

const Card = ({ icon, title, text }) => {
  return (
    <div className="d-flex align-items-start my-4 p-3 bg-light rounded">
      <div className="me-3 text-danger" style={{ fontSize: '2.5rem' }}>
        <i className={`fa ${icon}`}></i>
      </div>
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Card;
