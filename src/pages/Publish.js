import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Publish = ({ token }) => {
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [imgVisible, setImgVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("picture", file);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("price", productPrice);

    try {
      await axios.post(
        "https://site--server--l7d2svd7qlv9.code.run/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //method with initializing picture as an empty object
  const printFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setImgSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return token ? (
    <div className="publish-bg">
      <form className="publish-page container" onSubmit={handleSubmit}>
        <h1>Vends ton article</h1>
        <div className="publish-img">
          {imgVisible ? (
            <div
              className="del-img"
              onClick={() => {
                setImgVisible(false);
              }}
            >
              <img src={imgSrc} alt="" className="display-publish-img" />
            </div>
          ) : (
            <>
              <label className="import-img-style" htmlFor="import-img">
                <span className="import-btn">+ Ajouter une photo</span>
              </label>
              <input
                type="file"
                className="add-photo"
                id="import-img"
                onChange={(e) => {
                  printFile(e.target.files[0]);
                  setImgVisible(true);
                  setFile(e.target.files[0]);
                }}
              />
            </>
          )}
        </div>
        <div className="publish-title">
          <div className="publish-content">
            <p>Titre</p>
            <input
              type="text"
              placeholder="ex: Chemise Sezane verte"
              value={title}
              onChange={(e) => {
                handleInputChange(e, setTitle);
              }}
            />
          </div>
          <div className="publish-content">
            <p>Decris ton article</p>
            <input
              type="text"
              placeholder="ex: porte quelque-fois, taille correctement"
              value={desc}
              onChange={(e) => {
                handleInputChange(e, setDesc);
              }}
            />
          </div>
        </div>
        <div className="publish-infos">
          <div className="publish-content">
            <p>Marque</p>
            <input
              type="text"
              placeholder="ex: Nike"
              value={brand}
              onChange={(e) => {
                handleInputChange(e, setBrand);
              }}
            />
          </div>
          <div className="publish-content">
            <p>Taille</p>
            <input
              type="text"
              placeholder="ex: S / M / L"
              value={size}
              onChange={(e) => {
                handleInputChange(e, setSize);
              }}
            />
          </div>
          <div className="publish-content">
            <p>Couleur</p>
            <input
              type="text"
              placeholder="ex: white"
              value={color}
              onChange={(e) => {
                handleInputChange(e, setColor);
              }}
            />
          </div>
          <div className="publish-content">
            <p>Etat</p>
            <input
              type="text"
              placeholder="ex: Neuf avec etiquette"
              value={condition}
              onChange={(e) => {
                handleInputChange(e, setCondition);
              }}
            />
          </div>
          <div className="publish-content">
            <p>Lieu</p>
            <input
              type="text"
              placeholder="ex: London"
              value={city}
              onChange={(e) => {
                handleInputChange(e, setCity);
              }}
            />
          </div>
        </div>
        <div className="publish-price">
          <div className="publish-content">
            <p>Prix</p>
            <input
              type="number"
              placeholder="$ 0.00"
              value={productPrice}
              onChange={(e) => {
                handleInputChange(e, setProductPrice);
              }}
            />
          </div>
        </div>
        {productPrice &&
          (isLoading ? (
            <div className="loading-publish">
              <ClipLoader
                color={"white"}
                loading={isLoading}
                size={30}
                aria-label={"Loading ..."}
              />
            </div>
          ) : (
            <button>Publier</button>
          ))}
      </form>
    </div>
  ) : (
    <Navigate to="/connect" />
  );
};

export default Publish;
