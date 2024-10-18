import { useContext, useState } from "react"
import { authContext } from "../context/AuthContext"
import { BASE_URL, token } from "../config";
import { toast } from "react-toastify";


const Contact = () => {
  const data = useContext(authContext);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(data.user?.email);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data)
    if(data.user === null){
      return toast.error("To submit your feedback, please register first.")
    }
    try {
      const response = await fetch(`${BASE_URL}/contact/contact-submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ subject, message }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        // Reset form fields
        setSubject("");
        setMessage("");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      
      toast.error(err.message);
      
    }
  };


  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-clip text__para">Got a technical issue? Want to send feedback about a beta features? Let us know.</p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="form__label">Your Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className="form__input mt-1"
              required placeholder="Enter your email address" 
            />
          </div>
          <div>
            <label htmlFor="subject" className="form__label">Subject</label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know how we can help you"
              className="form__input mt-1"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">Your Message</label>
            <textarea
              rows={6}
              id="message"
              placeholder="Leave a comment...."
              className="form__input mt-1 resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn rounded sm:w-fit">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default Contact
