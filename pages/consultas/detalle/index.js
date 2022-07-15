import { useEffect, useState } from "react";
import useSound from "use-sound";
import { Alert_path } from "../../../components/alert/alert";
import { Fetch_Data } from "../../../components/fetch/fetch_data";
import { Fetch_Next } from "../../../components/fetch/fetch_next";
import { Attributes } from "../../../components/helpers/consts";
import { Email, Label } from "../../../components/helpers/database";
import Layout from "../../../components/Layout"
import Table_Body from "../../../components/table/tb_body";
import { Text } from "../../../components/text/text"

const LabelHistory = () => {
    // Save the information
    const [data, setData] = useState([]);
    // Empty data (dont reload)
    const [empty, setEmpty] = useState(false)
    // Save sound
    const [play] = useSound(Alert_path);
    let Admin = 0

    function fetchData() {
        Fetch_Data(Label.getLabels, play, setEmpty, setData)
    }

    // Load the data
    useEffect(() => {
        if (data.length == 0 && !empty) {
            fetchData()
        }
    })

    function deleteMaterial(row) {
        Fetch_Next(Label.deleteLabel(row[Attributes.Date]), play, fetchData, "delete")
    }

    if (typeof window !== 'undefined') {
        // Permissions
        Admin = localStorage.getItem('Admin')
    }

    // Selected headers (filtered by name)
    const headers = [
        "Label1", "Label2", "Label3", "Date", "Username", "Shift"
    ];

    // Selected Actions (filtered by name)
    const actions = [
        "Refrescar"
    ];

    // Saving the Functions (key = actions name)
    const dict_functions = {
        "Refrescar": fetchData
    }

    if (Admin) {
        dict_functions["editable"] = {
            onRowDelete: (row) => new Promise((res, rej) => {
                deleteMaterial(row)
                res([])
            }),
        }
    }

    return (
        <Layout>
            <div className="my-3">
                <h1 className="text-2xl text-gray-800 font-light">{Text.HistoryLabels}</h1>
                <div className='my-3'>
                    <Table_Body
                        tableTitle={Text.HistoryLabels}
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

export default LabelHistory