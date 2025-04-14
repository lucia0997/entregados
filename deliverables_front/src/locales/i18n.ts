import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./en/common.json";
import enErrors from "./en/errors.json"

const options: InitOptions = {
    resources: {
        en: {
            common: enCommon,
            errors: enErrors
        },
    },
    lng: "en",
    fallbackLng: "en"
};

i18n.use(initReactI18next).init(options)