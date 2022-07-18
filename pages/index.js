import { useState } from 'react';
import Layout from '../components/layout';
import { Text } from '../components/text/text';

const Index = () => {
    // Width screen
    const [width, setWidth] = useState(undefined);

    if (typeof window != "undefined" && !width) {
        setWidth(window.screen.width)
    }

    return (
        <div>
            <Layout width={width}>
                <h1 className="text-2xl text-gray-800 font-light">{Text.Homepage}</h1>
            </Layout>
        </div>
    )
}

export default Index