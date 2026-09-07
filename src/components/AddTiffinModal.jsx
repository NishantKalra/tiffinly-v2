import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_x0cmxsp';
const EMAILJS_TEMPLATE_ID = 'template_zbs4ybr';
const EMAILJS_PUBLIC_KEY = 'l9Q0c1mtEQImHxIuW';

export default function AddTiffinModal({ isOpen, onClose, onAddSuccess }) {
  const initialFormState = {
    name: '',
    tag: 'pure veg',
    // rating: '4.5',
    phone: '',
    price: '',
    mainImage: '',
    moreImages: '', // Entered as comma-separated URLs
    details: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    // Parse image URLs into clean arrays/values
    const parsedMoreImages = formData.moreImages
      .split(',')
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    // Formatted payload object
    const newTiffinPayload = {
      name: formData.name,
      tag: formData.tag,
    //   rating: parseFloat(formData.rating) || 5.0,
      phone: formData.phone,
      price: Number(formData.price),
      mainImage: formData.mainImage,
      moreImages: parsedMoreImages,
      details: formData.details
    };

    // Parameters mapped to match EmailJS template variables
    const templateParams = {
      service_name: newTiffinPayload.name,
      service_tag: newTiffinPayload.tag,
    //   service_rating: newTiffinPayload.rating,
      contact_phone: newTiffinPayload.phone,
      service_price: `₹${newTiffinPayload.price}`,
      main_image: newTiffinPayload.mainImage,
      more_images: newTiffinPayload.moreImages.join('\n'),
      service_details: newTiffinPayload.details,
      raw_json: JSON.stringify(newTiffinPayload, null, 2)
    };

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setIsSubmitting(false);
      if (onAddSuccess) onAddSuccess(newTiffinPayload);
      handleClose();
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      setIsSubmitting(false);
      setErrorMessage('Failed to send tiffin details. Please check your credentials.');
    });
  };

  const handleClose = () => {
    setFormData(initialFormState);
    setErrorMessage('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Add New Tiffin Service</h2>
            <p className="text-xs text-slate-500">Submit service details to send via EmailJS</p>
          </div>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 font-bold w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Name & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Service Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Annapurna Shuddh Rasoi"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Food Tag</label>
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm bg-white outline-none"
              >
                <option value="pure veg">Pure Veg</option>
                <option value="veg / non-veg">Veg / Non-Veg</option>
                <option value="jain available">Jain Available</option>
              </select>
            </div>
          </div>

          {/* Rating, Phone, Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Rating</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                name="rating"
                required
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm outline-none"
              />
            </div> */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Price per Meal (₹)</label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="120"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm outline-none"
              />
            </div>
          </div>

          {/* Main Image URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Main Image URL</label>
            <input
              type="url"
              name="mainImage"
              required
              value={formData.mainImage}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm outline-none"
            />
          </div>

          {/* Additional Image URLs */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              More Image URLs <span className="text-slate-400 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              name="moreImages"
              value={formData.moreImages}
              onChange={handleChange}
              placeholder="https://url1.jpg, https://url2.jpg"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm outline-none"
            />
          </div>

          {/* Details / Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Service Details & Menu</label>
            <textarea
              name="details"
              required
              rows="3"
              value={formData.details}
              onChange={handleChange}
              placeholder="Authentic North Indian home-cooked meals..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm resize-none outline-none"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
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
              {isSubmitting ? 'Submitting...' : 'Submit for Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}