import Event from "./Event";

const EventList = ({ events }) => {
  return (
    <ul id="event-list">

      {/* if events is a truthy value (e.g., not null, undefined, 0, false, etc.),
          then return the result of the .map() loop. If it’s not a truthy value, render null */}
      {events ? events.map(event => <Event key={event.id} event={event} />) : null}
    </ul>
  );
}

export default EventList;