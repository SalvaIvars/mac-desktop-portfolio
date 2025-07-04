import { useState } from "react";
import { Rnd } from "react-rnd";
import emailjs from "emailjs-com";

export default function ContactWindow({ onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formData,
        "YOUR_PUBLIC_KEY"
      )
      .then(() => {
        setSending(false);
        setSent(true);
      })
      .catch((err) => {
        setSending(false);
        setError("Error sending email. Please try again.");
        console.error(err);
      });
  };

  return (
    <Rnd
      default={{
        x: 150,
        y: 150,
        width: 400,
        height: 400,
      }}
      minWidth={300}
      minHeight={300}
      bounds="parent"
      enableResizing={false}
      className="z-50"
      dragHandleClassName="drag-handle"
      cancel=".no-drag"
    >
      <div className="flex flex-col w-full h-full bg-[#f2f2f2] border border-gray-300 rounded-xl shadow-md overflow-hidden font-sans">
        {/* Barra superior */}
        <div className="drag-handle flex items-center justify-between px-3 py-1 bg-[#e5e5e5] border-b border-gray-300 rounded-t-xl cursor-move">
          <div className="flex space-x-2">
            <div className="no-drag w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={onClose}></div>
            <div className="no-drag w-3 h-3 rounded-full bg-yellow-400" onClick={onClose}></div>
            <div className="no-drag w-3 h-3 rounded-full bg-green-500" onClick={onClose}></div>
          </div>
          <span className="text-sm text-gray-700">Contact Me</span>
          <div className="w-16" />
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 p-4 overflow-auto">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mb-3 p-2 border border-gray-400 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mb-3 p-2 border border-gray-400 rounded"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mb-3 p-2 border border-gray-400 rounded resize-none flex-grow"
          />
          {error && <p className="text-red-600 mb-2">{error}</p>}
          {sent ? (
            <p className="text-green-600">Message sent! Thanks for contacting me.</p>
          ) : (
            <button
              type="submit"
              disabled={sending}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send"}
            </button>
          )}
        </form>
      </div>
    </Rnd>
  );
}
