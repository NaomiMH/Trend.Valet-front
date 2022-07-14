import React from 'react';
import { Attributes } from '../helpers/consts';
import Get_Position from '../helpers/get_position';
import { Text } from '../text/text';

// if database changes, change field, not name
// Get the field from const **

function Table_Header(listHeader) {
    const headers = [
        // Personalizados
        // { title: Text.Amount, field: 'Count', name: 'Count', editable: 'never' },
        // {
        //     title: Text.MasterLabel, name: 'Pallet_Completo',
        //     render: (rowData) => {
        //         return (rowData[Attributes.Pallet_Det] ?
        //             rowData[Attributes.Pallet_Det] + ' - ' + rowData[Attributes.Fecha_Pallet].replace("T", " ").slice(0, Get_Position(rowData[Attributes.Fecha_Pallet],".",1))
        //             : null)
        //     }
        // },

        // Scanner
        { title: Text.Clave_Material, field: Attributes.Clave_Material, name: 'Clave_Material' },
        { title: Text.Pallet, field: Attributes.Pallet_Det, name: 'Pallet' },
        { title: Text.Fecha_Pallet, field: Attributes.Fecha_Pallet, name: 'Fecha_Pallet' },
        { title: Text.Cantidad_Recibida, field: Attributes.Cantidad_Recibida, name: 'Cantidad_Recibida' },
        { title: Text.Fecha_Produccion, field: Attributes.Fecha_Produccion, name: 'Fecha_Produccion' },
        { title: Text.Folio_Extra, field: Attributes.Folio_Extra, name: 'Folio_Extra' },
        { title: Text.Lote, field: Attributes.Lote, name: 'Lote' },
        { title: Text.Descripcion_Material, field: Attributes.Descripcion_Material, name: 'Descripcion_Material' },
        { title: Text.Fecha_Pallet, field: Attributes.Fecha_Pallet, name: 'Fecha_Pallet' },
        { title: Text.Usuario, field: Attributes.Usuario, name: 'Usuario' },
        { title: Text.Cliente, field: Attributes.Cliente, name: 'Cliente' },

        // Users
        { title: Text.Username, field: Attributes.Username, name: 'Username', editable: 'never' },
        { title: Text.Name, field: Attributes.Name, name: 'Name' },
        { title: Text.Admin, field: Attributes.Admin, name: 'Admin' },

        // EmailList
        { title: Text.Email, field: Attributes.Email, name: 'Email', editable: 'onAdd' },
        // { title: Text.Name, field: Attributes.Name, name: 'Name' },

        // LabelLog
        { title: Text.Label1, field: Attributes.Label1, name: 'Label1' },
        { title: Text.Label2, field: Attributes.Label2, name: 'Label2' },
        { title: Text.Label3, field: Attributes.Label3, name: 'Label3' },
        { title: Text.Date, field: Attributes.Date, name: 'Date' },
        { title: Text.Shift, field: Attributes.Shift, name: 'Shift' },
        { title: Text.Result, field: Attributes.Result, name: 'Result' },
        // { title: Text.Username, field: Attributes.Username, name: 'Username' },

        // Scanner_Array
        { title: Text.Read, field: Attributes.Lectura, name: 'Lectura' },
        { title: Text.Result, field: Attributes.Resultado, name: 'Resultado' },
        { title: Text.Date, field: Attributes.Fecha, name: 'Fecha' },
    ]
    return (
        headers.filter(({ name }) => listHeader.includes(name))
    );
}

export default Table_Header;