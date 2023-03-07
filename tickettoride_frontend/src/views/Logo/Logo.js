import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import "../../css/Logo.css";

export function Logo() {
  return (
    <Link to="/">
      <img src={logo} className="logo" alt="logo" />
    </Link>
  );
}
