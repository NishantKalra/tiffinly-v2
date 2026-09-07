import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// Replace these with your actual EmailJS Credentials from https://dashboard.emailjs.com
const EMAILJS_SERVICE_ID = 'service_x0cmxsp';
const EMAILJS_TEMPLATE_ID = 'template_lg7lldb';
const EMAILJS_PUBLIC_KEY = 'l9Q0c1mtEQImHxIuW';

export default function AddReview({ isOpen, onClose, tiffinName }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rating: '5',
    review: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // Map your form fields to match your EmailJS Template parameters
    const templateParams = {
      tiffin_name: tiffinName || 'General Tiffin Service',
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone,
      rating: formData.rating,
      review_text: formData.review
    };

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      setIsSubmitting(false);
      setErrorMessage('Failed to send review. Please try again.');
    });
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    setErrorMessage('');
    setFormData({ name: '', email: '', phone: '', rating: '5', review: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-xl border border-slate-100">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100"
        >
          ✕
        </button>

        {isSubmitted ? (
          /* Success Message View */
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-800">Review Submitted!</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Thank you for sharing your experience. Your review has been emailed to our team and will be visible once we have confirmed it from our end.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition"
            >
              Done
            </button>
          </div>
        ) : (
          /* Review Form View */
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Write a Review</h2>
            {tiffinName && (
              <p className="text-sm text-teal-600 font-medium mb-5">{tiffinName}</p>
            )}

            {errorMessage && (
              <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rahul@example.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
                >
                  <option value="5">★ ★ ★ ★ ★ (5/5) - Excellent</option>
                  <option value="4">★ ★ ★ ★ ☆ (4/5) - Very Good</option>
                  <option value="3">★ ★ ★ ☆ ☆ (3/5) - Average</option>
                  <option value="2">★ ★ ☆ ☆ ☆ (2/5) - Poor</option>
                  <option value="1">★ ☆ ☆ ☆ ☆ (1/5) - Terrible</option>
                </select>
              </div>

              {/* Review Text Area */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Review</label>
                <textarea
                  name="review"
                  required
                  rows="3"
                  value={formData.review}
                  onChange={handleChange}
                  placeholder="Share details of your experience with taste, portion, or delivery..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm resize-none"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 text-sm hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? 'Sending Email...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}