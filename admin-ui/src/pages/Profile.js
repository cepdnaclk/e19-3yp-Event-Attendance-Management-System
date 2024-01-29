import React from 'react'
import Sidebar from '../components/Sidebar'
import Profile1 from '../Images/profile.png'

function Profile() {
    return (
        <div  >
            <Sidebar />
            <div className='profilee'>

                <div className='profile1' >
                    <img src={Profile1} alt="profile" className="profile" />
                    <div>My Profile</div>
                    <div className="profileContents">
                        <p className="name">John  Smith</p>
                        <p>johnsmith@gmail.com</p>
                    </div>

                    <button  className="btn-modal">
                        Change
                    </button>


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