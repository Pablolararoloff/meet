import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
  let EventComponent;
  const event = mockData[0].items[0];

  beforeEach(() => {
    EventComponent = render(<Event event={event} />);
  });

  afterEach(() => {
    // Clean up after each test to remove rendered elements from the document
    EventComponent.unmount();
  });

  test('has event title', () => {
    expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
  });

  test('has event created time', () => {
    expect(EventComponent.queryByText(event.created)).toBeInTheDocument();
  });

  test('has event location', () => {
    expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
  });

  test('renders the event element', () => {
    expect(EventComponent.queryByText('event-element')).toBeInTheDocument();
  });

  test('event details are collapsed by default', () => {
    expect(EventComponent.queryByText('event-details')).not.toBeVisible();
  });

  test('can expand event to view details', async () => {
    const user = UserEvent.setup();
    await user.click(EventComponent.queryByText('toggle-details-button'));
    expect(EventComponent.queryByText('event-details')).toBeVisible();
  });


  test('shows details when user clicks show details button', async () => {
    const user = userEvent.setup();
    const showDetailsButton = EventComponent.queryByText('Show Details');
    expect(showDetailsButton).toBeInTheDocument();
    await user.click(showDetailsButton);
    const details = EventComponent.container.querySelector('.details');
    expect(details).toBeInTheDocument();
  });

  test('hides details when user clicks hide details button', async () => {
    const user = userEvent.setup();
    const showDetailsButton = EventComponent.queryByText('Show Details');
    await user.click(showDetailsButton); // Show details first
    const hideDetailsButton = EventComponent.queryByText('Hide Details');
    expect(hideDetailsButton).toBeInTheDocument(); 
    await user.click(hideDetailsButton);
    const details = EventComponent.container.querySelector('.details');
    expect(details).not.toBeInTheDocument();
    expect(showDetailsButton).toBeInTheDocument();
  });

});