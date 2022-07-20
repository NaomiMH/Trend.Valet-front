import language from "."

export const Message = {
    // Requerido
    Save: {
        spanish: "Los cambios han sido guardados",
        english: "Changes have been saved"
    }[language],

    // Personalizado
    FinishFirst: {
        spanish: "Termine para continuar",
        english: "Finish to continue"
    }[language],
    FirstLabel: {
        spanish: "Primera Etiqueta del Rollo",
        english: "First Roll Label"
    }[language],
    SecondLabel: {
        spanish: "Ultima Etiqueta del Rollo",
        english: "Last Roll Label"
    }[language],
    ThirdLabel: {
        spanish: "Etiqueta de la Ficha de Empaque",
        english: "Shipping Slip Label"
    }[language],
    Success: {
        spanish: "Se mando el email exitosamente",
        english: "The email was sent successfully"
    }[language],
    // FinishFirst: {
    //     spanish: "Termine para continuar",
    //     english: "Finish to continue"
    // }[language],
}