import { Link } from "react-router-dom";

const OfferList = ({ offer }) => {
  return (
    <Link to={`/offer/${offer._id}`} className="offer-item">
      <div className="top-card card">
        <img
          src={offer.owner.account?.avatar?.secure_url}
          className="pp"
          alt=""
        />
        <span>{offer.owner.account.username}</span>
      </div>
      <img src={offer.product_image.secure_url} className="image-card" alt="" />
      <div className="bot-card">
        <h1>$ {offer.product_price.toFixed(2)}</h1>
        {offer.product_details.map((elem, index) => {
          return (
            <div key={index}>
              <h2>{elem.size}</h2>
              <h2>{elem.brand}</h2>
            </div>
          );
        })}
      </div>
    </Link>
  );
};

export default OfferList;
