
import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';

function App() {
  
  return (
    <>       
     <WelcomeMessage />
      <Header />
      <MainContent />
      <UserProfile 
      name="Keyman Luxy Sackey" age="19" bio="Loves coding"
     />

       <Footer />

    </>
  )
}

export default App
