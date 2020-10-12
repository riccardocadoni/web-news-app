import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PRIMARY_COLOR } from "../constants/Colors";

import { useSelector } from "react-redux";
import { selectAuthenticated } from "../redux/authSlice";
import ExploreIcon from "@material-ui/icons/Explore";
import PersonIcon from "@material-ui/icons/Person";

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const isLoggedIn = useSelector(selectAuthenticated);
  return (
    <Nav>
      <NavHeader>
        <NavLeft>
          <MenuLink to="/feed">
            <Logo>Staging</Logo>
          </MenuLink>
        </NavLeft>
        {isLoggedIn ? (
          <>
           {/*  <NavCenter>
              <Input type="text" placeholder="Search" />
            </NavCenter> */}

            <NavRight>
              <MenuLink to="/explore">
                <ExploreIcon
                  style={{ color: PRIMARY_COLOR, margin: "5px" }}
                ></ExploreIcon>
              </MenuLink>
              <MenuLink to="/profile">
                <PersonIcon
                  style={{ color: PRIMARY_COLOR, margin: "5px" }}
                ></PersonIcon>
              </MenuLink>
            </NavRight>
          </>
        ) : null}
      </NavHeader>
    </Nav>
  );
};

export default Header;

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
  margin-left: 20px;
`;

const NavCenter = styled.div`
  flex-grow: 2;
  text-align: center;
  margin-left: 20px;
`;

const NavRight = styled.div`
  flex-grow: 1;
  text-align: right;
  margin-right: 20px;
`;

const Input = styled.input`
  font-size: 16px;
  border: solid 1px ${PRIMARY_COLOR};
  border-radius: 3px;
  color: ${PRIMARY_COLOR};
  padding: 7px 33px;
  border-radius: 3px;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;

  @media (max-width: 500px) {
    display: none;
  }

  &:active,
  &:focus {
    text-align: left;
  }
`;

const Logo = styled.p`
  font-weight: bold;
  color: ${PRIMARY_COLOR};
`;

const MenuLink = styled(Link)`
  text-decoration: none;
`;
