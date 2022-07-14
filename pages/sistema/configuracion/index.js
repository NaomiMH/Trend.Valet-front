import Layout from '../../../components/Layout';
import Form_standard from '../../../components/form/form_standard';
import * as Yup from 'yup';
import { Attributes } from '../../../components/helpers/consts';
import { useEffect, useState } from 'react';
import { Alert_path, Alert_show } from '../../../components/alert/alert';
import useSound from 'use-sound';
import { Conf } from '../../../components/helpers/database';
import { Fetch_Config } from '../../../components/fetch/fetch_config';
import { Fetch_Next } from '../../../components/fetch/fetch_next';
import { Text } from '../../../components/text/text';
import { Message } from '../../../components/text/message';
import { Errors } from '../../../components/text/error';

const Configuration = () => {
    // Set variables
    const [position, setPosition] = useState("")
    const [box, setBox] = useState("")
    const [hours, setHours] = useState("")
    const [shours, setSHours] = useState("")
    // Empty data (dont reload)
    const [empty, setEmpty] = useState(false)
    // Save sound
    const [play] = useSound(Alert_path);
    // Width screen
    const [width, setWidth] = useState(undefined);

    if (typeof window != "undefined" && !width) {
        setWidth(window.screen.width)
    }

    function fetchData() {
        // Fetch_Config({ play, setBox, setHours, setPosition, setSHours })
    }

    // Load the data
    useEffect(() => {
        if ((!position || !box || !hours || !shours) && !empty) {
            setEmpty(true)
            fetchData()
        }
    })

    if (!position || !box || !hours || !shours) {
        return ""
    }
    let inipos = position
    let inibox = box
    let inihours = hours
    let inishours = shours

    // Values for the Form
    // const FormValues = [
    //     {
    //         name: Attributes.Default_Posiciones,
    //         initialValue: inipos,
    //         validation: Yup.number().min(1, Errors.MinNumber).required(Errors.EnterParameter(Text.MaxPositions)),
    //         text: Message.Positions,
    //         placeholder: Text.Positions,
    //         type: "number"
    //     },
    //     {
    //         name: Attributes.Cantidad_Maxima_Cajas,
    //         initialValue: inibox,
    //         validation: Yup.number().min(1, Errors.MinNumber).required(Errors.EnterParameter(Text.MaxBox)),
    //         text: Message.Boxes,
    //         placeholder: Text.Boxes,
    //         type: "number"
    //     },
    //     {
    //         name: Attributes.Horas_Maximo_Ubicacion,
    //         initialValue: inihours,
    //         validation: Yup.number().min(1, Errors.MinNumber).required(Errors.EnterParameter(Text.HoursLimit)),
    //         text: Message.Hours(Text.Location),
    //         placeholder: Text.Hours,
    //         type: "number"
    //     },
    //     {
    //         name: Attributes.Horas_Maximo_Embarque,
    //         initialValue: inishours,
    //         validation: Yup.number().min(1, Errors.MinNumber).required(Errors.EnterParameter(Text.HoursLimit)),
    //         text: Message.Hours(Text.Audit),
    //         placeholder: Text.Hours,
    //         type: "number"
    //     }
    // ]

    function nextSubmit(data) {
        if (data.msg) {
            Alert_show(data.msg, play)
        } else {
            Alert_show(Message.Save, play)
        }
        fetchData()
    }

    // Sumbit function
    function fSumbit(valores) {
        const putData = {};
        putData[Attributes.Default_Posiciones] = valores[Attributes.Default_Posiciones]
        putData[Attributes.Cantidad_Maxima_Cajas] = valores[Attributes.Cantidad_Maxima_Cajas]
        putData[Attributes.Horas_Maximo_Ubicacion] = valores[Attributes.Horas_Maximo_Ubicacion]
        putData[Attributes.Horas_Maximo_Embarque] = valores[Attributes.Horas_Maximo_Embarque]

        Fetch_Next(Conf.put, play, nextSubmit, "put", { data: putData })

    }

    return (
        <Layout width={width}>
            <div className="my-3">
                <h1 className="text-2xl text-gray-800 font-light">{Text.Settings}</h1>
                <div className='my-3'>
                    {/* <Form_standard
                        FlistValues={FormValues}
                        FonSubmit={fSumbit}
                        FNombre={Text.Save}
                    /> */}
                </div>
            </div>
        </Layout>
    )
}

export default Configuration