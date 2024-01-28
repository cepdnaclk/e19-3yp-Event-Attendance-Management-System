import React from 'react'

function Attendee_page_card() {
    return (
        <div className='attendee_page_card'>
            <div className='rc1'>
                <div className='r1'> Room name </div>
                <div className='session-name'> Session name </div>
            </div>
            <table className='custom-table1'>
                <thead>
                    <tr className='ee'>
                        <th className='table-header'>Name</th>
                        <th className='table-header'>In Time</th>
                        <th className='table-header'>RFID No</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='ee'>
                        <td className='table-data'>ravindu</td>
                        <td className='table-data'>10.00 AM</td>
                        <td className='table-data'>cd23233</td>
                        <td className='table-data'></td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default Attendee_page_card