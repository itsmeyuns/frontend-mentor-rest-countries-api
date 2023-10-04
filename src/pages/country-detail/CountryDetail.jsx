import { useDispatch, useSelector } from "react-redux";
import "./country-detail.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCountryByCode } from "../../redux/features/countries/countriesActions";
import { reset } from "../../redux/features/countries/countriesSlice";

const CountryDetail = () => {
  const { singleCountry, error, message, loading } = useSelector(
    (state) => state.country
  );
  console.log(singleCountry);
  const { code } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (code) {
      dispatch(getCountryByCode(code.toLocaleUpperCase()));
    }

    if (error) {
      console.log(message);
    }

    return () => dispatch(reset());
  }, [dispatch, code, error, message]);

  return (
    <section className="country-detail-container">
      <Link className="back-button" to="/">
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>

      {loading && <h1>Loading...</h1>}
      {!loading && singleCountry.length > 0 && (
        <div className="country-detail-content">
          <img
            src={singleCountry[0].flags.png}
            alt={singleCountry[0].flags.alt}
            className="country-detail-image"
          />
          <div className="country-details">
            <h1>{singleCountry[0].name.common}</h1>
            <div className="country-details-flex">
              <div className="country-details-right">
                <p>
                  <span className="country-data">Offcial Name:</span>{" "}
                  {singleCountry[0].name.official}
                </p>
                <p>
                  <span className="country-data">Population:</span>{" "}
                  {singleCountry[0].population}
                </p>
                <p>
                  <span className="country-data">Region:</span>{" "}
                  {singleCountry[0].region}
                </p>

                <p>
                  <span className="country-data">Sub Region:</span>{" "}
                  {singleCountry[0].subregion}
                </p>
                <p>
                  <span className="country-data">Capital:</span>{" "}
                  {singleCountry[0].capital}
                </p>
              </div>
              <div className="country-details-left">
                <p>
                  <span className="country-data">Top Level Domain:</span>{" "}
                  {singleCountry[0].tld[0]}
                </p>
                <p>
                  <span className="country-data">Currencies:</span>
                  {Object.values(singleCountry[0].currencies)
                    .map((item) => {
                      return item.name;
                    })
                    .join(", ")}
                </p>
                <p>
                  <span className="country-data">Languages:</span>
                  {Object.values(singleCountry[0].languages)
                    .map((item) => {
                      return item;
                    })
                    .join(", ")}
                </p>
              </div>
            </div>

            <div className="border">
              <p>
                Border Countries:
                {singleCountry[0].borders &&
                singleCountry[0].borders.length > 0 ? (
                  singleCountry[0].borders.map((border, index) => (
                    <Link to={`/${border}`} key={index} className="border-name">
                      {border}
                    </Link>
                  ))
                ) : (
                  <span>No Borders</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {!loading && !singleCountry.length > 0 && <h1>Walo</h1>}
    </section>
  );
};

export default CountryDetail;
