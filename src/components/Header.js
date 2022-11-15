import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

const Header = ({
  token,
  handleToken,
  user,
  handleUser,
  search,
  setSearch,
  sort,
  setSort,
  price,
  setPrice,
  setFinalPrice,
}) => {
  const navigate = useNavigate();
  if (typeof user === "string") {
    user = JSON.parse(user);
  }
  return (
    <header className="head-bar">
      <div className="head-nav container">
        <Link to="/">
          <img
            alt=""
            src="https://www.vinted.fr/assets/web-logo/default/logo.svg"
            className="logo"
          />
        </Link>
        <div className="searcher">
          <div className="search-bar-icon">
            <FontAwesomeIcon
              icon="fa-magnifying-glass"
              className="search-icon"
            />
            <input
              type="text"
              className="search-bar"
              placeholder="Rechercher des articles"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          <Filters
            sort={sort}
            setSort={setSort}
            price={price}
            setPrice={setPrice}
            setFinalPrice={setFinalPrice}
          />
        </div>

        <div className="user-inputs">
          {token ? (
            <>
              <Link to={`/user/${user.account.username}`}>
                <div className="user-infos">
                  <img
                    src={
                      user?.account.avatar.secure_url || user?.account.avatar
                    }
                    className="profile-picture"
                    alt=""
                  />
                  <p>{user?.account.username}</p>
                  <FontAwesomeIcon icon="fa-caret-down" />
                </div>
              </Link>

              <button
                className="connect"
                onClick={() => {
                  handleToken(null);
                  handleUser(null);
                  navigate("/");
                }}
              >
                Se deconnecter
              </button>
            </>
          ) : (
            <Link to="/connect">
              <button className="connect">S'inscrire | Se connecter</button>
            </Link>
          )}
          <Link to="/publish">
            <button className="sell">Vends tes articles</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
