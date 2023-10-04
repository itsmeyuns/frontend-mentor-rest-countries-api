import "./country.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCountries,
  getCountryByRegion,
} from "../../redux/features/countries/countriesActions";
import { Link } from "react-router-dom";

const Country = () => {
  const { loading, countriesData, error, region, message, searchTerm } =
    useSelector((state) => state.country);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCountries());

    if (region) {
      dispatch(getCountryByRegion(region));
    }
    if (error) {
      console.log(message);
    }
  }, [dispatch, error, region, message]);

  const countries = countriesData.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );

  return (
    <section className="country-container">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        countries.map((country) => {
          return (
            <Link
              to={`/${country.cca3}`}
              className="country-card"
              key={country.cca3}
            >
              <img
                src={country.flags.png}
                alt={country.flags.alt}
                className="country-image"
              />
              <div className="country-content">
                <h3>
                  {country.name.common} {country.flag}
                </h3>
                <p>
                  Population: <span>{country.population}</span>
                </p>
                <p>
                  Region: <span>{country.region}</span>
                </p>
                <p>
                  Capital: <span>{country.capital}</span>
                </p>
              </div>
            </Link>
          );
        })
      )}
    </section>
  );
};

export default Country;
