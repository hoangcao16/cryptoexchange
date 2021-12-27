import { GrOverview } from 'react-icons/gr';
import { BsFilePersonFill } from 'react-icons/bs';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { BsCoin } from 'react-icons/bs';
import { CgOptions } from 'react-icons/cg';
import { CgArrowsExchangeV } from 'react-icons/cg';
import { GiCrossedSwords } from 'react-icons/gi';

export const data = [
  {
    id: 1,
    icon: GrOverview,
    name: 'Binance Futures Overview',
    description: 'View our full range of crypto-derivative instruments',
  },
  {
    id: 2,
    icon: BsFilePersonFill,
    name: 'Responsible Trading',
    description:
      'Learn how you could practice responsive trading with Binance Futures',
  },
  {
    id: 3,
    icon: RiMoneyDollarBoxLine,
    name: 'USD-M Futures',
    description: 'Perpetual or Quarterly Contracts settled in USDT or BUSD',
  },
  {
    id: 4,
    icon: BsCoin,
    name: 'COIN-M Futures',
    description: 'Perpetual or Quarterly Contracts settled in Cryptocurrency',
  },
  {
    id: 5,
    icon: CgOptions,
    name: 'Vanilla Options',
    description: 'Buy and sell European-style Vanilla Options.',
  },
  {
    id: 6,
    icon: CgArrowsExchangeV,
    name: 'Leveraged Tokens',
    description: 'Enjoy increased leverage without risk of liquidation',
  },
  {
    id: 7,
    icon: GiCrossedSwords,
    name: 'Battle',
    description: 'Battle to Win, Long vs Short',
  },
];
