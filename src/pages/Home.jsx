import { useState } from 'react';
import TiffinServiceList from '../components/TiffinServiceList';
import { Link } from 'react-router-dom';

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className='main-section bg-teal-600 relative'>
        <div className="content">
          <h1 className='main-heading'>Tiffin Providers in Rajender Nagar</h1>
          <p>A social service project for students and tiffin providers of Ragender Nagar</p>
        </div>
        
        <div className="absolute top-4 right-4 underline opacity-95 text-white">
            <Link to="/tiffin-provider">Are you a tiffin provider?</Link>
        </div>
      </section>
      <TiffinServiceList></TiffinServiceList>
    </>
  )
}

export default Home
