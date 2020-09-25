import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

const NavHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const NavLeft = styled.div`
  flex-grow: 1;
  margin: 20px;
`;

const NavCenter = styled.div`
  flex-grow: 2;
  text-align: center;
  margin: 20px;
`;

const NavRight = styled.div`
  flex-grow: 1;
  text-align: right;
  margin: 20px;
`;

const Input = styled.input`
  font-size: 16px;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  color: #262626;
  padding: 7px 33px;
  border-radius: 3px;
  color: #999;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;

  @media (max-width: 400px) {
    display: none;
  }

  &:active,
  &:focus {
    text-align: left;
  }
`;

const MenuLink = styled(Link)`
  color: red;
`;

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <Nav>
      <NavHeader>
        <NavLeft>Staging</NavLeft>

        <NavCenter>
          <Input type="text" placeholder="Search" />
        </NavCenter>

        <NavRight>
          <MenuLink to="/feed">Feed</MenuLink>

          <Link to="/profile">profile</Link>

          <Link to="/explore">explore</Link>
        </NavRight>
      </NavHeader>
    </Nav>
  );
};

export default Header;
