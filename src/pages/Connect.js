import { useState } from "react";

import Signup from "../components/Signup";
import Login from "../components/Login";

const Connect = ({ handleToken, handleUser }) => {
  const [hasAccount, setHasAccount] = useState(false);
  return hasAccount ? (
    <Signup
      setHasAccount={setHasAccount}
      hasAccount={hasAccount}
      handleToken={handleToken}
      handleUser={handleUser}
    />
  ) : (
    <Login
      setHasAccount={setHasAccount}
      hasAccount={hasAccount}
      handleToken={handleToken}
      handleUser={handleUser}
    />
  );
};

export default Connect;
