import { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents, setInfoAlert, setErrorAlert, setWarningAlert }) => {
  const [numberOfEvents, setNumberOfEventsState] = useState('32');

  const handleInputChange = (event) => {
    const value = event.target.value;
    const parsedValue = parseInt(value, 10); 

    
    if (isNaN(parsedValue) || parsedValue <= 0) {
     
      setErrorAlert('Number of events cannot be negative.');
      setInfoAlert("Please enter a valid number");
    } else if (parsedValue > 100) {
    
      setWarningAlert("Warning: Entering a large number of events may affect performance.");
      setNumberOfEvents(parsedValue); 
    } else {
     
      setErrorAlert('');
      setInfoAlert('');
      setWarningAlert('');
      setNumberOfEvents(parsedValue); 
    }

    
    setNumberOfEventsState(value);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="eventNumberInput">Number of Events</label>
      <input
        type="text"
        id="eventNumberInput"
        value={numberOfEvents} 
        onChange={handleInputChange} 
      />
    </div>
  );
};

export default NumberOfEvents;
