import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// import Toggle from 'app/components/ChangeTheme/Toggler';
import HomeContainer from 'app/container/HomeContainer';
import FooterSticky from 'app/components/FooterSticky';
export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page | Trading View</title>
        <meta name="description" content="Home page Trading View Web" />
      </Helmet>
      <HomeContainer />
      <FooterSticky />
    </>
  );
}
