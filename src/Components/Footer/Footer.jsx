import React from "react";
import Paypal from "../../assets/paypal.webp";
import Visa from "../../assets/master-card.webp";

export default function Footer() {
  return (
    <footer className="bg-main-light">
      <div className="container pt-4">
        <div className="border-bottom d-flex flex-column flex-md-row justify-content-between align-items-center">
          <h5 className="pb-3 mb-2 mb-md-0 text-main fw-bold">
            Get connected with us on social networks:
          </h5>
          <div className="me-md-4 pb-3">
            <Link
              to="https://www.linkedin.com/in/mohamed-fawzzi98/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin fs-5 ps-4 cursor-pointer"></i>
            </Link>
            <Link
              to="https://github.com/Mohammed-Fawzzi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github fs-5 ps-4 cursor-pointer"></i>
            </Link>
            <Link
              to="https://www.facebook.com/mofawzzi14/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook-f fs-5 ps-4 cursor-pointer"></i>
            </Link>
            <Link
              to="https://x.com/muhammed_fawzzi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-x-twitter fs-5 ps-4 cursor-pointer"></i>
            </Link>
          </div>
        </div>

        <p className="pt-2">
          We will send you a link, open it on your phone to download the app
        </p>

        <form>
          <div className="row">
            <div className="col-md-9 mb-3 mb-md-0">
              <input type="text" className="form-control" placeholder="Email" />
            </div>
            <div className="col-md-3">
              <button className="btn text-white bg-main w-100">
                Share App Link
              </button>
            </div>
          </div>
        </form>

        <div className="py-3 d-flex flex-column flex-md-row justify-content-between align-items-center footer-image me-4 border-bottom">
          <h5 className="mb-3 mb-md-0 text-main fw-bold">Payment Partners</h5>
          <div>
            <img src={Paypal} alt="paypal" className="pe-3" />
            <img src={Visa} alt="visa" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-center pt-3 footer-rights">
            © All Rights Reserved{" "}
            <Link
              to="tel:+20121580334"
              rel="noopener noreferrer"
              target="_blank"
              className="fw-bold text-decoration-none text-main"
            >
              Mohamed Fawzzi.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
