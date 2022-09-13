
import type { NextPage } from 'next'
import Nav from '../pages/ui/components/Nav'
import Footer from '../pages/ui/components/Footer'
import HomepageMain from './ui/components/HomepageMain'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <Nav />
      <HomepageMain/>
      <Footer />
    </div>
  )
}
export default Home