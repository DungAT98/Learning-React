import { useRouteError } from "react-router-dom";
import React from "react";

const ErrorPages = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </>
  );
};

export default ErrorPages;
