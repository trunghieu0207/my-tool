import {Alert, Button, Checkbox, Col, Divider, Flex, Input, message, Row} from "antd";
import {useState} from "react";
import {useCopyToClipboard} from "usehooks-ts";

const {TextArea} = Input;

const NUMBER = '0123456789';
const CHARACTER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER_CHARACTER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SPECIAL_CHARACTER = '!@#$%^&*()_+';
const JP_CHARACTER = '康車ユオハフ証座ばは案歳ド内告ム基玄よさき状局ゆぱひめ月80路どでぼろ新潤笑ソ型平ン著政3卸呪娯れき。';

export const PageGenerateString = () => {
    const [isCheckNumber, setIsCheckNumber] = useState(false);
    const [isCheckCharacter, setIsCheckCharacter] = useState(false);
    const [isCheckSpecialCharacter, setIsCheckSpecialCharacter] = useState(false);
    const [isCheckJpCharacter, setIsCheckJpCharacter] = useState(false);
    const [isCheckUpperCase, setIsCheckUpperCase] = useState(false);
    const [length, setLength] = useState(0);
    const [lengthCount, setLengthCount] = useState(0);
    const [numberWord, setNumberWord] = useState(0);
    const [numberBytes, setNumberBytes] = useState(0);
    const [numberSpaces, setNumberSpaces] = useState(0);
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

        if (isCheckJpCharacter) {
            stringToGenerate += JP_CHARACTER;
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
            <h2>Generate string</h2>
            {contextHolder}
            <Row gutter={16} style={{width: '100%', flex: 1}}>
                <Flex style={{width: '100%'}} align={"right"} justify={"center"}>
                    <Col span={18} style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                        <Checkbox onChange={(e) => setIsCheckNumber(e.target.checked)}>Numbers</Checkbox>
                        <Checkbox onChange={(e) => setIsCheckCharacter(e.target.checked)}>Characters</Checkbox>
                        <Checkbox onChange={(e) => setIsCheckJpCharacter(e.target.checked)}>Japanese
                            Characters</Checkbox>
                        <Checkbox onChange={(e) => setIsCheckSpecialCharacter(e.target.checked)}>Special
                            characters</Checkbox>
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
                    <Col span={18} style={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <h4>Output</h4>
                        <span style={{marginBottom: '3px'}}>
                        </span>
                        <Alert
                            description={result ? result : "The output will shown"}
                            style={{width: '100%'}}
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
            <Divider/>
            <h2>Count characters</h2>
            <Row gutter={16} style={{width: '100%'}}>
                <Flex style={{width: '100%'}} align={"right"} justify={"center"}>
                    <Col span={18} style={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <TextArea rows={10} size='middle' onChange={(e) => {
                            const value= e.target.value;
                            if (value.length === 0) {
                                setNumberWord(0)
                            } else {
                                setNumberWord(value.trim().split(/\s+/).length)
                            }
                            if(value.match(/([\s]+)/g)){
                                setNumberSpaces(value.match(/([\s]+)/g).length);
                            } else {
                                setNumberSpaces(0)
                            }
                            setNumberBytes(new Blob([value]).size)
                            setLengthCount(value.length)
                        }}/>
                    </Col>
                </Flex>
            </Row>
            <Row gutter={16} style={{width: '100%'}}>
                <Flex style={{width: '100%'}} align={"right"} justify={"center"}>
                    <Col span={4} style={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <span style={{fontSize: 20}}><b>Length: </b>{lengthCount}</span>
                    </Col>
                    <Col span={4} style={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <span style={{fontSize: 20}}><b>Words: </b>{numberWord}</span>
                    </Col>
                    <Col span={4} style={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <span style={{fontSize: 20}}><b>Bytes: </b>{numberBytes}</span>
                    </Col>
                    <Col span={4} style={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                        <span style={{fontSize: 20}}><b>Spaces: </b>{numberSpaces}</span>
                    </Col>
                </Flex>
            </Row>
        </>

    )
}