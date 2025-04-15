import { Button, Header } from '@airbus/components-react';
import { useTranslation } from 'react-i18next';
import './downloadTemplate.css';

const DownloadTemplate = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header title={t('common:title')} appName={t('common:title')} />
      <div className='containerDownload'>
        <div className='downloadButtonsContainer'>
          <Button
            className='downloadButton'
            variant='primary'
            // onClick={}
          >
            {t('download_template:otherReference')}
          </Button>
          <Button
            className='downloadButton'
            variant='primary'
            // onClick={}
          >
            {t('download_template:download')}
          </Button>
        </div>
        <div className='downloadButtonsContainer'>
          <Button
            className='downloadButton'
                variant='primary'
            // onClick={}
          >
            {t('download_template:guide')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default DownloadTemplate;
