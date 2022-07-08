import Layout from '../../../components/Layout';
import Btn_Standard from '../../../components/buttons/btn_standard';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Table_Body from '../../../components/table/tb_body';
import { useEffect, useState } from 'react';
import { Mat_Rec_Det, Mat_Rec_Enc } from '../../../components/helpers/database';
import { Attributes } from '../../../components/helpers/consts';
import useSound from 'use-sound';
import { Alert_path, Alert_show } from '../../../components/alert/alert';
import { Fetch_Data_Exit } from '../../../components/fetch/fetch_data_exit';
import { Fetch_Next } from '../../../components/fetch/fetch_next';
import { Text } from '../../../components/text/text';
import { Message } from '../../../components/text/message';
import { Errors } from '../../../components/text/error';

const RecepcionId = () => {
    // Geting the id parameter
    const router = useRouter();
    const { query: { pid } } = router;

    // Save the information
    const [data, setData] = useState([]);
    // Save the resume
    const [resume, setResume] = useState([]);
    // Disable final button until condition
    const [disable, setDisable] = useState("disable");
    // Alert just one time
    const [flagAlert, setFlagAlert] = useState(false);
    // Save sound
    const [play] = useSound(Alert_path);
    // Width screen
    const [width, setWidth] = useState(undefined);

    if (typeof window != "undefined" && !width) {
        setWidth(window.screen.width)
    }

    function fetchData() {
        Fetch_Data_Exit(Mat_Rec_Det.byFolio(pid), play, setData, "/procesos/recepcion", setResume)
    }

    useEffect(() => {
        if (pid && data.length == 0 && parseInt(pid)) {
            fetchData()
        }
    })

    if (!pid) {
        return ""
    } else if (!parseInt(pid) && !flagAlert) {
        setFlagAlert(true)
        Alert_show(Errors.Url, play)
        Router.push({
            pathname: "/procesos/recepcion"
        })
        return ""
    }

    // Change the value of Cuadre Ok
    function changeCuadre(row) {
        let { tableData } = row;
        let Cuadre_Ok = row[Attributes.Cuadre_Ok]
        const updateData = [...data]
        updateData[tableData.id][Attributes.Cuadre_Ok] = "" + Cuadre_Ok == "1" ? 0 : 1
        setData(updateData)
        // Check if the Cuadre is completed
        const temp = updateData.filter((trow) => !("" + trow[Attributes.Cuadre_Ok] == "1"))
        if (temp.length == 0) {
            setDisable(null)
        } else {
            setDisable("disable")
        }
    }

    function nextDelete() {
        Alert_show(Message.Delete, play)
        setData([])
    }

    // Delete selected material
    function deleteMaterial(row) {
        const { tableData } = row
        const Folio_Recepcion = row[Attributes.Folio_Recepcion_Det]
        const Secuencia = row[Attributes.Secuencia_Det]
        const updateData = [...data]
        updateData.splice(tableData.id, 1)

        let razon = ""
        if (typeof window == "object") {
            razon = window.prompt(Message.Reason)
        } else {
            Alert_show(Errors.Window, play)
            return ""
        }


        if (razon.length == 0) {
            Alert_show(Errors.Reason, play)
            return ""
        }

        Fetch_Next(Mat_Rec_Det.delete(Folio_Recepcion, Secuencia), play, nextDelete, "delete", { data: { razon } })
    }

    function nextSave(data, { next }) {
        try {
            Alert_show(Message.Save, play)
            if (data.errors.length != 0) {
                let message = Message.ErrorsFound + " "
                for (const obj of data.errors) {
                    message = message + obj.object + ": " + obj.message + " | "
                }
                throw new Error(message);
            } else if (next instanceof Function) {
                next()
            }
            setData([])
        } catch (e) {
            Alert_show(e.message, play)
        }
    }

    // Save changes in the database
    function saveChange(pfun) {
        Fetch_Next(Mat_Rec_Det.put, play, nextSave, "put", { data }, { next: pfun })
    }

    function nextClose(data) {
        try {
            if (data.errors) {
                if (data.errors.length != 0) {
                    let message = Message.ErrorsFound + " "
                    for (const obj of data.errors) {
                        message = message + obj.object + ": " + obj.message + " | "
                    }
                    throw new Error(message);
                }
            }
            Alert_show(Message.Close, play)
            Router.push({
                pathname: "/procesos/recepcion"
            })
        } catch (e) {
            Alert_show(e.message, play)
        }
    }

    function saveClose() {
        Fetch_Next(Mat_Rec_Enc.put(pid), play, nextClose, "put")
    }

    function globalCuadre() {
        const updateData = data.map((row) => {
            row[Attributes.Cuadre_Ok] = 1
            return row
        })
        setData(updateData)
        setDisable(null)
    }

    // Selected headers (filtered by name)
    const headers = [
        "Secuencia_Det", "Clave_Material", "Fecha_Produccion", "Pallet_Det", "Fecha_Pallet_Det", "Cuadre_Ok", "Cantidad_Recibida", "Folio_Extra", "Lote"
    ];

    // Selected Actions (filtered by tooltip)
    const actions = [
        Text.Square, Text.Refresh, Text.GlobalSquare
    ];

    // Saving the Functions (key = actions tooltip)
    const dict_functions = {
        "editable": {
            onRowDelete: (row) => new Promise((res, rej) => {
                deleteMaterial(row)
                res([])
            })
        },
        "delete": "Regresar"
    }
    dict_functions[Text.Square] = changeCuadre
    dict_functions[Text.Refresh] = fetchData
    dict_functions[Text.GlobalSquare] = globalCuadre

    // Selected headers (filtered by name)
    const headers_resume = [
        "Clave_Material", "Count", "Amount"
    ];

    // Selected Actions (filtered by tooltip)
    const actions_resume = [];

    return (
        <Layout width={width}>
            <div className="my-3">
                <h1 className="text-2xl text-gray-800 font-light">{Text.Folio} #{pid}</h1>
                <div className='my-3'>
                    <div className='mb-3'>
                        <Table_Body
                            tableTitle={`${Text.Folio} ${pid} - ${Text.Resume}`}
                            tableData={resume}
                            listHeader={headers_resume}
                            listAccion={actions_resume}
                        />
                    </div>
                    <Table_Body
                        tableTitle={`${Text.Folio} ${pid}`}
                        tableData={data}
                        listHeader={headers}
                        listAccion={actions}
                        dictFunctions={dict_functions} //optional
                    />
                    <div className='mt-3 flex justify-between'>
                        <Btn_Standard btnName={Text.Save} btnClick={saveChange} btnDisable={!disable} />
                        <Btn_Standard btnName={Text.Finish} btnClick={() => saveChange(saveClose)} btnDisable={disable} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default RecepcionId