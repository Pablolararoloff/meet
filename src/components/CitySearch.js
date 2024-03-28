import { useState } from "react";

const CitySearch = ({ allLocations }) => {
  const [showSuggestions, setShowSuggestions] = useState(false); // is false because you don't want to show the suggestions list by default unless user clicks on the textbox
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // The function to handle input changes, filtering suggestions based on input
  const handleInputChanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    setQuery(value);
    setSuggestions(filteredLocations);
  };

    const handleItemClicked = (event) => {
      const value = event.target.textContent;
      setQuery(value);
      setShowSuggestions(false); // to hide the list
    };

 

    return (
      <div id="city-search">
        <input
          type="text"
          className="city"
          placeholder="Search for city"
          value={query}
          onFocus={() => setShowSuggestions(true)}
          onChange={handleInputChanged}
        />
        {showSuggestions ? <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          })}
          <li key='See all cities' onClick={handleItemClicked} >
            <b>See all cities</b>
          </li>
        </ul> : null}
      </div>
    )
  }

export default CitySearch;