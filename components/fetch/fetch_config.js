import { Alert_show } from "../alert/alert"
import { Attributes } from "../helpers/consts"
import { Conf } from "../helpers/database"
import { Errors } from "../text/error"

export function Fetch_Config({ play, setBox, setHours, setPosition, setSHours }) {
    if (!play) {
        alert(Errors.ParameterMissing("Fetch_Data_Exit", "play"))
        return
    }
    fetch(Conf.getAll)
        .then((res) => res.json())
        .then((res) => {
            // If server send an error message
            if (res.msg) {
                Alert_show(res.msg, play)
            } else {
                // Save variables
                if (setBox) {
                    setBox(res[Attributes.Cantidad_Maxima_Cajas])
                }
                if (setHours) {
                    setHours(res[Attributes.Horas_Maximo_Ubicacion])
                }
                if (setPosition) {
                    setPosition(res[Attributes.Default_Posiciones])
                }
                if (setSHours) {
                    setSHours(res[Attributes.Horas_Maximo_Embarque])
                }
            }
        })
        .catch((e) => Alert_show(Errors.FetchConnection, play))
}