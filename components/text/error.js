import language from "."

const Admin = {
    spanish: "Requiere al Administrador de Sistemas.",
    english: "Requires System Administrator."
}


// const Temporary = {
//     spanish: "Temporal",
//     english: "Temporary"
// }

export const Errors = {
    // Requerido
    Require: (param) => {
        return {
            spanish: "Se requiere " + param,
            english: param + "is required"
        }[language]
    },
    ParameterMissing: (func, param) => {
        return {
            spanish: "Falta el parametro " + param + " de la funcion " + func,
            english: "The parameter " + param + " of the function " + func + "is missing"
        }[language]
    },
    FunctionMissing: (tooltip) => {
        return {
            spanish: "No se envio funcion para " + tooltip,
            english: "No function send for " + tooltip
        }[language]
    },
    FetchConnection: {
        spanish: "Problemas con la conexion a la base de datos",
        english: "Problems connecting to the database"
    }[language],
    EmptyData: {
        spanish: "No se encontro informacion a mostrar",
        english: "No data was found"
    }[language],
    MissingData: {
        spanish: "Faltan datos",
        english: "Missing data"
    }[language],
    ErrorLabel: {
        spanish: "AVISO: Etiqueta invalida. Realice un test de la Etiqueta.",
        english: "WARNING: Invalid tag. Take a test of the Label."
    }[language],
    Permission: {
        spanish: "Necesita permiso para continuar. Utilice una cuenta de administrador.",
        english: "You need permission to continue. Use an administrator account."
    }[language],
    Protected: {
        spanish: "Informacion protegida.",
        english: "Protected information."
    }[language],

    // Personalizado
    MissingEmails: {
        spanish: "No hay emails registrados",
        english: "There are no registered emails"
    }[language],
    // Temporary: Temporary[language],
}