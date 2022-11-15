import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import OfferPreview from "../components/OfferPreview";
import { HashLoader } from "react-spinners";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://site--server--l7d2svd7qlv9.code.run/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

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
    <div className="offer-page">
      <OfferPreview data={data} />
    </div>
  );
};

export default Offer;
