import React from 'react';
import MaterialTable from 'material-table';
import Table_Header from './tb_header';
import Table_Action from './tb_action';
import { Text } from '../text/text';

// Example
{
    // Import router, useState, useEffect, Alert_show and Alert_path
    // import useSound from 'use-sound';

    // Save the information
    // const [data, setData] = useState([]);
    // Empty data (dont reload)
    // const [empty, setEmpty] = useState(false)
    // Save sound
    // const [play] = useSound(Alert_path);

    // Go to detail page with the id of the row
    // function changePage(row) {
    //     const id = row.Folio_Recepcion
    //     Router.push({
    //         pathname: "..../[id]",
    //         query: { id }
    //     })
    // }

    // function fetchData() {
    //     Fetch_Data(..., play, setEmpty, setData)
    // }

    // Load the data
    // useEffect(() => {
    //     if (data.length == 0 && !empty) {
    //         fetchData()
    //     }
    // })

    // Selected headers (filtered by name)
    // const headers = [
    //     "Folio_Recepcion"
    // ];

    // Selected Actions (filtered by name)
    // const actions = [
    //     "Detalles", "Refrescar"
    // ];

    // Saving the Functions (key = actions tooltip)
    // const dict_functions = {
    //     "Detalles": changePage,
    //     "Refrescar": fetchData,
    //     "editable": {
    //         onRowDelete: (row) => new Promise((res, rej) => {
    //             deleteMaterial(row)
    //             res([])
    //         }),
    //         onRowAdd: (row) => new Promise((res, rej) => {
    //             addMaterial(row)
    //             res([])
    //         }),
    //         onRowUpdate: (newRow, oldRow) => new Promise((res, rej) => {
    //             updateMaterial(newRow, oldRow)
    //             res([])
    //         }),
    //     },
    //     "delete": "Regresar"
    // }

    {/* <Table_Body
 tableTitle={"Something"}
 tableData={data}
 listHeader={headers}
 listAccion={actions}
 dictFunctions={dict_functions} //optional
 /> */}
}
const Table_Body = ({ tableTitle, tableData, listHeader, listAccion, dictFunctions = {}, btoolbar = true }) => {
    const tableHeader = Table_Header(listHeader);
    const tableAction = Table_Action(listAccion, dictFunctions);

    return (
        <MaterialTable
            localization={{ body: { deleteTooltip: "delete" in dictFunctions ? dictFunctions["delete"] : Text.Delete } }}
            editable={"editable" in dictFunctions ? dictFunctions["editable"] : null}
            options={{
                toolbar: btoolbar,
                showTitle: false,
                headerStyle: {
                    zIndex: 8
                },
                exportButton: true,
                exportAllData: true
            }}
            columns={tableHeader}
            data={tableData}
            actions={tableAction}
            title={tableTitle}
        />
    );
}

export default Table_Body;