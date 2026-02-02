import HeroSection from '../components/hero/HeroSection'
import SchoolBrands from '../components/hero/SchoolBrands'
import Expertises from '../components/sections/experties/Expertises'
import FeaturedCourses from '../components/sections/featuredCourses/FeaturedCourses'
import WhyUS from '../components/sections/whyUs/WhyUS'
import Reviews from '../components/sections/reviews/Reviews'
import Footer from '../components/sections/footer/Footer'
const Home = () => {
  return (
    <>
        <HeroSection />
        <SchoolBrands  />
        <main className='px-15'>
          <FeaturedCourses />
          <WhyUS  />
          <Expertises />
          <Reviews />
          <Footer />
        </main>
    </>
  )
}

export default Home