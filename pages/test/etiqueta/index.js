import Layout from '../../../components/Layout';
import Btn_Standard from '../../../components/buttons/btn_standard';
import In_standard from '../../../components/input/in_standard';
import { useState } from 'react';
import { Scanner_Reading } from '../../../components/scanner/scanner_reading';
import { Text } from '../../../components/text/text';
import { Attributes } from '../../../components/helpers/consts';

const TestScanner = () => {
    // Info of reading
    const [info, setInfo] = useState("");
    // Type of reading
    const [type, setType] = useState("");
    // Reading
    const [reading, setReading] = useState("");
    // First line description
    const [description, setDescription] = useState("");

    // Get the scanner reading
    function saveChange(event) {
        const [type, info, reading] = Scanner_Reading(event, { description })
        if (type == "description") {
            setDescription(info)
            return
        }
        setDescription("")
        setType(type)
        setInfo(info)
        setReading(reading)
    }

    // Save the new data in the database
    function deleteData() {
        setDescription("")
        setType("")
        setInfo("")
        setReading("")
    }

    return (
        <Layout width={399}>
            <div className="my-3">
                <h1 className="text-2xl text-gray-800 font-light">{Text.TestLabels}</h1>
                <div className='my-3'>
                    <p>{Text.Type}: {type || Text.None}</p>
                    <p>{Text.Read}: {reading || Text.None}</p>
                    <p>{Text.Found}: {
                        (type == "error messy" && typeof info != "object") || type == "location" ? info : null
                    }</p>
                    {
                        (type == "error messy" && typeof info == "object") || type == "error unknown" ? (
                            <>
                                <p>{JSON.stringify(info)}</p>
                            </>
                        ) : type == "box" ? (
                            <>
                                <p>{Text.Material}: {info[Attributes.Clave_Material]}</p>
                                <p>{Text.MaterialDescription}: {info[Attributes.Descripcion_Material]}</p>
                                <p>{Text.Amount}: {info[Attributes.Cantidad_Recibida]}</p>
                                <p>{Text.FolioExtra}: {info[Attributes.Folio_Extra]}</p>
                                <p>{Text.DateProduction}: {info[Attributes.Fecha_Produccion]}</p>
                            </>
                        ) : type == "prime" ? (
                            <>
                                <p>{Text.Material}: {info[Attributes.Clave_Material]}</p>
                                <p>{Text.MaterialDescription}: {info[Attributes.Descripcion_Material]}</p>
                                <p>{Text.Amount}: {info[Attributes.Cantidad_Recibida]}</p>
                                <p>{Text.FolioExtra}: {info[Attributes.Folio_Extra]}</p>
                                <p>{Text.DateProduction}: {info[Attributes.Fecha_Produccion]}</p>
                                <p>{Text.Batch}: {info[Attributes.Lote]}</p>
                            </>
                        ) : type == "pallet" ? (
                            <>
                                <p>{Text.Material}: {info[Attributes.Clave_Material]}</p>
                                <p>{Text.Customer}: {info[Attributes.Cliente]}</p>
                                <p>{Text.User}: {info[Attributes.Usuario]}</p>
                                <p>{Text.MasterLabelID}: {info[Attributes.Pallet_Det]}</p>
                                <p>{Text.MasterLabelDate}: {info[Attributes.Fecha_Pallet]}</p>
                            </>
                        ) : null
                    }
                    <label>{Text.Scann} {Text.Label}</label>
                    <div className='my-3'>
                        <In_standard
                            inName={"etiqueta"}
                            inPlaceHolder={Text.SelectScann}
                            onChange={saveChange} />
                    </div>
                    <div className='mt-3 text-right'>
                        <Btn_Standard btnName={Text.Delete} btnClick={deleteData} />
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default TestScanner