import React from 'react'
import { useRef } from 'react'
import emailjs from '@emailjs/browser';
import Sidebar from "../components/Sidebar";
import "./App.css";


function ContactUs() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_6pcn417', 'template_so9l46q', form.current, 'aPd_ekykvGZmKsGvk')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });


        e.target.reset()
    };


    return (
        <div className='asdd'>
            <Sidebar />
            <div className='des'> We're excited to hear from you! Whether you have a question, a brilliant idea, or just want to say hello,
                our team is ready to listen. Drop us a message below, and we'll make sure to get back to you as soon as possible.
                Your thoughts and feedback are invaluable to us, as they help us improve and tailor our services to meet your needs.
                Let's connect and create something amazing together! </div>

            <div className="contactContainer">

                <h2>Contact Us</h2>
                <form ref={form} onSubmit={sendEmail} >
                    <label>Name:
                        <input type="text" name="user_name" placeholder='Enter name' />
                    </label>
                    <br />
                    <label>Email:
                        <input type="email" name="user_email" placeholder='Enter Your Mail Adress' />
                    </label>
                    <br />
                    <label>Subject:
                        <input type="text" name="subject" placeholder='Enter Subject' />
                    </label>
                    <br />
                    <label>Message:
                        <textarea name="message" placeholder='Type your message here...' />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>

            </div>
        </div>
    )
}

export default ContactUs