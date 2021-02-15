import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { getUserInfo } from "../api/userInfo"
import { isLoggedIn } from "../utils/auth"

const IndexPage = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    async function fetchMyAPI() {
      const result = await getUserInfo();

      setUserInfo(result);
    }

    fetchMyAPI();
  }, [isLoggedIn()]);

  return <Layout>
    <SEO title="Home" />
    <h1>{userInfo}</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
}

export default IndexPage
