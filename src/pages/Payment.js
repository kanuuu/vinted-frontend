import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51M4OnCIDVM9eLDJt1OgNBatlvU5Qibr3xqBzw6bQm2LgxSyIaprYZ1qXAazP0NnrDq1BtExHk573ztrTxMu9DonG00BCP1OBqR"
);

const Payment = ({ token, user }) => {
  const location = useLocation();
  const { title, price, id, owner } = location.state;

  return token ? (
    <div className="payment-page">
      <div className="payment-card container">
        <div className="payment-title">
          <p>Resume de la commande</p>
        </div>
        <div className="payout">
          <div className="payout-info">
            <p>Commande</p>
            <span>$ {price.toFixed(2)}</span>
          </div>
          <div className="payout-info">
            <p>Frais protection acheteurs</p>
            <span>$ 0.40</span>
          </div>
          <div className="payout-info">
            <p>Frais de port</p>
            <span>$ 0.80</span>
          </div>
        </div>
        <div className="total-payout payout-info">
          <p>Total</p>
          <span>$ {(price + 1.2).toFixed(2)}</span>
        </div>
        <div className="payment-informations">
          <p>
            Il ne vous reste plus qu'une etape pour vous offrir{" "}
            <span style={{ fontWeight: "bold" }}>{title}</span>. Vous allez
            payer{" "}
            <span style={{ fontWeight: "bold" }}>
              $ {(price + 1.2).toFixed(2)}
            </span>{" "}
            (frais de protection et frais de port inclus).
          </p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            token={token}
            title={title}
            user={user}
            price={price}
            id={id}
            owner={owner}
          />
        </Elements>
      </div>
    </div>
  ) : (
    <Navigate to="/connect" />
  );
};

export default Payment;
