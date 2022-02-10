import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// import Toggle from 'app/components/ChangeTheme/Toggler';
import HomeContainer from 'app/container/HomeContainer';
import FooterSticky from 'app/components/FooterSticky';
import { useParams } from 'react-router-dom';
export function HomePage() {
  let { pair } = useParams();
  // save LocalStorage pair
  React.useEffect(() => {
    const findIndex: any = pair?.indexOf('_');
    const changeFormatPair = `${pair?.substring(
      0,
      findIndex,
    )}/${pair?.substring(findIndex + 1)}`;
    localStorage.setItem('pair', changeFormatPair);
  }, [pair]);
  console.log(pair);
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
