import { useFormik } from 'formik';
import { React } from 'react';
import * as Yup from 'yup';
import Btn_Standard from '../buttons/btn_standard';
import { Text } from '../text/text';

// Example
{
    // import * as Yup from 'yup';

    // Values for the Form
    // const FormValues = [
    //     {
    //         name: "rack", // Id
    //         initialValue: '',
    //         validation: Yup.number().required('Ingrese un numero de rack'),
    //         text: "# Rack", // Show text
    //         placeholder: "Numero de Rack",
    //         type: "number"
    //     }
    // ]

    // Sumbit function
    // function fSumbit() {
    //     console.log("aqui")
    // }

    {/* <Form_standard
        FlistValues={FormValues}
        FonSubmit={fSumbit}
        FNombre="Crear Localidad"
        /> */}
}
const Form_standard = ({ FlistValues, FonSubmit, FNombre, FExtra }) => {
    // const [mensaje, guardarMensaje] = useState(null);

    const rInitial = {}
    const rValidation = {}

    for (const dato of FlistValues) {
        rInitial[dato.name] = dato.initialValue
        rValidation[dato.name] = dato.validation
    }

    const formik = useFormik({
        initialValues: rInitial,
        validationSchema: Yup.object(rValidation),
        onSubmit: async valores => await FonSubmit(valores)
    })

    function addInput(dato) {
        return (
            <div className='flex flex-col mx-3'>
                <div className="mb-4">
                    <label
                        className="block text-sm font-bold mb-2"
                        htmlFor={dato.name}
                    >
                        {dato.text}
                    </label>

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id={dato.name}
                        type={dato.type}
                        placeholder={dato.placeholder}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values[dato.name]}
                    />
                </div>

                {formik.touched[dato.name] && formik.errors[dato.name] ? (
                    <div
                        className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                    >
                        <p className="font-bold">{Text.Error}</p>
                        <p>{formik.errors[dato.name]}</p>
                    </div>
                ) : null}
            </div>
        )
    }

    return (
        <>
            <form
                className="bg-slate-100 rounded items-end shadow-md p-3 mb-4 flex flex-col"
                onSubmit={formik.handleSubmit}
            >
                <div className='flex flex-wrap flex-row min-w-full justify-around items-center'>
                    {FlistValues.map((dato) => addInput(dato))}
                </div>
                {FExtra ? FExtra() : null}
                <Btn_Standard btnName={FNombre} btnType="submit" />
            </form>
        </>
    );
}

export default Form_standard;