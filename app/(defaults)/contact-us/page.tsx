import React from "react";
import { COMPANY_NAME, COMPANY_PHONE, COMPANY_EMAIL, COMPANY_ADDRESS, COMPANY_PHONE_HREF, COMPANY_EMAIL_HREF } from "@/constants/app-default";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export const metadata = {
  title: `Contact Us | ${COMPANY_NAME}`,
  description: `Get in touch with ${COMPANY_NAME} for any inquiries, bookings, or support. We are available 24/7 to assist you.`,
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Have questions or need a custom booking? Our team is here to help you 24/7. Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-500 text-sm mb-4">Available 24/7 for bookings and support.</p>
                <a href={COMPANY_PHONE_HREF} className="text-lg font-semibold text-secondary hover:underline">
                  {COMPANY_PHONE}
                </a>
              </div>

              <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-500 text-sm mb-4">We'll respond to your inquiry within 24 hours.</p>
                <a href={COMPANY_EMAIL_HREF} className="text-lg font-semibold text-secondary hover:underline">
                  {COMPANY_EMAIL}
                </a>
              </div>

              <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Location</h3>
                <p className="text-gray-500 text-sm mb-4">Principal office located in:</p>
                <p className="text-lg font-semibold text-gray-900">{COMPANY_ADDRESS}</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <input 
                    type="text" 
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell us more about your request..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full md:w-auto px-8 py-4 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ/Hours Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary font-medium mb-6">
              <Clock className="w-4 h-4" />
              Operational Hours
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">We Never Close</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Our taxi services and support team are available 24 hours a day, 7 days a week, including all public holidays. Your reliable partner in Amsterdam, anytime you need us.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
