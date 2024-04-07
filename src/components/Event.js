import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event">
      <h3>{event.summary}</h3>
      <p>{event.created}</p>
      <p>{event.location}</p>
      {showDetails && (
        <div className='details'>
          <h2>About event:</h2>
          <p>{event.description}</p>
        </div>
      )}
      <button className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </li>
  );
};

export default Event;
