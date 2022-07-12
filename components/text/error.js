import language from "."
import { Text } from "./text"

const Admin = {
    spanish: "Requiere al Administrador de Sistemas.",
    english: "Requires System Administrator."
}


// const Temporary = {
//     spanish: "Temporal",
//     english: "Temporary"
// }

export const Errors = {
    Require: (param) => {
        return {
            spanish: "Se requiere " + param,
            english: param + "is required"
        }[language]
    },
    ParameterMissing: (func,param) => {
        return {
            spanish: "Falta el parametro " + param + " de la funcion " + func,
            english: "The parameter " + param + " of the function " + func + "is missing"
        }[language]
    },
    FetchConnection: {
        spanish: "Problemas con la conexion a la base de datos",
        english: "Problems connecting to the database"
    }[language]
    // Temporary: Temporary[language],
}