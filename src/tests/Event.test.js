import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserEvent from '@testing-library/user-event';
import Event from '../components/Event';
import mockData from '../mock-data';

describe('<Event /> component', () => {
  let EventComponent;
  const event = mockData[0];

  beforeEach(() => {
    EventComponent = render(<Event event={event} />);
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

  test('has button show details', () => {
    expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
  });

  test('by default, events details section should be hidden', () => {
    const details = EventComponent.container.querySelector('.details');
    expect(details).not.toBeInTheDocument();
  });

  test('toggles details section and button text on user click', async () => {
    const user = UserEvent.setup();
    const button = EventComponent.queryByText('Show Details');
    // Show details
    await user.click(button);
    expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
    expect(button).toHaveTextContent('Hide Details');
    // Hide details
    await user.click(button);
    expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
    expect(button).toHaveTextContent('Show Details');
  });

});