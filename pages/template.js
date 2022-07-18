import Btn_Standard from '../components/buttons/btn_standard';
import Layout from '../components/layout';

const Template = () => {
    return (
        <Layout>
            <div className="my-3">
                <h1 className="text-2xl text-gray-800 font-light">Template</h1>
                <div className='my-3'>
                    <Btn_Standard btnName="Template" />
                </div>
            </div>
        </Layout>
    )
}

export default Template