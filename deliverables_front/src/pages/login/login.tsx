import { Header } from '@airbus/components-react';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header title={t('common:title')} appName={t('common:title')} />
    </>
  );
};

export default Login;
