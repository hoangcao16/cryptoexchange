import { ColLeft, ColRight } from './style';
import BuyForm from './components/BuyForm';
import SellForm from './components/SellForm';
import numeral from 'numeral';
import { useSelector } from 'react-redux';
import { selectGetBalancePair } from '../../slice/selectors';
import { getToken } from 'app/components/common/common';
import { useState, useEffect } from 'react';

const getBaseSymbol = () => {
  return JSON.parse(JSON.stringify(localStorage.getItem('base_symbol') || ''));
};
const getQuoteSymbol = () => {
  return JSON.parse(JSON.stringify(localStorage.getItem('quote_symbol') || ''));
};
const LimitForm = ({ wallet }: any) => {
  const type = 'LIMIT';
  const balancePair: any = useSelector(selectGetBalancePair);
  const [baseSymbol, setBaseSymbol] = useState('');
  const [quoteSymbol, setQuoteSymbol] = useState('');
  const baseAmount = balancePair.data.base_amount;
  const quoteAmount = balancePair.data.quote_amount;
  useEffect(() => {
    function hanldeGetSymbol() {
      setBaseSymbol(getBaseSymbol());
      setQuoteSymbol(getQuoteSymbol());
    }
    window.addEventListener('storage', hanldeGetSymbol);
    return () => window.removeEventListener('storage', hanldeGetSymbol);
  }, []);
  return (
    <>
      <ColLeft>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">
            {getToken() ? numeral(quoteAmount).format('0,0.000000') : '-'}{' '}
            {quoteSymbol}
          </div>
        </div>
        <BuyForm
          baseSymbol={baseSymbol}
          quoteSymbol={quoteSymbol}
          quoteAvlb={quoteAmount}
          wallet={wallet}
          type={type}
        />
      </ColLeft>
      <ColRight>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">
            {getToken() ? numeral(baseAmount).format('0,0.000000') : '-'}{' '}
            {baseSymbol}
          </div>
        </div>
        <SellForm
          baseSymbol={baseSymbol}
          quoteSymbol={quoteSymbol}
          baseAvlb={baseAmount}
          wallet={wallet}
          type={type}
        />
      </ColRight>
    </>
  );
};
export default LimitForm;
