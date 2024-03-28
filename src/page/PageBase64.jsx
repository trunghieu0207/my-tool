import {Divider} from 'antd';
import {Base64} from "./base64/Base64.jsx";

export const PageBase64 = () => {
    return (
        <>
            <Base64 title="Raw to base64" isRawToBase64={true}/>
            <Divider/>
            <Base64 title="Base64 to raw"/>
            <Divider/>
        </>
    )
}