"use client";

import { useState, FormEvent } from "react";

export default function ContactView() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // This is a design preview — wire this up to your email or form
    // service (Resend, Formspree, a route handler, etc.) when you build it out.
    setSent(true);
  }

  return (
    <section className="view active">
      <div className="contact-wrap">
        <div className="hero-eyebrow">Get in touch</div>
        <h1>Tell us about the project.</h1>
        <p>Send a few details and we&apos;ll reply within a couple of days with next steps.</p>

        {sent ? (
          <p className="sent-msg">
            Thanks — that&apos;s been noted for this preview. Hook the form up to a real
            send-path before launch.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Your name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="field">
              <label htmlFor="message">What do you need?</label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us about the project, timeline and budget"
                required
              />
            </div>
            <button className="send-btn" type="submit">
              Send message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
