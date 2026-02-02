import NavBar from './NavBar'
import MainSectionOfHero from './MainSectionOfHero'
const HeroSection = () => {
    return (
        <main className='bg-blue-900 min-h-screen  relative items-center px-15  flex flex-col gap-10'>
            <img src="/white-grid.png" className="absolute w-full h-full invert brightness-0 object-cover opacity-4"/>
            <NavBar />
            <MainSectionOfHero />
           
        </main>
    )
}

export default HeroSection