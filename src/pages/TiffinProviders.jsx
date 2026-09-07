import { useState } from 'react';
import TiffinServiceList from '../components/TiffinServiceList';
import { Link } from 'react-router-dom';
import AddTiffinModal from '../components/AddTiffinModal.jsx';

function TiffinProviders() {
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className='main-section bg-teal-600 relative'>
        <div className="content">
          <h1 className='main-heading'>Tiffin Providers in Rajender Nagar</h1>
          <p>A social service project for students and tiffin providers of Ragender Nagar</p>
        </div>
        
        <div className="absolute top-4 right-4 underline opacity-95 text-white">
            <Link to="/">Are you looking for tiffin service?</Link>
        </div>
      </section>

      <section className='secondary-sec max-w-5xl mx-auto p-4 sm:p-6 bg-slate-50'>
        <div>
            <h2>Tiffin Providers shall fill this form</h2>
            <p>If you want to register with us please fill this form and we will get back to you, as soon as we can.</p>
        </div>
        

        <button className='bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition'
        onClick={() => setIsModalOpen(true)}> Form to Register with us</button>

        <p>Havng Trouble? Please reach out on this number: +91 ____________</p>

      </section>

      

      <AddTiffinModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}

export default TiffinProviders
