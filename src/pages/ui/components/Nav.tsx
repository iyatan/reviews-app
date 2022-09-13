import Image from 'next/image'
import Link from 'next/link'
import HeaderLink from './HeaderLink'

const Nav = () => (
  <header   className='flex justify-around items-center py-4 '>
    <div className="relative w-36 h-10">
        Feedback App
    </div>
    <div className='flex items-center sm:divide-x divide-gray-300'>
        <div className='hidden sm:flex space-x-8 pr-4'>
            <HeaderLink/>
            <HeaderLink/>
            <HeaderLink/>
        </div>
    </div>
    <div className='P1-4'>

        <button className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2">
            Sign In
        </button>

    </div>

    
  </header>
)

export default Nav