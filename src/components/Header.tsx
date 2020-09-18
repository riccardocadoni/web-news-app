import React from "react";
import { Link } from "react-router-dom";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <ul>
      <li style={{ margin: 0, padding: 0 }}>
        <Link to="/feed">Feed</Link>
      </li>
      <li>
        <Link to="/profile">profile</Link>
      </li>
      <li>
        <Link to="/explore">explore</Link>
      </li>
    </ul>
  );
};

export default Header;
