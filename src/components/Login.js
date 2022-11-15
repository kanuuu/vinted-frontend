import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ hasAccount, setHasAccount, handleToken, handleUser }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="login container">
      <h1>Se connecter</h1>
      <form
        className="login-form"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await axios.post(
              "https://site--server--l7d2svd7qlv9.code.run/user/login",
              {
                email: loginEmail,
                password: loginPassword,
              }
            );
            handleToken(res.data.token);
            handleUser(res.data);
            navigate("/");
          } catch (error) {
            console.log(error.response.data);
          }
          setError(true);
        }}
      >
        <div className="label-style">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
          />
        </div>
        <div className="label-style">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={loginPassword}
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
        </div>
        {error && (
          <p style={{ color: "red" }}>Veuillez renseigner tous les champs</p>
        )}
        <button>Se connecter</button>
      </form>
      <p
        onClick={() => {
          setHasAccount(!hasAccount);
        }}
      >
        Vous n'avez pas encore de compte ? Cliquez ici pour vous inscrire !
      </p>
    </div>
  );
};

export default Login;
