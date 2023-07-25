"use client";

import { Nav } from "../molecules/Nav";
import { Text } from "../molecules/Text";

const Navbar = () => {
  return (
    <Nav>
      <div>
        <a href="/">
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        </a>
      </div>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">My Collection</a>
        </li>
      </ul>
    </Nav>
  );
};

export default Navbar;
