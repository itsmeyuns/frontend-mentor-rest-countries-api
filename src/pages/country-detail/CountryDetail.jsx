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

            <div className="country-detail-right">
              <h1>{singleCountry[0].name.common}</h1>
              <div className="details">
                <div className="detail-left">
                  <p>
                    Offcial Name: <span>{singleCountry[0].name.common}</span>
                  </p>
                  <p>
                    Population: <span>{singleCountry[0].population}</span>
                  </p>
                  <p>
                    Region: <span>{singleCountry[0].region}</span>
                  </p>

                  <p>
                    Sub Region: <span>{singleCountry[0].subregion}</span>
                  </p>
                  <p>
                    Capital: <span>{singleCountry[0].capital}</span>
                  </p>
                </div>

                <div className="detail-right">
                  <p>
                    Top Level Domain: <span>{singleCountry[0].tld[0]}</span>
                  </p>
                  <p>
                    Currencies:
                    <span>
                      {Object.values(singleCountry[0].currencies)
                        .map((item) => {
                          return item.name;
                        })
                        .join(", ")}
                    </span>
                  </p>
                  <p>
                    Languages:
                    <span>
                      {Object.values(singleCountry[0].languages)
                        .map((item) => {
                          return item;
                        })
                        .join(", ")}
                    </span>
                  </p>
                </div>
              </div>

              <div className="border">
                <p>
                  Border Countries:
                  {singleCountry[0].borders &&
                  singleCountry[0].borders.length > 0 ? (
                    singleCountry[0].borders.map((border, index) => (
                      <Link
                        to={`/${border}`}
                        key={index}
                        className="border-name"
                      >
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
