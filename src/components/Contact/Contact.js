import { send } from "@emailjs/browser";
import useAlert from "../../utils/useAlert";
import "./Contact.scss"

import React, { useState } from 'react'

const Contact = () => {
  const [userInput, setUserInput] = useState({});
  const { handleAlertClose, handleAlertOpen } = useAlert();

  const onChange = (e) => {
    let obj = { ...userInput, [e.target.name]: e.target.value };
    setUserInput(obj);
    console.log(userInput)
  };

  const sendConnection = async (e) => {
    e.preventDefault();

    try {
      // Sending the connection
      await send(
        "service_slpc948", // Service ID
        "template_e8fzlzc", // Template ID
        userInput,
        "xSW2lCZ66UhGrfhfB" // Public Key - https://dashboard.emailjs.com/admin/account
      );

      // Clearing the form and showing success message
      setUserInput({
        from_email: '',
        from_name: '',
        message: ''
      });
      handleAlertOpen("success", "Your message has been sent successfully.", '#1fae15');
      setTimeout(() => {
        handleAlertClose();
      }, 5000);

    } catch (err) {
      // Handling error
      console.log(err);
      handleAlertOpen("error", "Something went wrong. Please try again.", 'red');
      setTimeout(() => {
        handleAlertClose();
      }, 5000);
    }
  }



  return (
    <div className="contact">
      <section>
        <h2 className="title">Let's Talk</h2>
        <p className="sub-title">Well, hello there!.</p>
        <p className="sub-title">It's always nice to have a new visitor to my little corner of the internet. <strong style={{ cursor: 'pointer' }}><a className="text-danger" style={{ textDecoration: 'underline' }} target="_blank" href="https://portfolio-zaidakbar.netlify.app/">I'm Zaid Akbar</a></strong>,
          and I'm here to make you smile, laugh, and most importantly, help you out.</p>
        <p className="sub-title">If you have any questions, comments, or concerns, fill out the form below and I'll try my best to make you happy. If you're a robot or a spammer, please don't bother. But if you're a real person, let's get to know each other!.</p>
        <p className="sub-title">I promise not to send you any cat videos (unless you ask for them), but I can help you with Website Design, Website Development, Web Performance Optimization, Website Maintenance and Support. So, drop me a line and let's see what we can do together.</p>
      </section>

      <section className="mt-5">
        <form onSubmit={sendConnection}>
          <aside className="d-flex align-items-center gap-3 mb-4">
            <div className="form-group w-100">
              <label htmlFor="from_name">your name</label>
              <input required value={userInput.from_name} onChange={onChange} name="from_name" className="form-control rounded-0" />
            </div>

            <div className="form-group w-100">
              <label htmlFor="from_email">your email</label>
              <input type="email" required value={userInput.from_email} onChange={onChange} name="from_email" className="form-control rounded-0" />
            </div>
          </aside>

          <aside>
            <div className="form-group">
              <label htmlFor="message">PLEASE TELL A BIT ABOUT YOURSELF & IF ANY COMPLAINTS OR COMPLIMENTS*</label>
              <textarea required value={userInput.message} onChange={onChange} name="message" className="form-control rounded-0" />
            </div>
          </aside>

          <aside>
            <button type="submit" className="btn border-0 rounded-0 w-100 mt-5">send connection request now.</button>
          </aside>
        </form>
      </section>
    </div>
  )
}

export default Contact