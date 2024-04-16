import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Payment = ({ amount, setMakePayment, handlePay }) => {
  const initialValues = {
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.cardNumber) {
      errors.cardNumber = "Card number is required";
    }
    if (!values.expirationDate) {
      errors.expirationDate = "Expiration date is required";
    }
    if (!values.cvv) {
      errors.cvv = "CVV is required";
    }
    // Add more validation rules as needed
    return errors;
  };

  const handleSubmit = (values) => {
    handlePay();
    setMakePayment(false);
  };

  return (
    <div className="relative w-[400px] min-h-[300px] max-w-screen max-h-screen bg-white rounded-[19px] p-4">
      <div
        className="absolute cursor-pointer right-4 top-4"
        onClick={() => setMakePayment(false)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="text-[20px] font-bold text-orange-600">Make Payment</div>
      <div className="text-[12px] text-gray">
        You will be paying the sum of{" "}
        <span className="text-orange-600">€{amount}</span>. Please fill in your
        card info to make your payment.
      </div>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4">
            <div className="mb-2">
              <label
                htmlFor="cardNumber"
                className="text-[11px] block text-gray-700"
              >
                Card Number
              </label>
              <Field
                type="text"
                id="cardNumber"
                name="cardNumber"
                className="border rounded p-1 mt-1 block w-full rounded border-gray-300"
              />
              <ErrorMessage
                name="cardNumber"
                component="small"
                className="text-[9px] text-red-500 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="mb-2">
                <label
                  htmlFor="expirationDate"
                  className="text-[11px] block text-gray-700"
                >
                  Expiration Date
                </label>
                <Field
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  className="border rounded p-1 mt-1 block w-full rounded border-gray-300"
                />
                <ErrorMessage
                  name="expirationDate"
                  component="small"
                  className="text-[9px] text-red-500 text-sm"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="cvv"
                  className="text-[11px] block text-gray-700"
                >
                  CVV
                </label>
                <Field
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="border rounded p-1 mt-1 block w-full rounded border-gray-300"
                />
                <ErrorMessage
                  name="cvv"
                  component="small"
                  className="text-[9px] text-red-500 text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
              disabled={isSubmitting}
            >
              Pay Now
            </button>
            <div className="text-[9px] text-gray-700 mt-4 text-center">
              This payment is been authnticated by G.Daniel as a test run for
              the project
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Payment;
