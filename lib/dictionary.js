// import {Locale} from '@i18n.config'
const dictionaries={
    en:()=>import('@dictionaries/en.json').then(module=>module.default),
    ar:()=>import('@dictionaries/ar.json').then(module=>module.default)
}
const getDictionary=async(locale)=>dictionaries[locale]();
export default getDictionary;