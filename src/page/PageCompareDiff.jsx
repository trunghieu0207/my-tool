import {Alert, Button, Col, Divider, Flex, Input, Row} from "antd";
import DiffComponent from "../DiffComponent.jsx";
import {useState} from "react";

const {TextArea} = Input;

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '70px'
}

export const PageCompareDiff = () => {
    const [isShowDiff, setIsShowDiff] = useState(false);
    const [oldValue, setOldValue] = useState('');
    const [newValue, newNewValue] = useState('');

    return (
        <>
            <Flex style={{width: '100%'}} vertical align={"center"}>
                <h2>Compare</h2>
                <Row gutter={16} style={{width: '100%'}}>
                    <Flex style={{width: '100%'}} align={"center"} justify={"center"}>
                        <Col span={8}>
                            <h4>Input 1</h4>
                            <TextArea rows={5} onChange={(e) => {
                                setOldValue(e.target.value)
                            }}/>
                        </Col>
                        <Col span={2} style={style}></Col>
                        <Col span={8}>
                            <h4>Input 2</h4>
                            <TextArea rows={5} onChange={(e) => {
                                newNewValue(e.target.value)
                            }}/>
                        </Col>
                    </Flex>
                </Row>
            </Flex>
            <Divider/>
            <Flex style={{width: '100%'}} vertical align={"center"}>
                <h2>Result</h2>
                <Row gutter={16} style={{width: '100%'}}>
                    <DiffComponent text1={oldValue} text2={newValue} />
                </Row>
            </Flex>
        </>
    )
}