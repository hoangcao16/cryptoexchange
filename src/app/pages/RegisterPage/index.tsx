import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import RegisterContainer from 'app/container/RegisterContainer';
export function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Register Page</title>
        <meta
          name="description"
          content="A Boilerplate application Register page"
        />
      </Helmet>
      <RegisterContainer />
    </>
  );
}
