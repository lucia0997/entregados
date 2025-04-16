import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./en/common.json";
import enErrors from "./en/errors.json"
import enRequest from "./en/request_reference/request_reference.json"
import enDownload from "./en/download_template/download_template.json"

const options: InitOptions = {
    resources: {
        en: {
            common: enCommon,
            errors: enErrors,
            request_reference: enRequest,
            download_template: enDownload
        },
    },
    lng: "en",
    fallbackLng: "en",
    ns: ["common", "errors", "request_reference", "download_template"],
    defaultNS: "common"
};

i18n.use(initReactI18next).init(options)