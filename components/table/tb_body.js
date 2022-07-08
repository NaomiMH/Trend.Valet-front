import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import Table_Header from './tb_header';
import Table_Action from './tb_action';
import { Attributes } from '../helpers/consts';
import { Conf } from '../helpers/database';
import { Alert_path, Alert_show } from '../alert/alert';
import useSound from 'use-sound';
import { Text } from '../text/text';
import { Fetch_Config } from '../fetch/fetch_config';
import Get_Position from '../helpers/get_position';

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

    // Selected Actions (filtered by tooltip)
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
    //         })
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
    // Save configuration
    const [hours, setHours] = useState(0)
    const [shours, setSHours] = useState(0)
    // Empty data (dont reload)
    const [empty, setEmpty] = useState(false)
    // Save sound
    const [play] = useSound(Alert_path);

    function fetchData() {
        Fetch_Config({ play, setHours, setSHours })
    }

    // Load the data
    useEffect(() => {
        if (!hours && !shours && !empty) {
            setEmpty(true)
            fetchData()
        }
    })

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
                exportAllData: true,
                rowStyle: rowData => {
                    let result = {}
                    // Set red for Count == 0
                    if ("Count" in rowData) {
                        if (rowData["Count"] == 0) {
                            result.backgroundColor = '#EBC34B'
                        }
                    }
                    // Set red when limitTime is exceeded 
                    if (Attributes.Fecha_Hora_Recepcion in rowData) {
                        if (rowData[Attributes.Fecha_Hora_Recepcion]) {
                            let limitTime = hours * 60 * 60 * 1000
                            let tempTime = rowData[Attributes.Fecha_Hora_Recepcion]
                                .replace('T', ' ').replace('Z', '').slice(0, Get_Position(rowData[Attributes.Fecha_Hora_Recepcion],".",1))
                            if (new Date - new Date(tempTime) > limitTime) {
                                if ("CountLocation" in rowData) {
                                    if (rowData["CountLocation"] != 0) {
                                        result.backgroundColor = '#F7664D'
                                    }
                                } else {
                                    result.backgroundColor = '#F7664D'
                                }
                            }
                        }
                    }
                    // Set red when limitTime is exceeded 
                    if (Attributes.Fecha_Hora_Embarque in rowData) {
                        if (rowData[Attributes.Fecha_Hora_Embarque]) {
                            let limitTime = shours * 60 * 60 * 1000
                            let tempTime = rowData[Attributes.Fecha_Hora_Embarque]
                                .replace('T', ' ').replace('Z', '').slice(0, Get_Position(rowData[Attributes.Fecha_Hora_Embarque],".",1))
                            if (new Date - new Date(tempTime) > limitTime) {
                                result.backgroundColor = '#F7664D'
                            }
                        }
                    }
                    // Set red when there is an invalid amount
                    if ('Errors' in rowData) {
                        if (rowData['Errors'] != 0) {
                            result.backgroundColor = '#F7664D'
                        }
                    }
                    return result
                }
            }}
            columns={tableHeader}
            data={tableData}
            actions={tableAction}
            title={tableTitle}
        />
    );
}

export default Table_Body;