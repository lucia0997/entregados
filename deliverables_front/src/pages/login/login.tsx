import { Button, Header, Input } from '@airbus/components-react';
import { useTranslation } from 'react-i18next';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [redirect, setRedirect] = useState('');
  const [userNameInput, setUserNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // const { setAuthenticated } = useTask()

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
    }
  }, [redirect]);

  // useEffect(() => {
  //   setAuthenticated(false)
  // }, [])

  const login = () => {
    console.log('click');

    //TODO: function to send data and log in
  };

  return (
    <>
      <Header title={t('common:title')} appName={t('common:title')} />
      <div className='loginContainer'>
        <div className='loginLogoContainer'>
          <img
            className='loginLogo'
            src='images/logos/AIRBUS_Blue.png'
            alt='airbusbluelogo'
          />
        </div>
        <div className='logoInputs'>
          <Input
            placeholder={t('common:user')}
            onChange={(e) => {
              setUserNameInput(e.target.value);
              console.log('user', userNameInput);
            }}
          />
          <Input
            type='password'
            placeholder={t('common:password')}
            onChange={(e) => {
              setPasswordInput(e.target.value);
              console.log('password', passwordInput);
            }}
          />
          {loginError && (
            <span className='loginError'>
              {t('errors:loginError')} <br />
              {t('errors:persistentLoginError')}
            </span>
          )}
        </div>
        <div className='loginButton'>
          <Button variant='primary' onClick={login}>
            {t('common:login')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
