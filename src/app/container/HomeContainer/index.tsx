import NavMenu from 'app/components/Navbar';
import WarningAlert from 'app/components/Alert';
import AccordionNav from 'app/components/Accordion';
import ChartContainer from 'app/container/HomeContainer/ChartContainer';
import TradeFormContainer from 'app/container/HomeContainer/TradeFormContainer';
const HomeContainer = () => {
  return (
    <>
      <header>
        <NavMenu></NavMenu>
        <WarningAlert></WarningAlert>
        <AccordionNav></AccordionNav>
      </header>
      <ChartContainer></ChartContainer>
      <TradeFormContainer></TradeFormContainer>
    </>
  );
};

export default HomeContainer;
