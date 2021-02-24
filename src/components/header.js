import { Link } from "gatsby"
import { navigate } from "gatsby";
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { getUser, isLoggedIn, logout } from "../utils/auth"
import firebase from "gatsby-plugin-firebase"


const Header = ({ siteTitle }) => {
  function onLogOut() {
    logout(firebase).then(() => navigate(`/app/login`));
  }

  return <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <span style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {isLoggedIn() ? "Hello " + getUser().displayName : ""}
        </Link>
      </span>
      {isLoggedIn() && <button onClick={onLogOut}>"Log out"</button>}
    </div>
  </header>
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
