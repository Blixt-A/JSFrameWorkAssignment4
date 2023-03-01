import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(6);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all');
        if (!response.ok) {
          throw new Error('Response not ok');
        }
        const data = await response.json();
        setCountries(data);
        setDisplayedCountries(data.slice(0, displayLimit));
      } catch (error) {
        setError(error.message);
      } 
    };

    fetchCountries();
  }, [displayLimit]);

  const handleShowMore = () => {
    setDisplayLimit(displayLimit + 6);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Countries of the World</h1>
      </div>
      <div className="container">
        {isLoading && <p>Loading countries...</p>}
        {error && <p>{error}</p>}
        <div className="country-list">
          {displayedCountries.map(country => (
            <div className="country" key={country.alpha2Code}>
              <img src={country.flag} alt={`${country.name} flag`} />
              <div className="country-info">
                <h2>{country.name}</h2>
                <p>Population: {country.population.toLocaleString()}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </div>
            </div>
          ))}
        </div>
        {displayLimit < countries.length && (
          <button className="show-more" onClick={handleShowMore}>
            Show More Countries
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
