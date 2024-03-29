import {Alert, Button, Col, Divider, Input, message, Row, Select} from "antd";
import {useEffect, useState} from "react";
import {useCopyToClipboard} from "usehooks-ts";
import {DateTime} from "luxon";

export const PageConvertTimestamp = () => {
    const [result, setResult] = useState('');
    const [timestampInput, setTimestampInput] = useState('');
    const [dateConverted, setDateConverted] = useState('');
    const [dateYourTimezoneConverted, setDateYourTimezoneConverted] = useState('');
    const [timestampConvertFromDate, setTimestampConvertFromDate] = useState('');
    const [convertOption, setConvertOption] = useState('utc');
    const [date, setDate] = useState({});
    const [currentTimestamp, setCurrentTimestamp] = useState(0);
    const [copiedText, copy] = useCopyToClipboard()
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        getCurrentTimestamp()
    }, [])

    const getCurrentTimestamp = () => {
        setInterval(() => {
            const date = new DateTime(new Date(), {zone: 'UTC'})
            setCurrentTimestamp(date.toUnixInteger())
        }, 1000)
    }

    const onChangSetYear = (value) => {
        if (value.length === 0) {
            setDate({...date, year: ''})
            return;
        }
        setDate({...date, year: parseInt(value, 10)})
    }

    const onChangSetMonth = (value) => {
        if (value.length === 0) {
            setDate({...date, month: ''})
            return;
        }
        setDate({...date, month: parseInt(value, 10)})
    }

    const onChangSetDay = (value) => {
        if (value.length === 0) {
            setDate({...date, day: ''})
            return;
        }
        setDate({...date, day: parseInt(value, 10)})
    }

    const onChangSetHour = (value) => {
        if (value.length === 0) {
            setDate({...date, hour: ''})
            return;
        }
        setDate({...date, hour: parseInt(value, 10)})
    }

    const onChangSetMinute = (value) => {
        if (value.length === 0) {
            setDate({...date, minute: ''})
            return;
        }
        setDate({...date, minute: parseInt(value, 10)})
    }

    const onChangSetSecond = (value) => {
        if (value.length === 0) {
            setDate({...date, second: ''})
            return;
        }
        setDate({...date, second: parseInt(value, 10)})
    }

    const handleCopy = () => {
        console.log(timestampConvertFromDate)
        if (timestampConvertFromDate.length === 0) {
            return;
        }
        copy(timestampConvertFromDate)
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

    const handleConvertToDate = () => {
        if (timestampInput.length === 0) {
            return
        }
        const timestamp = parseInt(timestampInput, 10);
        const date = DateTime.fromMillis(timestamp * 1000, {zone: 'UTC'});
        setDateConverted(date.toRFC2822())
        const yourDate = DateTime.fromMillis(timestamp * 1000);
        setDateYourTimezoneConverted(yourDate.toRFC2822())
        const dateObject = date.toObject()
        setDate(dateObject)
    }

    const handleConvertToTimestamp = () => {
        if (convertOption === 'utc') {
            const date2 = DateTime.fromObject(date, {zone: 'UTC'});
            setTimestampConvertFromDate(date2.toUnixInteger())
        } else {
            const date2 = DateTime.fromObject(date);
            setTimestampConvertFromDate(date2.toUnixInteger())
        }
    }

    return (
        <>
            <h1>Convert timestamp</h1>
            {contextHolder}
            <Row gutter={16} style={{width: '100%', flex: 1, alignItems: 'center'}}>
                <Col span={24} style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                    <span style={{fontSize: 20, marginRight: '7px'}}>Current Unix timestamp</span>
                    <Alert message={currentTimestamp} type="success" style={{fontSize: '20px', fontWeight: 'bold'}}/>
                </Col>
            </Row>
            <Divider dashed/>
            <Row gutter={24} style={{width: '100%', flex: 1, alignItems: 'center'}}>
                <Col span={12} style={{display: 'flex', alignItems: 'center'}}>
                    <p>Input timestamp</p>
                    <div style={{width: '200px', marginLeft: '5px', marginRight: '5px'}}>
                        <Input placeholder="Timestamp" onChange={(e) => setTimestampInput(e.target.value)}/>
                    </div>
                    <Button onClick={() => handleConvertToDate()} type="primary">Convert to date</Button>
                </Col>
            </Row>
            <Divider dashed/>
            <Row gutter={24} style={{width: '100%', flex: 1, justifyContent: 'right', flexDirection: 'column'}}>
                <Col span={12} style={{display: 'flex', alignItems: 'center', fontSize: '15px'}}>
                    <p><b>Time converted (UTC): </b> {dateConverted}</p>
                </Col>
                <Col span={12} style={{display: 'flex', alignItems: 'center', fontSize: '15px'}}>
                    <p><b>Time converted (Your timezone): </b> {dateYourTimezoneConverted}</p>
                </Col>
            </Row>
            <Divider/>
            <Row gutter={24}>
                <Col span={2}>
                    <p>Year</p>
                    <Input placeholder="Year" onChange={(e) => onChangSetYear(e.target.value)} value={date.year}/>
                </Col>
                <Col span={2}>
                    <p>Month</p>
                    <Input placeholder="Month" onChange={(e) => onChangSetMonth(e.target.value)} value={date.month}/>
                </Col>
                <Col span={2}>
                    <p>Day</p>
                    <Input placeholder="Day" onChange={(e) => onChangSetDay(e.target.value)} value={date.day}/>
                </Col>
                <Col span={2}>
                    <p>Hour</p>
                    <Input placeholder="Hour" onChange={(e) => onChangSetHour(e.target.value)} value={date.hour}/>
                </Col>
                <Col span={2}>
                    <p>Minute</p>
                    <Input placeholder="Minute" onChange={(e) => onChangSetMinute(e.target.value)} value={date.minute}/>
                </Col>
                <Col span={2}>
                    <p>Second</p>
                    <Input placeholder="Second" onChange={(e) => onChangSetSecond(e.target.value)} value={date.second}/>
                </Col>
                <Col span={4}>
                    <p>Timezone</p>
                    <Select
                        defaultValue="utc"
                        style={{width: 150}}
                        onSelect={(value) => {
                            setConvertOption(value)
                        }}
                        options={[{value: 'utc', label: 'UTC'}, {value: 'yourtimezone', label: 'Your timezone'}]}
                    />
                </Col>
                <Col span={4} style={{display: "flex", alignItems: 'center', marginTop: '45px'}}>
                    <div></div>
                    <Button type={"primary"} onClick={() => handleConvertToTimestamp()}>Convert to Timestamp</Button>
                </Col>
            </Row>
            <Divider/>
            <Row gutter={24} style={{width: '100%', flex: 1, justifyContent: 'right', flexDirection: 'column'}}>
                <Col span={12} style={{display: 'flex', alignItems: 'center', fontSize: '15px'}}>
                    <b>Timestamp (UTC): </b>
                    <Alert message={timestampConvertFromDate ? timestampConvertFromDate : 'Result will show'}
                           type="success"
                           style={{fontSize: '15px', width: '50%', marginLeft: '10px', marginRight: '5px'}} action={
                        <Button className="site-button-ghost-wrapper" onClick={() => handleCopy()}
                                type={"primary"}>Copy</Button>
                    }/>

                </Col>
            </Row>
        </>
    )
}