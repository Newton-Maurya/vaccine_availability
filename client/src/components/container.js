import React, { useEffect, useState } from 'react'
import axios from 'axios';
import StateArray from './stateData';
import SelectCOntainer from './SelectContainer';
import AvailableSlot from './availableSlot';
import AvailableSlot2 from './availableSlot2';

// date function
function getDateArray() {
    var date = new Date()
    var dd = date.getDate() - 1
    var mm = date.getMonth() + 1
    var yy = date.getFullYear()
    var OriginalDate = `${yy}-${mm}-${dd}`
    var start = new Date(OriginalDate);
    var i = 0;
    var dateArray = [];
    var loop = new Date(start);
    while (i < 70) {
        dateArray.push(loop)
        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
        i++
    }
    return dateArray
}
var dateData = getDateArray()
var date = `${dateData[0].getDate()}-${dateData[0].getMonth() + 1}-${dateData[0].getFullYear()}`
console.log(date)
console.log(dateData);
function getDateWithMonthFunction(a, b, c) {
    return `${a} ${b} ${c}`
}
var getDateWithMonth = []
getDateWithMonth = dateData.map((item, index) => {
    return getDateWithMonthFunction(item.getDate(), item.toLocaleString('default', { month: 'short' }), item.getFullYear())
})


export default function Container() {
    const [dist, setDist] = useState([])
    const [availableSlot, setAvailableSlot] = useState([])
    const [background, setbackground] = useState(0)
    const [districtId, setDistrictId] = useState()
    console.log(availableSlot)
    function handleSelect(event) {
        const id = event.target.value;
        axios.post('http://localhost:8040/state_district', { 'state_id': id })
            .then((res) => {
                setDist(res.data[0].state_district)
            })
            .catch((err) => {
                console.log('Error occured', err)
            })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        var district_id = await document.querySelector('#select-box2').value
        if (district_id) {
            var availData = []
            if(window.innerWidth > 999){
                for (let i = 0; i < 7; i++) {
                    var date = `${dateData[i].getDate() - 1}-${dateData[i].getMonth() + 1}-${dateData[i].getFullYear()}`
                    await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`)
                    .then((res) => {
                        availData.push(res.data.sessions)
                    })
                    .catch(err => console.log(err))
                }
                setAvailableSlot(availData)
            }
            else{
                var date = `${dateData[0].getDate()}-${dateData[0].getMonth() + 1}-${dateData[0].getFullYear()}`
                await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`)
                .then((res) => {
                    availData.push(res.data.sessions)
                })
                .catch(err => console.log(err))
                setbackground(0)   
                setAvailableSlot(availData)
            }
            setDistrictId(district_id)
        }
    }

    async function handleDateChange(e){
        var availData = []
       var num = parseInt(e.target.name)
       var date = `${dateData[num].getDate()}-${dateData[num].getMonth() + 1}-${dateData[num].getFullYear()}`
       await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`)
       .then((res) => {
           availData.push(res.data.sessions)
       })
       .catch(err => console.log(err))
       setAvailableSlot(availData)
       setbackground(num)   
    }
    return (
        <div className='container' style={window.innerWidth < 1000 ? { width: (window.innerWidth / 100) * 90 } : { width: '1200px' }}>
            <div className='helpline_container'>
                <h2 className='center'>HELPLINE</h2>
                <hr className='hr' />
                <div className='help_attr'>
                    <div className='help_num'>
                        <p>Covid-19 Helpline</p>
                        <a href="tel:91-11-23978046" aria-label="91-11-23978046">91-11-23978046</a>

                    </div>
                    <div className='help_num'>
                        <p>Health Ministry</p>
                        <a href="tel:911123978046" aria-label="911123978046">1075</a>

                    </div>
                    <div className='help_num'>
                        <p>Child</p>
                        <a href="tel:1095" aria-label="1095">1095</a>
                    </div>
                    <div className='help_num'>
                        <p>Mental Health</p>
                        <a href="tel:08046110007" aria-label="08046110007">08046110007</a>
                    </div>
                    <div className='help_num'>
                        <p>Sinior Citizens</p>
                        <a href="tel:14567" aria-label="14567">14567</a>
                    </div>
                </div>
                <hr className='hr' />
                <h2 className='center white'>Check Your Nearest Vaccination Center And Slots Availability</h2>
            </div>
            <div className='selectTag'>
                <SelectCOntainer
                    key={223}
                    StateName={StateArray}
                    handleChange={handleSelect}
                    district={dist}
                    handleSubmit={handleSubmit}
                />
            </div>
            {availableSlot.length !== 0 &&
                (
                    <div className='date_container'>
                        {
                            dateData.map((item, index) => {
                                return (
                                    <>
                                        {(window.innerWidth > 999)
                                            ?
                                            <>
                                                {index < 7 && (
                                                    <div className='date'>
                                                        <span>{getDateWithMonth[index]}</span>
                                                    </div>
                                                )
                                                }
                                            </>
                                            :

                                            <>
                                                {index < 70 && (
                                                    <div className='date'>
                                                        <input name={index} style={index ===background ? {background:'#14878c'} : {background:'#1fc0c7'}} value={getDateWithMonth[index]} type='button' onClick={handleDateChange} />
                                                    </div>
                                                )
                                                }
                                            </>
                                        }
                                    </>
                                )
                            })
                        }
                    </div>
                )
            }
            <div className='card_main'>
                {(window.innerWidth > 999) ? (
                    <AvailableSlot
                        key={543}
                        dateDate={dateData}
                        SlotsData={availableSlot}
                    />)
                    :
                    <AvailableSlot2
                        key={978}
                        Date={background}
                        SlotsData={availableSlot}
                    />
                }
            </div>
        </div>
    )
}
