import { Button, Header, Input } from '@airbus/components-react';
import { useTranslation } from 'react-i18next';
import './requestReference.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XMLParser } from 'fast-xml-parser';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

interface Fila {
  fecha: string;
  actividad: string;
  nota: string;
}

interface Metadatos {
  nombre: string;
  asignatura: string;
  version: string;
}

interface Informe {
  referencia: string;
  plantilla: string;
  metadatos: Metadatos;
  resultados: {
    fila: Fila[] | Fila;
  };
}

const RequestReference = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [referenceInput, setReferenceInput] = useState('');
  const [informe, setInforme] = useState<{
    metadatos: {
      nombre: string;
      asignatura: string;
      version: string;
    };
    resultados: {
      fecha: string;
      actividad: string;
      nota: string;
    }[];
  } | null>(null);;
  const [error, setError] = useState('');

  const onSubmitReference = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/parsed_data.xml');
    const xmlText = await response.text();

    const parser = new XMLParser();
    const json = parser.parse(xmlText);

    const informes: Informe[] = Array.isArray(json.informes.informe)
      ? json.informes.informe
      : [json.informes.informe];

    const resultado = informes.find((i) => i.referencia === referenceInput);

    if (resultado) {
      const data = {
        metadatos: {
          nombre: resultado.metadatos.nombre,
          asignatura: resultado.metadatos.asignatura,
          version: resultado.metadatos.version,
        },
        resultados: Array.isArray(resultado.resultados.fila)
          ? resultado.resultados.fila.map((f: any) => ({
              fecha: f.fecha,
              actividad: f.actividad,
              nota: f.nota,
            }))
          : [],
      };
      setInforme(data);
    } else {
      setError('No se encontró ningún informe con esta referencia');
    }
  };

  const generateDocx = async (informe: Informe) => {
    try {
      const response = await fetch('/templates/example/basic_example.docx');
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();

      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      console.log('informe', informe);
      
      doc.setData(informe);

      doc.render();

      const out = doc.getZip().generate({
        type: 'blob',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      saveAs(out, `Informe_${informe.referencia}.docx`);
    } catch (error) {
      console.error('Error al generar el documento');
      setError('Error al generar el documento');
    }
  };

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
          <Button variant='primary' onClick={onSubmitReference}>
            {t('request_reference:referenceButton')}
          </Button>
        </div>
        {informe ? (
          <div className='result'>
            <h2>Informe encontrado:</h2>
            <pre>{JSON.stringify(informe, null, 2)}</pre>
            <div className='referenceButton'>
              <Button variant='primary' onClick={() => navigate(-1)}>
                Volver
              </Button>
            </div>
          </div>
        ) : (
          <div className='result'>
            <span>{error}</span>
          </div>
        )}
        {informe && (
          <Button variant='primary' onClick={() => generateDocx(informe)}>
            Descargar Plantilla
          </Button>
        )}
      </div>
    </>
  );
};

export default RequestReference;
