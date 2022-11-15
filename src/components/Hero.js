import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-overlay"></div>
      <img
        src="https://static.vinted.com/assets/seller-promotion/gender_test/c/banner-wide-96cebf41372b8de2d64b7e609f0fb2d3c3084f8df0f861fa8b3782231e5c31f8.jpg"
        className="hero-image"
        alt=""
      />
      <div className="get-started">
        <h1>Prets a faire du tri dans vos placards ?</h1>
        <div>
          <Link to="/publish">
            <button style={{ cursor: "pointer" }}>Vends maintenant</button>
          </Link>

          <span>Decouvrir comment ca marche</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
