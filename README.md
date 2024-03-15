# Project Features & Scenarios

### Feature 1: Filter Events By City
- **Scenario 1:** When a user hasn’t searched for a city, upcoming events from all cities should be shown.
- **Scenario 2:** Users should see a list of suggestions when they search for a city.
- **Scenario 3:** Users can select a city from the suggested list.

### Feature 2: Show/Hide Event Details
- **Scenario 1:** An event element is collapsed by default.
- **Scenario 2:** Users can expand an event to see details.
- **Scenario 3:** Users can collapse an event to hide details.

### Feature 3: Specify Number of Events
- **Scenario 1:** When a user hasn’t specified a number, 32 events are shown by default.
- **Scenario 2:** Users can change the number of events displayed.

### Feature 4: Use the App When Offline
- **Scenario 1:** Cached data is shown when there’s no internet connection.
- **Scenario 2:** An error is shown when a user changes search settings (city, number of events) without an internet connection.

### Feature 5: Add an App Shortcut to the Home Screen
- **Scenario 1:** Users can install the meet app as a shortcut on their device home screen.

### Feature 6: Display Charts Visualizing Event Details
- **Scenario 1:** Show a chart with the number of upcoming events in each city.

# User stories

### Feature 1: Filter Events By City
- **As a** user, **I should be able to** view upcoming events from all cities when I haven't searched for a specific city, **so that** I can explore events without specifying a location.
- **As a** user, **I should be able to** see a list of suggested cities when I search for a city, **so that** I can easily find the location I'm interested in.
- **As a** user, **I should be able to** select a city from the suggested list, **so that** I can filter events based on my preferred location.

### Feature 2: Show/Hide Event Details
- **As a** user, **I should** see event details collapsed by default, **so that** I can have a streamlined view of events.
- **As a** user, **I should be able to** expand an event to see its details, **so that** I can get more information about a particular event.
- **As a** user, **I should be able to** collapse an event to hide its details, **so that** I can focus on other events without clutter.

### Feature 3: Specify Number of Events
- **As a** user, **when I haven't specified a number**, I expect to see 32 events displayed by default, **so that** I have a sufficient overview of upcoming events.
- **As a** user, **I should be able to** change the number of events displayed, **so that** I can customize the amount of information according to my preference.

### Feature 4: Use the App When Offline
- **As a** user, **I should** see cached data when there's no internet connection, **so that** I can still access event information offline.
- **As a** user, **I should receive an** error message when I attempt to change search settings (city, number of events) without an internet connection, **so that** I'm aware of the limitations.

### Feature 5: Add an App Shortcut to the Home Screen
- **As a** user, **I should be able to** install the meet app as a shortcut on my device home screen, **so that** I can quickly access it without navigating through menus.

### Feature 6: Display Charts Visualizing Event Details
- **As a** user, **I should** see a chart displaying the number of upcoming events in each city, **so that** I can visually understand event distribution across different locations.

# Brief into Gherkin's (“Given-When-Then”) syntax

## Event Viewing and Searching

- **Given** a user hasn’t searched for a city
  - **When** they view upcoming events
  - **Then** events from all cities should be shown.

- **Given** a user searches for a city
  - **When** they enter the search query
  - **Then** a list of suggestions should be displayed.

- **Given** a list of suggested cities is displayed
  - **When** a user selects a city
  - **Then** events from the selected city should be shown.

## Event Details Interaction

- **Given** an event element is displayed
  - **When** a user views the event
  - **Then** the event details should be collapsed by default.

- **Given** an event with collapsed details
  - **When** a user wants to see more details
  - **Then** they can expand the event to view details.

- **Given** an event with expanded details
  - **When** a user wants to hide the details
  - **Then** they can collapse the event to hide details.

## Event Preferences

- **Given** a user hasn’t specified the number of events
  - **When** they view events
  - **Then** 32 events should be shown by default.

- **Given** a user specifies the number of events they want to see
  - **When** they change the settings
  - **Then** the specified number of events should be displayed.

## Offline Functionality

- **Given** there’s no internet connection
  - **When** a user wants to access the app
  - **Then** cached data should be displayed.

- **Given** there’s no internet connection
  - **When** a user tries to change search settings
  - **Then** an error message should be displayed.

## Additional Features

- **Given** a user wants to add a shortcut to the home screen
  - **When** they access the app
  - **Then** they should be able to install it as a shortcut on their device home screen.

- **Given** there are upcoming events in different cities
  - **When** a user wants to understand event distribution
  - **Then** a chart displaying the number of events in each city should be shown.

## Serverless functions

In the Meet app, serverless functions are used to manage user permissions for viewing public events from Google Calendar. These functions create and handle access tokens, allowing users to safely get event details for display in the app. We're using AWS Lambda for these serverless functions because it helps make the app scalable and saves on costs, without the need for a dedicated server just for authorization.