import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import Profile1 from '../Images/profile.png'

function Profile() {
    const location = useLocation();
    const emailFromLogin = location?.state?.email || ''; // Get email from state

    const [rfidNo, setRfidNo] = useState('');
    const [userId, setUserId] = useState('');
    console.log("email: ",emailFromLogin);

    const handleAssign = async () => {
        try {
        await axios.put(`http://localhost:5001/api/attendees/update-rfid/${userId}`, {
            rfidNo,
        });

        console.log('RFID assigned successfully!');

        // Clear input values
        setRfidNo('');
        setUserId('');

        } catch (error) {
        console.error('Error assigning RFID:', error);
        }
    };

    return (
        <div  >
            <Sidebar />
            <div className='profilee'>

                <div className='profile1' >
                    {/* <img src={Profile1} alt="profile" className="profile" /> */}
                    <div>My Profile</div>
                    <div className="profileContents">
                        <p className="name">John Smith</p>
                        <p>{emailFromLogin}</p>
                    </div>

                    <button  className="btn-modal">
                        Change
                    </button>
                </div>


                {/* Assigning RfidNO to UsesrId */}
                <div className=' RFIDuser'>
                    <div>Asssign RFID to Attendee</div>
                    <div>
                        <label htmlFor="RFID_NO">RFID NO:</label>
                        <input
                            type="text"
                            id="RFID_NO"
                            value={rfidNo}
                            onChange={(e) => setRfidNo(e.target.value)}
                        />
                        <label htmlFor="USER_ID">USER ID:</label>
                        <input
                            type="text"
                            id="USER_ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <button className="btn-modal" onClick={handleAssign}>
                        Assign
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Profile