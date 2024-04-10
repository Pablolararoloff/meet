import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [errorAlert, setErrorAlert] = useState('');
  const [infoAlert, setInfoAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEvents = await getEvents() || [];
        if (!Array.isArray(allEvents)) {
          console.error('getEvents did not return an array', allEvents);
          return; // Prevent further execution if allEvents is not an array
        }
        let filteredEvents = allEvents;
        if (currentCity !== "See all cities") {
          filteredEvents = allEvents.filter(event => event.location === currentCity);
        }

        filteredEvents = filteredEvents.slice(0, numberOfEvents);
        setEvents(filteredEvents);
        setAllLocations(extractLocations(allEvents));
      } catch (error) {
        console.error('Failed to fetch events:', error);

      }
      setInfoAlert(isOnline ? "You are online." : "You are offline, data is being loaded from cache.");
    };

   fetchData();
  }, [currentCity, numberOfEvents, isOnline]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setInfoAlert("You're back online.");
    };
    const handleOffline = () => {
      setIsOnline(false);
      setInfoAlert("You've lost connection. Data is loaded from cache.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSetErrorAlert = (message) => setErrorAlert(message);
  const handleSetInfoAlert = (message) => setInfoAlert(message);
  const handleSetWarningAlert = (message) => setWarningAlert(message);

  return (
    <div className="App">
      <div className="Header">
        <h1>Meet</h1>
        <p className="subtitle">Choose your nearest city</p>
      </div>
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
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
