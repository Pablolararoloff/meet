import { render, waitFor, within } from '@testing-library/react';
import { getEvents } from '../api';
import EventList from '../components/EventList';
import App from "../App";

jest.mock('../api', () => ({
  getEvents: () => Promise.resolve(new Array(32).fill().map((_, i) => ({
    id: i,
    summary: `Event ${i}`,
    created: '2020-01-01',
    location: `Location ${i}`,
    description: `Description ${i}`
  })))
}));

describe('<EventList /> component', ()=>{
  let EventListComponent;
  beforeEach(()=>{
       EventListComponent = render(<EventList />);
  })
  test('has an element with "list" role', ()=>{
      expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });
  test('renders correct number of events', async () => {
      const allEvents = await getEvents(); 
      EventListComponent.rerender(<EventList events={allEvents} />);
  expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });
});

describe('<EventList /> integration', ()=>{
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
      const AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

 });

