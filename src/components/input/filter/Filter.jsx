import { useState, useEffect } from "react";
import {
  reset,
  setRegion,
} from "../../../redux/features/countries/countriesSlice";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
  const { region, error, message } = useSelector((state) => state.country);
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const regions = ["Asia", "Africa", "Americas", "Oceania", "Europe"];
  const handelDropdown = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (filter) {
      dispatch(setRegion(filter.toLocaleLowerCase()));
    }
    if (error) {
      console.log(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, filter, region, error, message]);

  return (
    <section className="filter-container">
      <div className="filter" onClick={handelDropdown}>
        <input
          type="text"
          readOnly
          placeholder="Filter by Region"
          value={filter}
          className="filter-input"
        />

        <i className="fa-solid fa-angle-down"></i>
      </div>
      {isOpen && (
        <div className="dropdown">
          {regions.map((region, index) => {
            return (
              <div
                className="dropdown-item"
                key={index}
                onClick={() => {
                  setFilter(region);
                  handelDropdown();
                }}
              >
                {region}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Filter;
