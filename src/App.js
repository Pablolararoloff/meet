import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import './App.css';
import { getEvents } from './api';

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(events => setEvents(events));
  }, []);

  return (
    <div className="App">
      <CitySearch />
      <EventList events={events}/>
      <NumberOfEvents />

    </div>
  );
}

export default App;