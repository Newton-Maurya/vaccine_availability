import React from 'react';
import { Link } from 'react-router-dom';

export default function availableSlot2(props) {
    const { SlotsData } = props
    return (
        <div className='slot_container'>
            <div className='name_Info'>
                {SlotsData.length !== 0 && (
                    (SlotsData[0].length !== 0) ? (
                        SlotsData[0].map((item, index) => {
                            return (
                                <div className='card_container'>
                                    <div className='card_info'>
                                        <h4 key={`${index}name`} className='centerName' >
                                            {item.name} <span className='ageLimit'>{item.min_age_limit === 18 ? (item.max_age_limit ? '18 To 44' : '18 & Above') : '45 & Above'} </span>
                                        </h4>
                                        <p key={`${index}adsress`} className='address'>
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
                                        <p className='vaccName'>{item.vaccine}</p>
                                        {/* <span className='vaccPrice'>{item.fee_type === 'Paid' && item.fee}</span> */}
                                        <div className='vaccDose'>
                                            {item.fee_type === 'Paid' &&
                                                <p className='vaccPrice'>{item.fee_type === 'Paid' && 'Rs:'} <b>{item.fee_type === 'Paid' && item.fee}</b></p>}
                                            <p>Dose 1: <b>{item.available_capacity_dose1} Slots</b></p>
                                            <p>Dose 2: <b>{item.available_capacity_dose2} Slots</b></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : <div className='no_vaccination'>No vaccination center available for this date.</div>)}
            </div>
        </div>
    )
}
