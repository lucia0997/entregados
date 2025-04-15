import { Header, Input } from '@airbus/components-react';
import { useTranslation } from 'react-i18next';
import './requestReference.css';

//TODO: input onChange

const RequestReference = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header title={t('common:title')} appName={t('common:title')} />
      <div className='referenceContainer'>
        <div className='referenceInput'>
          <Input
            placeholder={t('common:referenceInput')}
            // onChange={}
          />
        </div>
      </div>
    </>
  );
};

export default RequestReference;
