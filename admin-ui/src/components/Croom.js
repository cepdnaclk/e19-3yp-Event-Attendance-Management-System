
import React, { useState } from 'react';

export default function Croom() {

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

        <div className="cx">

            <button onClick={toggleModal} className="btn-modal">
                Add session
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div>
                            <label htmlFor="sessionNo">Session No:</label>
                            <input type="text" id="sessionNo" placeholder="Enter session No" />

                            <label htmlFor="sessionName">Session Name:</label>
                            <input type="text" id="sessionName" placeholder="Enter session name" />

                            <label htmlFor="speakerName">Speaker Name:</label>
                            <input type="text" id="speakerName" placeholder="Enter speaker name" />

                            <label htmlFor="time">Time:</label>
                            <input type="text" id="time" placeholder="Enter time" />


                            <button type="submit">Submit</button>
                        </div>
                        <button className="close-modal" onClick={toggleModal}> CLOSE</button>
                    </div>
                </div>
            )}
            <div className="cardbox1">  This is example room ,when user input a sessions , it should display in here</div>

        </div>
    )
}

