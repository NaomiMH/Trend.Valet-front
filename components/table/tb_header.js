import React from 'react';
import { Attributes } from '../helpers/consts';
import Get_Position from '../helpers/get_position';
import { Text } from '../text/text';

// if database changes, change field, not name
// Get the field from const **

function Table_Header(listHeader) {
    const headers = [
        // Personalizados
        // { title: Text.Amount, field: 'Count', name: 'Count' },
        // {
        //     title: Text.MasterLabel, name: 'Pallet_Completo',
        //     render: (rowData) => {
        //         return (rowData[Attributes.Pallet_Det] ?
        //             rowData[Attributes.Pallet_Det] + ' - ' + rowData[Attributes.Fecha_Pallet].replace("T", " ").slice(0, Get_Position(rowData[Attributes.Fecha_Pallet],".",1))
        //             : null)
        //     }
        // },
    ]
    return (
        headers.filter(({ name }) => listHeader.includes(name))
    );
}

export default Table_Header;