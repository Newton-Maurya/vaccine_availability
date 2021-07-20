import React from 'react'
export default function SelectContainer(props) {
    const {handleChange, StateName, district, handleSubmit} = props
    return (
        <div>
            <div className="select-box">
                <form onSubmit={handleSubmit}>
                    <select id="select-box1" className="select" defaultValue='0'  onChange={handleChange}>
                    <option value='0' disabled  className='options'>Select State</option>
                        {StateName.map((item, index) => <option key={index} value={item.state_id}>{item.state_name}</option>)}
                    </select>
                    <select id="select-box2" className="select-district" defaultValue='0'>
                        <option value='0' disabled className='options'>Select District</option>
                        {district.map((item, index) => <option key={index}  value={item.district_id}>{item.district_name}</option>)}
                    </select>
                    <button type='submit' className='serch_btn'>Search</button>
                </form>
            </div>
        </div>
    )
}