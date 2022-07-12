// Table names
// export const EmailList = "EmailList"
// export const LabelLog = "LabelLog"
// export const Users = "Users"

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

// All Attributes
export const Attributes = {}
EmailList_Array.map((elem) => { Attributes[elem] = elem })
LabelLog_Array.map((elem) => { Attributes[elem] = elem })
Users_Array.map((elem) => { Attributes[elem] = elem })

// export const Get_Attributes = (table) => {
//     const obj = {}
//     obj[EmailList] = EmailList_Array
//     obj[LabelLog] = LabelLog_Array
//     obj[Users] = Users_Array
//     obj["All"] = Object.keys(Attributes)
//     return obj[table]
// }