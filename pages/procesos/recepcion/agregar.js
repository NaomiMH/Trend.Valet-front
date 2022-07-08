import Layout from '../../../components/Layout';
import Btn_Standard from '../../../components/buttons/btn_standard';
import Table_Body from '../../../components/table/tb_body';
import In_standard from '../../../components/input/in_standard';
import { useState } from 'react';
import { Attributes } from '../../../components/helpers/consts';
import { Mat_Rec_Det, Pal, Scanner } from '../../../components/helpers/database';
import useSound from 'use-sound';
import { Alert_path, Alert_show } from '../../../components/alert/alert';
import { Fetch_Next } from '../../../components/fetch/fetch_next';
import { Scanner_Reading } from '../../../components/scanner/scanner_reading';
import { Text } from '../../../components/text/text';
import { Message } from '../../../components/text/message';
import { Errors } from '../../../components/text/error';
import Get_Position from '../../../components/helpers/get_position';

const RecepcionAgregar = () => {
    // Active scanner
    const [pallet, setPallet] = useState({});
    // Count pallets
    const [palletNum, setPalletNum] = useState(1);
    // Object of pallet information
    const [palletInfo, setPalletInfo] = useState({ 1: { "Cantidad": 0 } });
    // Table data
    const [data, setData] = useState([]);
    // Errors
    const [errors, setErrors] = useState([]);
    // Folio
    const [folio, setFolio] = useState([]);
    // Part
    const [part, setPart] = useState(0);
    // First line description
    const [description, setDescription] = useState("");
    // Save sound
    const [play] = useSound(Alert_path);

    // Get the scanner reading
    function saveChange(event) {
        const [type, info, reading] = Scanner_Reading(event, { pallet, description })
        const postData = {}
        postData[Attributes.Lectura] = reading
        postData[Attributes.Resultado] = type
        Fetch_Next(Scanner.post, play, () => {}, "post", { data: postData })
        if (type == "description") {
            setDescription(info)
        } else {
            setDescription("")
        }
        if (type == "error messy") {
            Alert_show(Errors.Messy, play)
            Alert_show(info, play)
        } else if (type == "error unknown") {
            Alert_show(Errors.Unknown, play)
            Alert_show(info, play)
        } else if (type == "location") {
            Alert_show(Errors.InvalidLabel, play)
        } else if (type == "box" || type == "prime") {
            updateData(info)
        } else if (type == "pallet") {
            // check that pallet has no location
            updatePallet(info)
        }
    }

    function nextUpdate(data, { newPallet }) {
        try {
            if (data.length > 1) {
                throw new Error(Errors.Inconsistency)
            }
            if (data.length == 0) {
                data = [newPallet]
            } else if (data[0][Attributes.Clave_Localidad]) {
                throw new Error(Errors.NeedNewMaster)
            }
            data[0][Attributes.Fecha_Pallet] = data[0][Attributes.Fecha_Pallet].slice(0, Get_Position(data[0][Attributes.Fecha_Pallet], ".", 1)).replace('T', ' ')
            if (data[0][Attributes.Pallet]) {
                data[0][Attributes.Pallet_Det] = data[0][Attributes.Pallet]
            }
            setPallet(data[0])
        } catch (e) {
            Alert_show(e.message, play)
        }
    }

    function updatePallet(newPallet) {
        let temp = newPallet[Attributes.Fecha_Pallet].replace('/', '-').replace('/', '-')
        Fetch_Next(Pal.byPal(newPallet[Attributes.Pallet_Det], temp), play, nextUpdate, "get", {}, { newPallet })
    }

    // Save the reading in the table
    function updateData(newRow) {
        // Check if the Fecha_Produccion is unique
        let temp = data.filter((rows) => rows[Attributes.Fecha_Produccion] == newRow[Attributes.Fecha_Produccion] && rows[Attributes.Folio_Extra] == newRow[Attributes.Folio_Extra])
        if (temp.length == 0) {
            // Add it to pallet information
            const updatePallet = palletInfo
            if (palletInfo[palletNum][newRow[Attributes.Clave_Material]] == undefined) {
                updatePallet[palletNum][newRow[Attributes.Clave_Material]] = { "Cajas": 0, "Piezas": 0 }
            }
            updatePallet[palletNum][newRow[Attributes.Clave_Material]]["Cajas"] = updatePallet[palletNum][newRow[Attributes.Clave_Material]]["Cajas"] + 1
            console.log(Number(newRow[Attributes.Cantidad_Recibida].replace(",",".")))
            updatePallet[palletNum][newRow[Attributes.Clave_Material]]["Piezas"] = updatePallet[palletNum][newRow[Attributes.Clave_Material]]["Piezas"] + Number(newRow[Attributes.Cantidad_Recibida].replace(",","."))
            updatePallet[palletNum]["Cantidad"] = updatePallet[palletNum]["Cantidad"] + 1
            setPalletInfo(updatePallet)
            
            // Save Pallet information in material
            newRow["PalletNum"] = palletNum

            // Save
            const updateData = [...data, newRow];

            setData(updateData);
        } else {
            Alert_show(Errors.Repeated, play)
        }
    }

    // Delete selected material
    function deleteMaterial(row) {
        const { tableData } = row
        const updateData = [...data]
        updateData.splice(tableData.id, 1)
        setData(updateData)
    }

    function changePallet() {
        const temp = palletNum + 1
        const updatePallet = palletInfo
        updatePallet[temp] = { "Cantidad": 0 }
        setPalletNum(temp)
        setPalletInfo(updatePallet)
        setPallet({})
    }

    function nextSave(data) {
        setFolio(data.Folio)
        setErrors(data.errors)
        setPart(1)
    }

    function resetValues() {
        // Reset values if finish
        setData([])
        setPallet({})
        setPalletNum(1)
        setPalletInfo({ 1: { "Cantidad": 0 } })
        setPart(0)
    }

    // Save the new data in the database
    function saveData() {
        if (data.length != 0) {
            Fetch_Next(Mat_Rec_Det.post, play, nextSave, "post", { data })
        } else {
            Alert_show(Errors.MissingData, play)
        }
    }

    // Selected headers (filtered by name)
    const headers = [
        "Clave_Material", "Descripcion_Material", "Cantidad_Recibida", "Fecha_Produccion_Completa", "Lote", "Pallet_Especial"
    ];

    const dict_functions = {
        "editable": {
            onRowDelete: (row) => new Promise((res, rej) => {
                deleteMaterial(row)
                res([])
            })
        }
    }

    return (
        <Layout width={399}>
            <div className="my-3">
                <h1 className="text-2xl text-gray-800 font-light">{Text.ReceiveMaterials}</h1>
                <div className='my-3'>
                    {part == 0 ? (
                        <>
                            <label>{Text.Scann} {Text.Material}</label>
                            <p className='font-light'>{Message.ActiveMaster}</p>
                            <div className='my-3'>
                                <In_standard
                                    inName={"etiqueta"}
                                    inPlaceHolder={Text.SelectScann}
                                    onChange={saveChange} />
                            </div>
                            {/* <p>{Attributes.Pallet_Det}: {palletNum} - {Text.AmountBoxes} {palletInfo[palletNum]["Cantidad"]}</p> */}
                            {/* <Btn_Standard btnName={Text.Change + " " + Attributes.Pallet_Det} btnClick={changePallet} /> */}
                            {Object.keys(pallet).length != 0 ? (
                                <div className='mb-3'>
                                    <p>{Message.SomthingActive(Text.MasterLabel)}: {pallet[Attributes.Pallet_Det] ? pallet[Attributes.Pallet_Det] + " - " + pallet[Attributes.Fecha_Pallet] : Text.None}</p>
                                    <p className='font-light'>{Message.DeactiveMaster}</p>
                                    <Btn_Standard btnName={Text.DeactiveMaster} btnClick={() => setPallet({})} />
                                </div>
                            ) : null}
                            <Table_Body
                                tableTitle={Text.ReceiveMaterials}
                                tableData={data}
                                listHeader={headers}
                                listAccion={[]}
                                dictFunctions={dict_functions} //optional
                                btoolbar={false}
                            />
                            <div className='mt-3 text-right'>
                                <Btn_Standard btnName={Text.Finish} btnClick={saveData} />
                            </div>
                        </>
                    ) : (
                        <>
                            <p className='font-bold'>
                                {Text.Resume}
                            </p>
                            {/* <div className='border-t-2 my-2 py-2'>
                                <p className='font-bold'>{Attributes.Pallet_Det} {Text.Resume}</p>
                                <p className='font-bold'>{Message.PalletWarnning}</p>
                                {
                                    Object.keys(palletInfo).map((key) => {
                                        return (
                                            <>
                                                <p>{Attributes.Pallet_Det} #{key}</p>
                                                {
                                                    Object.keys(palletInfo[key]).map((key2) => {
                                                        return (
                                                            <>
                                                                {key2 != "Cantidad" ? (
                                                                    <p>{Text.Material} {key2}: {Text.Amount} {palletInfo[key][key2]["Cajas"]} - {Text.Total} {palletInfo[key][key2]["Piezas"]}</p>
                                                                ) : null}
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                        )
                                    })
                                }
                            </div> */}
                            <div className='border-y-2 my-2 py-2'>
                                <p className='font-bold'>{Message.ChangesSaved}</p>
                                {
                                    data
                                        .filter((row) => {
                                            return errors.every((err) => !(row[Attributes.Fecha_Produccion] == err.object[0] && row[Attributes.Folio_Extra] == err.object[1]))
                                        })
                                        .map((row) => {
                                            return (
                                                <>
                                                    <p>{Text.Material}: {row[Attributes.Clave_Material]} - {row[Attributes.Folio_Extra]} - {row[Attributes.Fecha_Produccion]}</p>
                                                    <p>{row[Attributes.Descripcion_Material] || Errors.MissingData}</p>
                                                </>
                                            )
                                        })
                                }
                            </div>
                            <p className='font-bold'>
                                {errors.length != 0 ? Message.ErrorsFound : Message.NoErrors}
                            </p>
                            {
                                errors
                                    .map((row) => {
                                        return (
                                            <>
                                                <p>{Text.Material} {row.object[1]} - {row.object[0]}: {row.message}</p>
                                            </>
                                        )
                                    })
                            }
                            <div className='border-y-2 my-2 py-2'>
                                <p>{folio == "Eliminado" ? Errors.NoSaved : Text.Folio + ":  " + folio}</p>
                            </div>
                            <div className='mt-3 text-right'>
                                <Btn_Standard btnName={Text.Accept} btnClick={resetValues} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default RecepcionAgregar