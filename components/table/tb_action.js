import useSound from 'use-sound';
import { Alert_path, Alert_show } from '../alert/alert';
import { Errors } from '../text/error';
import { Text } from '../text/text';

function Table_Action(listActions, dictFunctions) {
    // Save sound
    const [play] = useSound(Alert_path);

    function useFunction(rowData, tooltip) {
        if (dictFunctions[tooltip]) {
            dictFunctions[tooltip](rowData);
        } else {
            Alert_show(Errors.FunctionMissing(tooltip), play);
        }
    };

    const actions = [
        {
            icon: 'info',
            tooltip: Text.Details,
            onClick: (_, rowData) => useFunction(rowData, Text.Details)
        },
        {
            icon: 'check',
            tooltip: Text.Square,
            onClick: (_, rowData) => useFunction(rowData, Text.Square)
        },
        {
            icon: 'refresh',
            tooltip: Text.Refresh,
            onClick: () => useFunction({}, Text.Refresh),
            isFreeAction: true
        },
        {
            icon: 'check',
            tooltip: Text.GlobalSquare,
            onClick: () => useFunction({}, Text.GlobalSquare),
            isFreeAction: true
        },
        {
            icon: 'inventory',
            tooltip: Text.Scann,
            onClick: (_, rowData) => useFunction(rowData, Text.Scann)
        }
    ]
    return (
        actions.filter(({ tooltip }) => listActions.includes(tooltip))
    );
}

export default Table_Action;