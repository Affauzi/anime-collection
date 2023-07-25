import styled from "@emotion/styled";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  padding: 10px 20px;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  ul {
    display: flex;
    list-style: none;
  }

  li {
    margin-right: 20px;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
  }
`;
