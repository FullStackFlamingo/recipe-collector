import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{isRouteErrorResponse(error) ? <i>{error.statusText || error.error?.message}</i> : <i></i>}</p>
    </div>
  );
}
