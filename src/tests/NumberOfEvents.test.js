import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let setNumberOfEventsMock, setErrorAlertMock, setInfoAlertMock, setWarningAlertMock;

  beforeEach(() => {
    setNumberOfEventsMock = jest.fn();
    setErrorAlertMock = jest.fn();
    setInfoAlertMock = jest.fn();
    setWarningAlertMock = jest.fn();

    render(
      <NumberOfEvents
        setNumberOfEvents={setNumberOfEventsMock}
        setErrorAlert={setErrorAlertMock}
        setInfoAlert={setInfoAlertMock}
        setWarningAlert={setWarningAlertMock}
      />
    );
  });

  test('has a textbox element', () => {
    expect(screen.getByLabelText(/number of events/i)).toBeInTheDocument();
  });

  test('default value is 32', () => {
    expect(screen.getByLabelText(/number of events/i)).toHaveValue('32');
  });

  test('allows the user to change the number of events displayed', async () => {
    const user = userEvent.setup();
    const textbox = screen.getByRole('textbox', { name: 'Number of Events' });
    await user.clear(textbox);
    await user.type(textbox, '10');
    expect(setNumberOfEventsMock).toHaveBeenCalledWith(10);
  });

  test('displays error for invalid input', async () => {
    const user = userEvent.setup();
    const textbox = screen.getByRole('textbox', { name: 'Number of Events' });
    await user.clear(textbox);
    await user.type(textbox, '-5');
    expect(setErrorAlertMock).toHaveBeenCalledWith('Number of events cannot be negative.');
  });

  test('warns about performance for large numbers', async () => {
    const user = userEvent.setup();
    const textbox = screen.getByLabelText(/number of events/i);
    await user.clear(textbox);
    await user.type(textbox, '101');
    expect(setWarningAlertMock).toHaveBeenCalledWith("Warning: Entering a large number of events may affect performance.");
  });
});
