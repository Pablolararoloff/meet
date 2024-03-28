// src/__tests__/NumberOfEvents.test.js
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
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test('default value is 32', () => {
    expect(screen.getByRole('textbox')).toHaveValue('32');
  });

  test('updates value when user types', async () => {
    const textbox = screen.getByRole('textbox');
    await userEvent.clear(textbox);
    await userEvent.type(textbox, '10');
    expect(textbox).toHaveValue('10');
    // Verify setNumberOfEvents is called with the correct, parsed value
    expect(setNumberOfEventsMock).toHaveBeenCalledWith(10);
  });

  test('displays error for invalid input', async () => {
    const textbox = screen.getByRole('textbox');
    await userEvent.clear(textbox);
    await userEvent.type(textbox, '-5');
    expect(setErrorAlertMock).toHaveBeenCalledWith('Number of events cannot be negative');
    expect(setInfoAlertMock).toHaveBeenCalledWith("Please enter a valid number");
  });

  test('warns about performance for large numbers', async () => {
    const textbox = screen.getByRole('textbox');
    await userEvent.clear(textbox);
    await userEvent.type(textbox, '101');
    expect(setWarningAlertMock).toHaveBeenCalledWith("Warning: Entering a large number of events may affect performance.");
  });
});
