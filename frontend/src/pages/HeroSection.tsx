import Sidebar from '../components/Sidebar'
import Favourites from '../components/Favourites'
import Event from '../components/Event'

function HeroSection() {
  return (
    <>
     <div className='relative'>
      <div>
      <Favourites />
      </div>
      <div className=''>
        <Sidebar />
      </div>
    </div>
    </>
  )
}

export default HeroSection