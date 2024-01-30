import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import Profile1 from '../Images/profile.png'

function Profile() {
    const [modal, setModal] = useState(false);
    // const url = process.env.ACCESS_TOKEN_SECRET;
    // console.log("*******",url);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }



    // const location = useLocation();
    // const emailFromLogin = location?.state?.email || ''; // Get email from state
    // const location = useLocation();
    // const email = location.state.email;

   
    const email = localStorage.getItem('email');
     console.log("this is email",email)

    const [rfidNo, setRfidNo] = useState('');
    const [userId, setUserId] = useState('');
    // console.log("email: ",emailFromLogin);

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
    
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                // Make a GET request to get the user's name
                const response = await axios.get(`http://localhost:5001/api/users/get-name/${email}`);
                setName(response.data.name);
            } catch (error) {
                // Handle errors, show error message, etc.
                console.error('Error fetching name:', error);
            }
        };

        fetchUserName();
    }, [email]);

    return (
        <div  >
            <Sidebar />
            <div className="att">Profile</div>
            <div className='profilee'>

                <div className='profile1' >
                     <img src={Profile1} alt="profile" className="profile" /> 
                    <div className='pr1'>My Profile</div>
                    <div className="profileContents">
                        <p className="name1">{name}</p>
                        <p className="mail1">{email}</p>
                    </div>

                    <button  className="btn-modal" onClick={toggleModal}>
                        Change Password
                    </button>
               
                    {modal && (
                        <div className="modal">
                            <div onClick={toggleModal} className="overlay"></div>
                            <div className="modal-content">
                                <div>
                                    <label className="roomnaame">Current Password</label>
                                    <input type="password" placeholder="Enter current password" autocomplete="off" />

                                    <label className="roomnaame">New Password</label>
                                    <input type="password" placeholder="Enter current password" autocomplete="off" />

                                    <button className="submitbtn" type="submit" > Submit</button>
                                </div>
                                <button className="close-btn" onClick={toggleModal}>
                                    close
                                </button>
                            </div>
                        </div>
                    )}

                </div>


                {/* Assigning RfidNO to UsesrId */}
                <div className=' RFIDuser'>
                    <div className='rw'>Asssign RFID to Attendee</div>
                    <div>
                        <label className='l11' htmlFor="RFID_NO">RFID NO:</label>
                        <input
                            type="text"
                            id="RFID_NO"
                            value={rfidNo}
                            onChange={(e) => setRfidNo(e.target.value)}
                        />
                        <label className='l11' htmlFor="USER_ID">USER ID:</label>
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