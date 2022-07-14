import Layout from '../../../components/Layout';
import Table_Body from '../../../components/table/tb_body';
import { useEffect, useState } from 'react';
import { Emb } from '../../../components/helpers/database';
import useSound from 'use-sound';
import { Alert_path } from '../../../components/alert/alert';
import { Fetch_Data } from '../../../components/fetch/fetch_data';
import { Text } from '../../../components/text/text';

const HistoricoEmbarque = () => {
    // Save the information
    let [data, setData] = useState([]);
    // Empty data (dont reload)
    let [empty, setEmpty] = useState(false)
    // Save sound
    const [play] = useSound(Alert_path);
    // Width screen
    const [width, setWidth] = useState(undefined);

    if (typeof window != "undefined" && !width) {
        setWidth(window.screen.width)
    }

    function fetchData() {
        // Fetch_Data(Emb.getAll, play, setEmpty, setData)
    }

    // Load the data
    useEffect(() => {
        if (data.length == 0 && !empty) {
            fetchData()
        }
    })

    // Selected headers (filtered by name)
    // const headers = [
    //     "Folio_Recepcion", "Secuencia_Det", "Clave_Material", "Clave_Localidad", "Pallet", "Cantidad_Recibida", "Fecha_Produccion", "Folio_Extra", "Lote", "Fecha_Pallet_Det"
    // ];

    // Selected Actions (filtered by tooltip)
    // const actions = [
    //     Text.Refresh
    // ];

    // Saving the Functions (key = actions tooltip)
    // const dict_functions = {}
    // dict_functions[Text.Refresh] = fetchData

    return (
        <Layout width={width}>
            <div className="my-3">
                <h1 className="text-2xl text-gray-800 font-light">{Text.MaterialsShippedHistory}</h1>
                <div className='my-3'>
                    {/* <Table_Body
                        tableTitle={Text.MaterialsShippedHistory}
                        tableData={data}
                        listHeader={headers}
                        listAccion={actions}
                        dictFunctions={dict_functions} //optional
                    /> */}
                </div>
            </div>
        </Layout>
    )
}

export default HistoricoEmbarque