import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSound from 'use-sound';
import { Alert_path, Alert_show } from "../../components/alert/alert";
import Btn_Standard from "../../components/buttons/btn_standard";
import { Fetch_Data } from "../../components/fetch/fetch_data";
import { Fetch_Next } from "../../components/fetch/fetch_next";
import { Attributes } from "../../components/helpers/consts";
import { User } from "../../components/helpers/database";
import Layout from "../../components/layout";
import Table_Body from "../../components/table/tb_body";
import { Errors } from "../../components/text/error";
import { Text } from "../../components/text/text";

const Users = () => {
    // Get the router
    const router = new useRouter();
    // Save the information
    const [data, setData] = useState([]);
    // Empty data (dont reload)
    const [empty, setEmpty] = useState(false)
    // Save sound
    const [play] = useSound(Alert_path);

    function fetchData() {
        Fetch_Data(User.getUsers, play, setEmpty, setData)
    }

    // Load the data
    useEffect(() => {
        if (data.length == 0 && !empty) {
            fetchData()
        }
    })

    function deleteMaterial(row) {
        Fetch_Next(User.deleteUser(row[Attributes.Username]), play, fetchData, "delete")
    }

    function updateMaterial(newRow) {
        Fetch_Next(User.putUser(newRow[Attributes.Username]), play, fetchData, "put", { data: newRow })
    }

    function changePage() {
        router.push('/signup')
    }

    // Selected headers (filtered by name)
    const headers = [
        "Username", "Name", "Admin"
    ];

    // Selected Actions (filtered by name)
    const actions = [
        "Refrescar"
    ];

    // Saving the Functions (key = actions name)
    const dict_functions = {
        "Refrescar": fetchData,
        "editable": {
            onRowDelete: (row) => new Promise((res, rej) => {
                if (row.Username == "admin") {
                    Alert_show(Errors.Protected, play)
                    return res()
                }
                deleteMaterial(row)
                res([])
            }),
            onRowUpdate: (newRow, oldRow) => new Promise((res, rej) => {
                if (newRow.Username == "admin") {
                    Alert_show(Errors.Protected, play)
                    return res()
                }
                updateMaterial(newRow, oldRow)
                res([])
            }),
        },
    }

    return (
        <Layout>
            <div className="my-3">
                <h1 className="text-2xl text-gray-800 font-light">{Text.Users}</h1>
                <div className='my-3'>
                    <div className="flex flex-row-reverse">
                        <Btn_Standard btnName={Text.Create} btnClick={changePage} />
                    </div>
                    <Table_Body
                        tableTitle={Text.Users}
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

export default Users