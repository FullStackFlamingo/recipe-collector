import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ErrorPage() {
  const { t } = useTranslation();
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>{t('errorPage.title')}</h1>
      <p>{t('errorPage.message')}</p>
      <p>{isRouteErrorResponse(error) ? <i>{error.statusText || error.error?.message}</i> : <i></i>}</p>
    </div>
  );
}
