import getpass
import ssl
import urllib3

def get_doc_by_ref(user, password, ref):
    # Configurar SSL para permitir claves pequeñas (SECLEVEL=1)
    ssl_context = ssl.create_default_context()
    ssl_context.set_ciphers("DEFAULT@SECLEVEL=1")

    # Cabeceras de la petición
    headers = {
        "Content-Type": "text/xml"
    }

    # URL del servicio FileNet
    #wsdl_url = "https://ce-int.dmsfilenet.intra.casa.corp:9443/wsi/FNCEWS40MTOM/"
    wsdl_url = "https://ce.dmsfilenet.intra.casa.corp/wsi/FNCEWS40MTOM/"

    # XML de la petición SOAP
    soap_request = f"""<soapenv:Envelope xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <soapenv:Header>
            <Security xmlns="http://schemas.xmlsoap.org/ws/2002/12/secext">
                <hd:UsernameToken xmlns:hd="http://schemas.xmlsoap.org/ws/2002/12/secext">
                    <hd:Username>{user}</hd:Username>
                    <hd:Password>{password}</hd:Password>
                </hd:UsernameToken>
            </Security>
        </soapenv:Header>
        <soapenv:Body>
        <ExecuteSearchRequest continuable="false" xsi:type="ns1:RepositorySearch">
                <SearchScope xmlns="" objectStore="DMS_Airbus_Military" xsi:type="ns1:ObjectStoreScope"> </SearchScope>
                <SearchSQL xmlns="" xsi:type="xsd:string">SELECT d.* FROM Document d WHERE (d.dms_pt_numero_documento={ref})</SearchSQL>       
            </ExecuteSearchRequest>
        </soapenv:Body>
    </soapenv:Envelope>""";




    # Crear el manejador HTTP con SSL
    http = urllib3.PoolManager(ssl_context=ssl_context)

    # Hacer la petición POST
    response = http.request("POST", wsdl_url, body=soap_request, headers=headers)

    xml_respuesta = ''
    # Obtener y mostrar la respuesta
    if response.status == 200:
        print("Respuesta exitosa")
        xml_respuesta = response.data.decode("utf-8")
        xml_respuesta = xml_respuesta.replace("</Property>","</Property>\n")
        xml_respuesta = xml_respuesta.replace("</Object>","</Object>\n")
        #f = open("response.xml", "a")
        #f.write(xml_respuesta)
        #f.close()
        
    else:
        print(f"Error dgg {response.status}: {response.data.decode('utf-8')}")

    return xml_respuesta
