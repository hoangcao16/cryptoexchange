import NavMenu from 'app/components/Navbar';
import WarningAlert from 'app/components/Alert';
import AccordionNav from 'app/components/Accordion';
import HomeContentContainer from 'app/container/HomeContainer/HomeContentContainer';
const HomeContainer = () => {
  return (
    <>
      <header>
        <NavMenu></NavMenu>
        <WarningAlert></WarningAlert>
        <AccordionNav></AccordionNav>
      </header>
      <HomeContentContainer></HomeContentContainer>
    </>
  );
};

export default HomeContainer;
