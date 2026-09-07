import React, { useState } from 'react';
import TIFFIN_SERVICES from '../data/tiffinData.json';
import AddReview from './AddReview';

const TagBadge = ({ type }) => {
  const styles = {
    "pure veg": "bg-emerald-100 text-emerald-800 border-emerald-300",
    "no onion-garlic": "bg-teal-100 text-teal-800 border-teal-300",
    "non veg": "bg-rose-100 text-rose-800 border-rose-300"
  };

  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border capitalize ${styles[type] || 'bg-gray-100 text-gray-800'}`}>
      {type}
    </span>
  );
};

export default function TiffinServiceList() {
  const [selectedService, setSelectedService] = useState(null);
  // State for Review Popup
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-slate-50 min-h-screen">
      {/* <h1 className="text-3xl font-bold text-slate-800 mb-6">Tiffin Service Providers</h1> */}

      {/* Provider List */}
      <div className="grid gap-6">
        {TIFFIN_SERVICES.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-5">
            <img 
              src={item.mainImage} 
              alt={item.name} 
              className="w-full sm:w-48 h-40 object-cover rounded-lg flex-shrink-0" 
            />

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h2 className="text-xl font-bold text-slate-800">{item.name}</h2>
                  <span className="bg-teal-100 text-amber-900 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    ★ {item.rating}
                  </span>
                </div>

                <div className="mt-2">
                  <TagBadge type={item.tag} />
                </div>

                <div className="mt-3 text-sm text-slate-600 space-y-1">
                  <p><span className="font-medium text-slate-700">Phone:</span> {item.phone}</p>
                  <p><span className="font-medium text-slate-700">Price:</span> ₹{item.price} / meal</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedService(item)}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-xl">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedService(null)}
              className="fixed bottom-10 right-1/2 translate-x-1/2 text-slate-0 hover:text-slate-600 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 z-10"
            >
              ✕
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              <img 
                src={selectedService.mainImage} 
                alt={selectedService.name} 
                className="w-full h-56 object-cover rounded-xl"
              />

              <div>
                <div className="flex justify-between items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-800">{selectedService.name}</h2>
                  <span className="bg-teal-100 text-amber-900 text-sm font-bold px-2.5 py-1 rounded flex items-center gap-1">
                    ★ {selectedService.rating}
                  </span>
                </div>
                <div className="mt-2">
                  <TagBadge type={selectedService.tag} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-sm border border-slate-100">
                <div>
                  <p className="text-slate-500">Phone Number</p>
                  <p className="font-semibold text-slate-800">{selectedService.phone}</p>
                </div>
                <div>
                  <p className="text-slate-500">Price per Meal</p>
                  <p className="font-semibold text-slate-800">₹{selectedService.price}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">About the Service</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedService.details}</p>
              </div>

              {/* More Images Gallery */}
              {selectedService.moreImages.length > 0 && (
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">More Images</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedService.moreImages.map((imgUrl, idx) => (
                      <img 
                        key={idx} 
                        src={imgUrl} 
                        alt={`${selectedService.name} extra ${idx + 1}`} 
                        className="w-full h-28 object-cover rounded-lg border border-slate-100"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              <div className="border-t border-slate-200 pt-4 relative">
                <h3 className="font-semibold text-slate-800 mb-3">Customer Reviews</h3>
                <button 
                  onClick={() => setIsReviewOpen(true)}
                  className="absolute top-4 right-0 text-xs bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-md font-medium transition"
                >
                  + Add Review
                </button>
                <div className="space-y-3">
                  {selectedService.reviews.map((rev) => (
                    <div key={rev.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm text-slate-800">{rev.name}</span>
                        <span className="text-teal-600 text-xs font-bold">★ {rev.rating}/5</span>
                      </div>
                      <p className="text-xs text-slate-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}


      {/* AddReview Popup Component */}
      <AddReview 
        isOpen={isReviewOpen} 
        onClose={() => setIsReviewOpen(false)} 
        tiffinName={selectedService?.name}
      />
    </div>

    
  );
}