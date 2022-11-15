import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";
import Connect from "./pages/Connect";
import Payment from "./pages/Payment";

//components
import Header from "./components/Header";
import User from "./pages/User";
import Footer from "./components/Footer";

import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faMagnifyingGlass,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
library.add(faCaretDown, faMagnifyingGlass, faCircleCheck, faCircleXmark);

const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [user, setUser] = useState(Cookies.get("user") || null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);
  const [price, setPrice] = useState([0, 500]);
  const [finalPrice, setFinalPrice] = useState([0, 500]);
  const [page, setPage] = useState(1);

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  const handleUser = (user) => {
    if (user) {
      setUser(user);
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
    } else {
      setUser(null);
      Cookies.remove("user");
    }
  };

  return (
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        user={user}
        handleUser={handleUser}
        setSearch={setSearch}
        search={search}
        sort={sort}
        setSort={setSort}
        setPrice={setPrice}
        setFinalPrice={setFinalPrice}
        price={price}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              sort={sort}
              finalPrice={finalPrice}
              page={page}
              setPage={setPage}
            />
          }
        />
        <Route
          path="/offer/:id"
          element={<Offer handleToken={handleToken} />}
        />
        <Route
          path="/connect"
          element={
            <Connect handleToken={handleToken} handleUser={handleUser} />
          }
        />
        <Route
          path="/user/:username"
          element={<User user={user} token={token} />}
        />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route
          path="/payment"
          element={<Payment token={token} user={user} />}
        />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};
export default App;
