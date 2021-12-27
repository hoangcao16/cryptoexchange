import { AiFillBank } from 'react-icons/ai';
import { AiOutlineCreditCard } from 'react-icons/ai';
import { MdPeopleOutline } from 'react-icons/md';
import { BsCreditCard } from 'react-icons/bs';
import { BiDollarCircle } from 'react-icons/bi';
export const data = [
  {
    id: 1,
    icon: AiFillBank,
    name: 'Card Deposit',
    description: 'Deposit EUR via card',
  },
  {
    id: 2,
    icon: AiOutlineCreditCard,
    name: 'Credit/Debit Card',
    description: 'Buy Crypto via card',
  },
  {
    id: 3,
    icon: MdPeopleOutline,
    name: 'P2P Trading',
    description: 'Bank transfer and 100+ options',
  },
  {
    id: 4,
    icon: BsCreditCard,
    name: 'Card Balance',
    description: 'Buy Crypto with your EUR balance',
  },
  {
    id: 5,
    icon: BiDollarCircle,
    name: 'Third-Party Payment',
    description: 'Simplex, Banxa(SEPA)',
  },
];
