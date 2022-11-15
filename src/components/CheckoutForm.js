import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const CheckoutForm = ({ title, price, id, token, user, owner }) => {
  if (typeof user === "string") {
    user = JSON.parse(user);
  }
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    try {
      setIsLoading(true);
      setError(false);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: user.id,
      });
      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://site--server--l7d2svd7qlv9.code.run/payment",
        {
          stripeToken,
          title,
          price,
          id,
          owner,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.response.status === "succeeded") {
        setData(response.data.newOrder);
        setCompleted(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  return error ? (
    <div className="payout-fail">
      <FontAwesomeIcon icon="fa-circle-xmark" />
      <span style={{ color: "red", fontSize: "12px" }}>
        Un probleme est survenu lors du traitement de votre paiement. Veuillez
        reessayer.
      </span>
      <span style={{ color: "red", fontSize: "10px" }}>
        Si le probleme persiste, merci de contacter un administrateur.
      </span>
    </div>
  ) : !completed ? (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {!isLoading ? (
        <button className="pay-offer">Pay</button>
      ) : (
        <div className="pay-offer loading-offer">
          <ClipLoader
            color={"white"}
            loading={isLoading}
            size={30}
            aria-label={"Loading ..."}
          />
        </div>
      )}
    </form>
  ) : (
    <div className="payout-valid">
      <FontAwesomeIcon icon="fa-circle-check" />
      <span style={{ color: "grey", fontSize: "12px" }}>
        Votre numero de commande : {data._id}
      </span>
      <span style={{ color: "grey", fontSize: "12px" }}>
        Merci, et a bientot !
      </span>
    </div>
  );
};

export default CheckoutForm;
