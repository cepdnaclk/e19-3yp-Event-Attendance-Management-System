
import Sidebar from '../components/Sidebar'
import Profile1 from '../Images/profile.png'
import React, { useState } from "react";

function Profile() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div  >
            <Sidebar />

            <div className="att">Profile</div>
            <div className='profilee'>

                <div className='profile1' >
                    <img src={Profile1} alt="profile" className="profile" />
                    <div>My Profile</div>
                    <div className="profileContents">
                        <p className="name">John  Smith</p>
                        <p>johnsmith@gmail.com</p>
                    </div>

                    <button className="btn-modal" onClick={toggleModal}>
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






                <div className=' RFIDuser'>
                    <div>Asssign RFID to user</div>
                    <div>
                        <label htmlFor="RFID_NO">RFID NO:</label>
                        <input
                            type="text"
                            id="RFID_NO"
                        />
                        <label htmlFor="USER_ID">USER ID:</label>
                        <input
                            type="text"
                            id="USER_ID"
                        />
                    </div>
                    <button className="btn-modal">
                        Assign
                    </button>

                </div>


            </div>

        </div>
    )
}

export default Profile