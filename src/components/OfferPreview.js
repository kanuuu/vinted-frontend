import { Link } from "react-router-dom";

const OfferPreview = ({ data }) => {
  return (
    <div className="item-shower container">
      <img src={data.product_image.secure_url} className="left-side" alt="" />
      <div className="right-side">
        <div className="top-infos">
          <h1>$ {data.product_price.toFixed(2)}</h1>
          {data.product_details.map((elem, index) => {
            const objKey = Object.keys(elem)[0];
            return (
              <h2 key={index}>
                <span>{objKey.toUpperCase()}</span>
                <span>{elem[objKey]}</span>
              </h2>
            );
          })}
        </div>
        <div className="bot-infos">
          <div className="more-infos">
            <h1>{data.product_name}</h1>
            <h2>{data.product_description}</h2>
            <div className="owner-inf">
              <img
                src={data.owner.account?.avatar?.secure_url}
                className="profile-pic"
                alt=""
              />
              <span>{data.owner.account.username}</span>
            </div>
          </div>
          <Link
            to="/payment"
            state={{
              title: data.product_name,
              price: data.product_price,
              id: data._id,
              owner: data.owner,
            }}
          >
            <button className="buy">Acheter</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferPreview;
