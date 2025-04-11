import { Header, Input } from '@airbus/components-react';

const Login = () => {
  return (
    <>
      {/* <Header title='Deliverables Assitant' appName='Deliverables Assistant' /> */}
      <div className='loginContainer'>
        <div className='loginLogoContainer'>
          <img
            className='loginLogo'
            src='images/logos/AIRBUS_Blue.png'
            alt='airbusbluelogo'
          />
        </div>
        <div className='loginInputs'>
          <Input
            placeholder='User'
            //   onChange={}
          />
          
        </div>
      </div>
    </>
  );
};

export default Login;
