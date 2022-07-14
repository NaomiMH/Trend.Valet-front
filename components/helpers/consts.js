// Table names
// export const EmailList = "EmailList"
// export const LabelLog = "LabelLog"
// export const Users = "Users"
// export const Scanner = "Scanner"

// Attributes By table
const EmailList_Array = [
    "Email",
    "Name",
]
const LabelLog_Array = [
    "Label1",
    "Label2",
    "Label3",
    "Date",
    "Shift",
    "Result",
    "Username",
]
const Users_Array = [
    "Username",
    "Password",
    "Name",
    "Admin"
]
const Scanner_Array = [
    "Lectura",
    "Resultado",
    "Fecha"
]

// All Attributes
export const Attributes = {
    // Label Attributes
    Clave_Material: "Clave_Material",
    Pallet_Det: "Pallet",
    Fecha_Pallet: "Fecha_Pallet",
    Cantidad_Recibida: "Cantidad_Recibida",
    Fecha_Produccion: "Fecha_Produccion",
    Folio_Extra: "Folio_Extra",
    Lote: "Lote",

    // Mat Attributes
    Descripcion_Material: "Descripcion_Material",

    // Pal Attributes
    Fecha_Pallet: "Fecha_Pallet",
    // Clave_Material: "Clave_Material",
    Usuario: "Usuario",
    Cliente: "Cliente",
}
EmailList_Array.map((elem) => { Attributes[elem] = elem })
LabelLog_Array.map((elem) => { Attributes[elem] = elem })
Users_Array.map((elem) => { Attributes[elem] = elem })
Scanner_Array.map((elem) => { Attributes[elem] = elem })

// export const Get_Attributes = (table) => {
//     const obj = {}
//     obj[EmailList] = EmailList_Array
//     obj[LabelLog] = LabelLog_Array
//     obj[Users] = Users_Array
//     obj[Scanner] = Scanner_Array
//     obj["All"] = Object.keys(Attributes)
//     return obj[table]
// }