import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notFound">
      <h2>Sorry!</h2>
      <p>This page cannot be found</p>
      <br />
      <Link to="/">
        Click here to back to the <b>Chat</b>
      </Link>
    </div>
  );
};

export default NotFound;
