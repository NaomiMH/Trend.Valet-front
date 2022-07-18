import { Attributes } from "../helpers/consts";

export function Scanner_Reading(event, { pallet, description } = {}) {
    const reading = event.target.value;
    // Reset value
    event.target.value = ""
    let temp = reading.split("|");
    // 8 | 9 = box
    // 7 | 8 = materia prima
    // 5 | 6 = pallet
    // 1 | 2 = location (if a location of length 1 is readed, it will be send as description)
    // 1 = description
    if (temp.length >= 7) {
        if (temp[6] == "" || temp[7] == "") {
            // Save the information and then send it to updateData
            const row = {}
            // Other information
            // 1 - P/Cliente
            // 3 - Purshase O.
            if (temp[0] != "") {
                row[Attributes.Descripcion_Material] = temp[0]
            }
            if (temp[2] != "") {
                row[Attributes.Clave_Material] = temp[2]
            }
            if (temp[4] != "") {
                row[Attributes.Cantidad_Recibida] = temp[4]
            }
            if (temp[5] != "") {
                row[Attributes.Lote] = temp[5]
            }
            let pos = 0
            if (temp[6] != "") {
                pos = 6
            } else if (temp[7] != "") {
                pos = 7
            }
            if (pos) {
                row[Attributes.Folio_Extra] = temp[pos].slice(0, temp[pos].indexOf("-"))
                if (temp[pos].length > 16) {
                    if (temp[pos].indexOf("_") > 0) {
                        row[Attributes.Fecha_Produccion] = temp[pos].slice(temp[pos].indexOf("-") + 1, temp[pos].indexOf("_"))
                    } else {
                        row[Attributes.Fecha_Produccion] = temp[pos].slice(temp[pos].indexOf("-") + 1)
                    }
                }
            }
            if (!row[Attributes.Descripcion_Material] || !row[Attributes.Clave_Material] || !row[Attributes.Cantidad_Recibida] || !row[Attributes.Folio_Extra] || !row[Attributes.Fecha_Produccion] || !row[Attributes.Lote]) {
                return ["error messy", temp, reading]
            }
            if (pallet) {
                // if active, add pallet
                if (Object.keys(pallet).length != 0) {
                    row[Attributes.Pallet_Det] = pallet
                }
            }
            // Return information
            return ["prime", row, reading]
        } else {
            const row = {}
            // Other information
            // 1 - Customer P/N
            // 3 - REV
            // 5 - Operador
            // 6 - Shift/Turno
            if (temp[0] != "") {
                row[Attributes.Descripcion_Material] = temp[0]
                // If saved first line of description
                if (description) {
                    row[Attributes.Descripcion_Material] = description + ' ' + row[Attributes.Descripcion_Material]
                }
            }
            if (temp[2] != "") {
                row[Attributes.Clave_Material] = temp[2]
            }
            if (temp[4] != "") {
                row[Attributes.Cantidad_Recibida] = temp[4]
            }
            let pos = 0
            if (temp[7]) {
                pos = 7
            } else {
                pos = 6
            }
            if (temp[pos] != "") {
                row[Attributes.Folio_Extra] = temp[pos].slice(0, temp[pos].indexOf("-"))
                if (temp[pos].length > 16) {
                    if (temp[pos].indexOf("_") > 0) {
                        row[Attributes.Fecha_Produccion] = temp[pos].slice(temp[pos].indexOf("-") + 1, temp[pos].indexOf("_"))
                    } else {
                        row[Attributes.Fecha_Produccion] = temp[pos].slice(temp[pos].indexOf("-") + 1)
                    }
                }
            }
            if (!row[Attributes.Descripcion_Material] || !row[Attributes.Clave_Material] || !row[Attributes.Cantidad_Recibida] || !row[Attributes.Folio_Extra] || !row[Attributes.Fecha_Produccion]) {
                return ["error messy", temp, reading]
            }
            if (pallet) {
                // if active, add pallet
                if (Object.keys(pallet).length != 0) {
                    row[Attributes.Pallet_Det] = pallet
                }
            }
            // return information
            return ["box", row, reading]
        }
    }
    if (temp.length >= 5) {
        // Save the information and then send it to updateData
        const row = {}
        if (temp[0] != "") {
            row[Attributes.Clave_Material] = temp[0]
        }
        if (temp[1] != "") {
            row[Attributes.Cliente] = temp[1]
        }
        if (temp[2] != "") {
            row[Attributes.Usuario] = temp[2]
        }
        if (temp[3] != "") {
            row[Attributes.Fecha_Pallet] = temp[3]
        }
        if (temp[4] != "") {
            row[Attributes.Pallet_Det] = temp[4]
        }
        if (!row[Attributes.Clave_Material] || !row[Attributes.Cliente] || !row[Attributes.Usuario] || !row[Attributes.Fecha_Pallet] || !row[Attributes.Pallet_Det]) {
            return ["error messy", temp, reading]
        }
        return ["pallet", row, reading]
    }
    if (temp.length == 1) {
        if (temp[0].length <= 4) {
            return ["location", temp[0], reading]
        }

        if (reading.length > 200) {
            return ["error unknown", reading.substring(0, 200), reading.substring(0, 200)]
        }
        
        return ["description", temp[0], reading]
    }
    if (temp.length == 2) {
        return ["location", temp[0], reading]
    }
    return ["error unknown", reading, reading]
}