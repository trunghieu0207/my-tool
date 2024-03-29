import {Alert, Button, Col, Flex, Input, message, Row} from "antd";
import {useState} from "react";
import {useCopyToClipboard} from "usehooks-ts";

const {TextArea} = Input;

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '70px'
}

export const Base64 = ({title, isRawToBase64}) => {
    const [textAreaValue, setTextAreValue] = useState('');
    const [result, setResult] = useState('');
    const [copiedText, copy] = useCopyToClipboard()
    const [messageApi, contextHolder] = message.useMessage();


    const handleTextAareOnChange = (event) => {
        setTextAreValue(event.target.value)
    }

    const handleCopy = () => {
        if (result.length === 0) {
            return;
        }
        copy(result)
            .then(() => {
                messageApi.open({
                    type: 'success',
                    content: 'Copied',
                });
            })
            .catch(error => {
                messageApi.open({
                    type: 'error',
                    content: 'Copy error',
                });
            })
    }

    const handleClickConvertButton = () => {
        if (isRawToBase64) {
            setResult(btoa(textAreaValue))
        } else {
            setResult(atob(textAreaValue))
        }
    }

    return (
        <Flex style={{width: '100%'}} vertical align={"center"}>
            {contextHolder}
            <h2>{title}</h2>
            <Row gutter={16} style={{width: '100%'}}>
                <Flex style={{width: '100%'}} align={"center"} justify={"center"}>
                    <Col span={8}>
                        <h4>Input</h4>
                        <TextArea rows={5} onChange={(e) => handleTextAareOnChange(e)}/>
                    </Col>
                    <Col span={2} style={style}>
                        <Button type="primary" onClick={() => handleClickConvertButton()}>Convert</Button>
                    </Col>
                    <Col span={8}>
                        <h4>Output</h4>
                        <Alert
                            description={result ? result : "The output will shown"}
                            type="success"
                            action={
                                <Button size="small" type="primary" onClick={() => handleCopy()}>
                                    Copy
                                </Button>
                            }
                        />
                    </Col>
                </Flex>
            </Row>
        </Flex>
    )
}