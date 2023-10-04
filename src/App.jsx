import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import CountryDetails from "./pages/country-detail/CountryDetail";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <main className="main-container">
      <Router>
        <Routes>
          <Route exact path="/" element={<Header />}>
            <Route index element={<Home />}></Route>
            <Route path="/:code" element={<CountryDetails />}></Route>
          </Route>
        </Routes>
      </Router>
    </main>
  );
};

export default App;
