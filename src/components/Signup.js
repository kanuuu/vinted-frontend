import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Signup = ({ hasAccount, setHasAccount, handleToken, handleUser }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [picture, setPicture] = useState();
  const [imgVisible, setImgVisible] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="signup container">
      <h1>S'inscrire</h1>
      <form
        className="signup-form"
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData();
          formData.append("email", email);
          formData.append("username", username);
          formData.append("password", password);
          formData.append("newsletter", newsletter);
          formData.append("picture", picture);

          try {
            setIsLoading(true);
            const res = await axios.post(
              "https://site--server--l7d2svd7qlv9.code.run/user/signup",
              formData
            );
            handleToken(res.data.token);
            handleUser(res.data);
            setIsLoading(false);
            navigate("/");
          } catch (error) {
            // console.log(error.response.data);
            setError(true);
          }
        }}
      >
        <div className="picture-style">
          {imgVisible ? (
            <div
              className="ppp-btn"
              onClick={() => {
                setImgVisible(false);
              }}
            >
              <img
                //without setting default object, see Publish.js for an other method
                src={URL.createObjectURL(picture)}
                alt=""
                className="img-ppp"
              />
            </div>
          ) : (
            <>
              <label htmlFor="profile-personal-picture" className="ppp-label">
                + Ajouter une photo
              </label>
              <input
                type="file"
                id="profile-personal-picture"
                className="ppp"
                onChange={(e) => {
                  setPicture(e.target.files[0]);
                  setImgVisible(true);
                }}
              />
            </>
          )}
        </div>
        <div className="label-style">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="label-style">
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="label-style">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="label-style cb-style">
          <input
            type="checkbox"
            checked={newsletter}
            className="signup-checkbox"
            onChange={(e) => {
              setNewsletter(e.target.checked);
            }}
          />
          <span>S'abonner a la newsletter</span>
        </div>
        {error && (
          <p style={{ color: "red" }}>Veuillez renseigner tous les champs</p>
        )}
        {isLoading ? (
          <div className="loading-signup">
            <ClipLoader
              color={"white"}
              loading={isLoading}
              size={30}
              aria-label={"Loading ..."}
            />
          </div>
        ) : (
          <button>S'inscrire</button>
        )}
      </form>
      <p
        onClick={() => {
          setHasAccount(!hasAccount);
        }}
      >
        Vous avez deja un compte ? Cliquez ici pour vous connecter !
      </p>
    </div>
  );
};

export default Signup;
