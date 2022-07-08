import Layout from '../../../components/Layout';
import Btn_Standard from '../../../components/buttons/btn_standard';
import Table_Body from '../../../components/table/tb_body';
import { Link } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { Mat_Rec_Enc } from '../../../components/helpers/database';
import { Attributes } from '../../../components/helpers/consts';
import useSound from 'use-sound';
import { Alert_path } from '../../../components/alert/alert';
import { Fetch_Data } from '../../../components/fetch/fetch_data';
import { Text } from '../../../components/text/text';

const Recepcion = () => {
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
        Fetch_Data(Mat_Rec_Enc.getByFecha, play, setEmpty, setData)
    }

    // Load the data
    useEffect(() => {
        if (data.length == 0 && !empty) {
            fetchData()
        }
    })

    // Go to detail page with the id of the row
    function changePage(row) {
        const id = row[Attributes.Folio_Recepcion]
        Router.push({
            pathname: "/procesos/recepcion/[id]",
            query: { id }
        })
    }

    // Selected headers (filtered by name)
    const headers = [
        "Folio_Recepcion", "Usuario", "Count"
    ];

    // Selected Actions (filtered by tooltip)
    const actions = [
        Text.Details, Text.Refresh
    ];

    // Saving the Functions (key = actions tooltip)
    const dict_functions = {}
    dict_functions[Text.Details] = changePage
    dict_functions[Text.Refresh] = fetchData

    return (
        <Layout width={width}>
            <div className="my-3">
                <h1 className="text-2xl text-gray-800 font-light">{Text.ReceiveMaterials}</h1>
                <div className='my-3'>
                    <div className='mb-3 hidden'>
                        {width < 400 ? (
                            <Link href="/procesos/recepcion/agregar">
                                <Btn_Standard btnName={Text.Receive} />
                            </Link>
                        ) : null}
                    </div>
                    <Table_Body
                        tableTitle={Text.ReceiveMaterials}
                        tableData={data}
                        listHeader={headers}
                        listAccion={actions}
                        dictFunctions={dict_functions} //optional
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Recepcion