import { useState } from 'react';
import { Div, Content, Container, StyledArrow } from './style';
import { ReactComponent as Arrow } from 'app/assets/img/arrow.svg';
import data from './data';
const AccordionNav = () => {
  const [show, setShow] = useState(false);
  const dataView = data.slice(0, 3);
  return (
    <Container>
      <Div>
        <Content>
          {show
            ? data.map((item, index) => {
                return (
                  <a
                    href="/#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-item"
                    key={index}
                  >
                    <div className="title">{item.title}</div>
                    <div className="notification">{item.notification}</div>
                  </a>
                );
              })
            : dataView.map((item, index) => {
                return (
                  <a
                    href="/#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="content-item"
                    key={index}
                  >
                    <div className="title">{item.title}</div>
                    <div className="notification">{item.notification}</div>
                  </a>
                );
              })}
        </Content>
        <StyledArrow Show={show}>
          <Arrow onClick={() => setShow(!show)} />
        </StyledArrow>
      </Div>
    </Container>
  );
};
export default AccordionNav;
