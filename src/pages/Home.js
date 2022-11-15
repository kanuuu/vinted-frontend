import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import OfferList from "../components/OfferList";
import { HashLoader } from "react-spinners";
import Footer from "../components/Footer";

const Home = ({ search, sort, finalPrice, page, setPage }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  if (search) {
    search = `title=${search}`;
  }
  if (sort === false || sort === true) {
    if (sort === false) {
      sort = `sort=price-asc`;
    } else if (sort === true) {
      sort = `sort=price-desc`;
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--server--l7d2svd7qlv9.code.run/offers?priceMin=${finalPrice[0]}&priceMax=${finalPrice[1]}&page=${page}&${search}&${sort}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [search, sort, finalPrice, page]);

  return isLoading ? (
    <div className="loading">
      <HashLoader
        color={"#00747f"}
        loading={isLoading}
        size={80}
        aria-label={"Loading ..."}
      />
    </div>
  ) : (
    <div className="home">
      <Hero />
      <div className="offers container">
        <h1>Fil d'actu</h1>

        <div className="offer-display">
          {data.offers.map((offer) => {
            return <OfferList key={offer._id} offer={offer} />;
          })}
        </div>

        <div className="offer-pages">
          <button
            style={{ visibility: page <= 1 && "hidden" }}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            &lt;
          </button>
          <p>Page : {page}</p>
          <button
            style={{ visibility: data.count <= page * 5 && "hidden" }}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            &gt;
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
