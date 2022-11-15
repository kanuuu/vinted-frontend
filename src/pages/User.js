import { Navigate } from "react-router-dom";

const User = ({ user, token }) => {
  if (typeof user === "string") {
    user = JSON.parse(user);
  }
  return token === user.token ? (
    <div className="user-page container">
      <div className="user-card">
        <div className="left-user">
          <p>Informations</p>
          <p>Mes offres</p>
        </div>
        <div className="right-user">
          <img
            src={user?.account.avatar.secure_url || user?.account.avatar}
            className="user-pp"
            alt=""
          />
          <p>Nom d'utilisateur : {user.account.username}</p>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default User;
