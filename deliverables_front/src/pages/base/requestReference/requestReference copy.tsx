import { Button, Header, Input } from '@airbus/components-react';
import { useTranslation } from 'react-i18next';
import './requestReference.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//TODO: input onChange

const RequestReference = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [referenceInput, setReferenceInput] = useState('');

  const onSubmitReference = () => {
    console.log('reference', referenceInput);
    //TODO: function to search for metadata and corresponding template
    navigate('/download-template')
  }

  return (
    <>
      <Header title={t('common:title')} appName={t('common:title')} />
      <div className='referenceContainer'>
        <div className='referenceInput'>
          <Input

            placeholder={t('request_reference:referenceInput')}
            onChange={(e) => setReferenceInput(e.target.value)}
          />
        </div>
        <div className='referenceButton'>
          <Button
          variant='primary' 
          onClick={onSubmitReference}
          >{t('request_reference:referenceButton')}</Button>
        </div>
      </div>
    </>
  );
};

export default RequestReference;
