import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="menu">
      <h2>Jakieś śmieszne menu</h2>
      <ul>
        <Link to="/">
          <li>About page</li>
        </Link>
        <Link to="/galleries">
          <li>Galleries list page</li>
        </Link>
        <Link to="/contact">
          <li>Contact page</li>
        </Link>
      </ul>
    </div>
  );
}

export default Menu;
