import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// import Toggle from 'app/components/ChangeTheme/Toggler';
import HomeContainer from 'app/container/HomeContainer';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <HomeContainer />
    </>
  );
}
