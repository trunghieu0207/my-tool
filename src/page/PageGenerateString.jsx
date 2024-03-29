import {Alert, Button, Checkbox, Col, Flex, Input, message, Row} from "antd";
import {useState} from "react";
import {useCopyToClipboard} from "usehooks-ts";
import {CopyOutlined} from "@ant-design/icons";

const NUMBER = '0123456789';
const CHARACTER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER_CHARACTER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SPECIAL_CHARACTER = '!@#$%^&*()_+';

export const PageGenerateString = () => {
    const [isCheckNumber, setIsCheckNumber] = useState(false);
    const [isCheckCharacter, setIsCheckCharacter] = useState(false);
    const [isCheckSpecialCharacter, setIsCheckSpecialCharacter] = useState(false);
    const [isCheckUpperCase, setIsCheckUpperCase] = useState(false);
    const [length, setLength] = useState(0);
    const [result, setResult] = useState('');
    const [copiedText, copy] = useCopyToClipboard()
    const [messageApi, contextHolder] = message.useMessage();

    const generateString = () => {
        let stringToGenerate = '';

        if (isCheckNumber) {
            stringToGenerate += NUMBER;
        }

        if (isCheckCharacter) {
            stringToGenerate += CHARACTER;
        }

        if (isCheckSpecialCharacter) {
            stringToGenerate += SPECIAL_CHARACTER;
        }

        if (isCheckUpperCase) {
            stringToGenerate += UPPER_CHARACTER;
        }


        let result = '';
        const charactersLength = stringToGenerate.length;
        let counter = 0;
        while (counter < length) {
            result += stringToGenerate.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        setResult(result);
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

    return (
        <>
            <Flex style={{width: '100%'}} vertical align={"center"}>
                <h2>Generate string</h2>
                {contextHolder}
                <Row gutter={16} style={{width: '100%'}}>
                    <Flex style={{width: '100%'}} align={"right"} justify={"center"}>
                        <Col span={18} style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <Checkbox onChange={(e) => setIsCheckNumber(e.target.checked)}>Numbers</Checkbox>
                            <Checkbox onChange={(e) => setIsCheckCharacter(e.target.checked)}>Characters</Checkbox>
                            <Checkbox onChange={(e) => setIsCheckSpecialCharacter(e.target.checked)}>Special characters</Checkbox>
                            <Checkbox onChange={(e) => setIsCheckUpperCase(e.target.checked)}>Upper case</Checkbox>
                            <span>
                            <Input
                                placeholder="Length"
                                onChange={(e) => setLength(e.target.value)}
                            />
                        </span>
                            <Button style={{marginLeft: '3px'}} onClick={() => generateString()}>Generate</Button>
                        </Col>
                    </Flex>
                </Row>
                <Row gutter={16} style={{width: '100%'}}>
                    <Flex style={{width: '100%'}} align={"right"} justify={"center"}>
                        <Col span={18} style={{display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                            <h4>Output</h4>
                            <span style={{marginBottom: '3px'}}>
                        </span>
                            <Alert
                                description={result ? result : "The output will shown"}
                                style={{maxWidth: '1000px'}}
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
        </>

    )
}