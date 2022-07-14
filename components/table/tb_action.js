import useSound from 'use-sound';
import { Alert_path, Alert_show } from '../alert/alert';
import { Errors } from '../text/error';
import { Text } from '../text/text';

function Table_Action(listActions, dictFunctions) {
    // Save sound
    const [play] = useSound(Alert_path);

    function useFunction(rowData, name) {
        if (dictFunctions[name]) {
            dictFunctions[name](rowData);
        } else {
            Alert_show(Errors.FunctionMissing(name), play);
        }
    };

    const actions = [
        // Default
        {
            icon: 'refresh',
            tooltip: Text.Refresh,
            onClick: () => useFunction({}, 'Refrescar'),
            isFreeAction: true,
            name: 'Refrescar'
        },

        // Personalizar
    ]
    return (
        actions.filter(({ name }) => listActions.includes(name))
    );
}

export default Table_Action;