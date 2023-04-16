import { FC, FormEventHandler, useState } from "react";

type PaymentInfo = {
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

interface PaymentFormProps {
  onSubmit: (paymentInfo: PaymentInfo) => void;
}

const PaymentForm: FC<PaymentFormProps> = ({ onSubmit }) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (event: any) => {
    setPaymentInfo({
      ...paymentInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(paymentInfo);
  };

  return (
    <div>
      <h2>Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name on card:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <br />
        <label>
          Card number:
          <input type="text" name="cardNumber" onChange={handleChange} />
        </label>
        <br />
        <label>
          Expiration date:
          <input type="text" name="expirationDate" onChange={handleChange} />
        </label>
        <br />
        <label>
          CVV:
          <input type="text" name="cvv" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PaymentForm;
