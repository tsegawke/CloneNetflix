import "./NotFound404.css";

export default function NotFound404() {
  return (
    <div className="notfound d-flex align-items-center justify-content-center text-center">
      <div className="content">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Page Not Found</h2>
        <p className="error-desc">
          Oops! The page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </p>
        <a href="/" className="btn btn-red btn-lg mt-3">
          Netflix Home
        </a>
      </div>

      {/* Glowing background shapes */}
      <div className="background-shapes">
        <span className="shape shape1"></span>
        <span className="shape shape2"></span>
        <span className="shape shape3"></span>
      </div>
    </div>
  );
}
