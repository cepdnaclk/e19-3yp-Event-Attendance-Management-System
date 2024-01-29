import React from 'react';

function AttendeePageCard(props) {
  return (
    <div className='attendee_page_card'>
      <div className='rc1'>
        <div className='r1'>{props.roomName}</div>
        <div className='session-name'>{props.sessionName}</div>
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
            <td className='table-data'>{props.attendeeName}</td>
            <td className='table-data'>{props.inTime}</td>
            <td className='table-data'>{props.rfidNo}</td>
            <td className='table-data'></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AttendeePageCard;
