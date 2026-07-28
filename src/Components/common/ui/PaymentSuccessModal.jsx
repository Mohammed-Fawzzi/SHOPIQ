import React, { useEffect, useRef, useState } from "react";

const AUTO_CLOSE_SECONDS = 5;

export default function PaymentSuccessModal({ show, onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(AUTO_CLOSE_SECONDS);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!show) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [show]);

  useEffect(() => {
    if (!show) {
      setSecondsLeft(AUTO_CLOSE_SECONDS);
      return;
    }

    setSecondsLeft(AUTO_CLOSE_SECONDS);

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [show]);

  useEffect(() => {
    if (show && secondsLeft <= 0) {
      onCloseRef.current?.();
    }
  }, [show, secondsLeft]);

  if (!show) return null;

  return (
    <div
      className="payment-success-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paymentSuccessModalLabel"
      onClick={onClose}
    >
      <div
        className="payment-success-dialog shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center p-4 p-md-5">
          <div className="mb-3">
            <i className="fa-solid fa-circle-check text-main fs-1"></i>
          </div>
          <h4 className="text-main fw-bold mb-3" id="paymentSuccessModalLabel">
            Payment Successful
          </h4>
          <p className="mb-2 text-muted fs-5">
            Your order will be delivered soon
          </p>
          <p className="mb-4 text-muted">
            Closing in <span className="fw-bold text-main">{secondsLeft}</span>{" "}
            seconds
          </p>
          <button
            type="button"
            className="btn bg-main text-white px-4"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
