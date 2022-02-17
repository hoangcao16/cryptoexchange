import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import {
  StyledNavDropdown,
  DropdownItemGroup,
  DropdownItemTitle,
} from './style';
import { useTranslation } from 'react-i18next';
import { SiConvertio } from 'react-icons/si';
import { AiOutlineLayout } from 'react-icons/ai';
import { RiLayoutGridLine } from 'react-icons/ri';
import { GrUpgrade } from 'react-icons/gr';
import { BsPeople } from 'react-icons/bs';
import { AiOutlineLineChart } from 'react-icons/ai';
import { AiOutlineSwap } from 'react-icons/ai';
import { BiBarChartAlt2 } from 'react-icons/bi';

const TradeNav = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const showDropdown = e => {
    setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  const data = [
    {
      id: 1,
      icon: SiConvertio,
      name: t('convert'),
      description: t('easiest-way-to-trade'),
    },
    {
      id: 2,
      icon: AiOutlineLayout,
      name: t('classic'),
      description: t('classic-sub'),
    },
    {
      id: 3,
      icon: RiLayoutGridLine,
      name: t('advanced'),
      description: t('advanced-sub'),
    },
    {
      id: 4,
      icon: GrUpgrade,
      name: t('margin'),
      description: t('increase-your-profits'),
    },
    {
      id: 5,
      icon: BsPeople,
      name: 'P2P',
      description: t('p2p-trading-subtitle'),
      url: '/trade-p2p/p2p',
    },
    {
      id: 6,
      icon: AiOutlineLineChart,
      name: t('strategy-trading'),
      description: t('strategy-trading-sub'),
    },
    {
      id: 7,
      icon: AiOutlineSwap,
      name: t('swap-farming'),
      description: t('swap-farming-sub'),
    },
    {
      id: 8,
      icon: BiBarChartAlt2,
      name: t('fan-token'),
      description: t('fan-token-sub'),
    },
  ];

  return (
    <StyledNavDropdown
      title={t('trade')}
      id="collasible-nav-dropdown"
      show={show}
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      <DropdownItemGroup>
        {data.map((item, index) => {
          return (
            <NavDropdown.Item
              href={item.url ? item.url : '#action/3.1'}
              key={index}
            >
              <item.icon
                style={{
                  fontSize: '24px',
                  color: '#f0b90b',
                  marginRight: '16px',
                }}
              />
              <DropdownItemTitle>
                <span>{item.name}</span>
                <br></br>
                <span className="title_description">{item.description}</span>
              </DropdownItemTitle>
              <FaArrowRight className="arrow-right" />
              <br />
            </NavDropdown.Item>
          );
        })}
      </DropdownItemGroup>
    </StyledNavDropdown>
  );
};
export default TradeNav;
