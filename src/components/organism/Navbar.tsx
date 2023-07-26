"use client";

import { useRouter } from "next/navigation";
import { Nav } from "../molecules/Nav";

const Navbar = () => {
  const router = useRouter();
  return (
    <Nav>
      <div>
        <a onClick={() => router.push("/")}>
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
        </a>
      </div>
      <ul>
        <li>
          <a onClick={() => router.push("/")}>Home</a>
        </li>
        <li>
          <a onClick={() => router.push("/collection")}>My Collection</a>
        </li>
      </ul>
    </Nav>
  );
};

export default Navbar;
