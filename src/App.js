import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [errorAlert, setErrorAlert] = useState('');
  const [infoAlert, setInfoAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      let filteredEvents = allEvents;
      if (currentCity !== "See all cities") {
        filteredEvents = allEvents.filter(event => event.location === currentCity);
      }
      // Now using numberOfEvents to slice the array
      filteredEvents = filteredEvents.slice(0, numberOfEvents);
      setEvents(filteredEvents);
      setAllLocations(extractLocations(allEvents));
    };

    fetchData();
  }, [currentCity, numberOfEvents]);

  const handleSetErrorAlert = (message) => setErrorAlert(message);
  const handleSetInfoAlert = (message) => setInfoAlert(message);
  const handleSetWarningAlert = (message) => setWarningAlert(message);

  return (
    <div className="App">
      {errorAlert && <div className="alert error">{errorAlert}</div>}
      {infoAlert && <div className="alert info">{infoAlert}</div>}
      {warningAlert && <div className="alert warning">{warningAlert}</div>}
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents
        setNumberOfEvents={setNumberOfEvents}
        setErrorAlert={handleSetErrorAlert}
        setInfoAlert={handleSetInfoAlert}
        setWarningAlert={handleSetWarningAlert}
      />
      <EventList events={events} />
    </div>
  );
};

export default App;
