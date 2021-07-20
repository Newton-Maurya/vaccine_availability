import React from 'react';
import { Link } from 'react-router-dom';

// Remove Duplicates from array
function removeDuplicates(originalArray, prop) {
    var i = []
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
    return newArray;
}
export default function availableSlot(props) {
    var fees = []
    var infoAbout = []
    var otherInfo1 = []
    var otherInfo2 = []
    var greaterArr = []
    var lessArr = []
    const { SlotsData, dateData } = props
    if (SlotsData.length !== 0) {
        console.log(SlotsData)
        for (let i = 0; i < SlotsData.length; i++) {
            if (SlotsData[i].length !== 0 && otherInfo1.length === 0) {
                for (let j = 0; j < SlotsData[i].length; j++) {
                    otherInfo1.push(SlotsData[i][j])
                }
            }
            else {
                for (let j = 0; j < SlotsData[i].length; j++) {
                    otherInfo2.push(SlotsData[i][j])
                }
            }
        }
    }
    function compareGreater(a, b) {
        if (a > b) {
            return a
        }
        else {
            return b
        }
    }
    function compareLess(a, b) {
        if (a > b) {
            return b
        }
        else {
            return a
        }
    }

    greaterArr = compareGreater(otherInfo1, otherInfo2);
    lessArr = compareLess(otherInfo1, otherInfo2);
    for (let i = 0; i < lessArr.length; i++) {
        for (let j = 0; j < greaterArr.length; j++) {
            if (lessArr[i].center_id === greaterArr[j].center_id) {
                greaterArr.splice(j, 1)
            }
        }
    }
    var infoAboutData = [...lessArr, ...greaterArr]
    infoAbout = removeDuplicates(infoAboutData, 'center_id')


    return (
        <div className='slot_container'>
            <div className='name_Info'>
                {
                    SlotsData.length !== 0 && (
                        infoAbout.length !== 0 ?(
                            infoAbout.map((item, index) => {
                                return (
                                    <div className='card_container'>
                                        <div className='card_info'>
                                            <h4 key={`${index}name`} >
                                                {item.name}
                                            </h4>
                                            <p key={`${index}adsress`}>
                                                <span>
                                                    {item.address}
                                                </span>
                                                <span>
                                                    , {item.district_name}
                                                </span>
                                                <span>
                                                    , {item.state_name}
                                                </span>
                                                <span>
                                                    , {item.pincode}
                                                </span>
                                            </p>
                                            <p className={item.fee_type === 'Paid' ? 'btn_primary btn' : 'btn_success btn'}>{item.fee_type}</p>
                                            <Link className={item.fee_type !== 'Paid' ? 'btn_primary btn2' : 'btn_success btn2'} to='//selfregistration.cowin.gov.in' target="_blank" >Book Now</Link>
                                        </div>
                                        <div className='card_slots'>
                                            {SlotsData.map((item2) => {
                                                return (
                                                    <>
                                                        <div className='card_both'>
                                                            <p className='not_available'>NA</p>
                                                            {(item2.map((item3) => {
                                                                return (
                                                                    <>
                                                                        {(item3.center_id === item.center_id) && (
                                                                            <div className='card_availability'>
                                                                                <span>{item3.vaccine}</span>
                                                                                <span>{item3.fee_type === 'Paid' && 'Rs : '} {item3.fee_type === 'Paid' && item3.fee}</span>
                                                                                {(item3.available_capacity === 0)
                                                                                    ? <span className='bg_red white booked'>Booked</span>
                                                                                    : (
                                                                                        <>
                                                                                            <div className='card_available'>
                                                                                                <span className='d1 white'>
                                                                                                    <span className='d_block'>D1</span>{item3.available_capacity_dose1}
                                                                                                </span>
                                                                                                <span className='dt white'>{item3.available_capacity}</span>
                                                                                                <span className='d2 white'>
                                                                                                    <span className='d_block'>D2</span>{item3.available_capacity_dose2}
                                                                                                </span>
                                                                                            </div>
                                                                                        </>
                                                                                    )
                                                                                }
                                                                                <span>{item3.min_age_limit === 18 ? (item3.max_age_limit ? '18 To 44' : '18 & Above') : '45 & Above'} </span>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                )
                                                            }))}
                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })) : <div className='no_vaccination'>No vaccination center available for this period.</div>)}
            </div>

        </div>
    )
}
