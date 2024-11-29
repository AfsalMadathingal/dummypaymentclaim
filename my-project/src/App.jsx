import { useState } from "react";
import "./App.css";
import PaymentClaimForm from "./PaymentClaim";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PaymentClaimForm />
    </>
  );
}

export default App;
