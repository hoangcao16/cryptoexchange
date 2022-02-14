/* eslint-disable react-hooks/exhaustive-deps */
import { ColLeft, ColRight } from './style';
import BuyForm from './components/BuyForm';
import SellForm from './components/SellForm';
import numeral from 'numeral';
import { useSelector } from 'react-redux';
import { selectGetBalancePair } from '../../slice/selectors';
import { getToken } from 'app/components/common/common';
import { useParams } from 'react-router-dom';

const LimitForm = ({ wallet }: any) => {
  const type = 'LIMIT';
  const balancePair: any = useSelector(selectGetBalancePair);
  const baseAmount = balancePair?.data?.base_amount;
  const quoteAmount = balancePair?.data?.quote_amount;
  let { pair } = useParams();
  const findIndex: any = pair?.indexOf('_');
  return (
    <>
      <ColLeft>
        <div className="balance">
          <div className="balance-name">Avbl</div>
          <div className="balance-coin">
            {getToken() ? numeral(quoteAmount).format('0,0.000000') : '-'}{' '}
            {pair?.substring(findIndex + 1)}
          </div>
        </div>
        <BuyForm
          baseSymbol={pair?.substring(0, findIndex)}
          quoteSymbol={pair?.substring(findIndex + 1)}
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
            {pair?.substring(0, findIndex)}
          </div>
        </div>
        <SellForm
          baseSymbol={pair?.substring(0, findIndex)}
          quoteSymbol={pair?.substring(findIndex + 1)}
          baseAvlb={baseAmount}
          wallet={wallet}
          type={type}
        />
      </ColRight>
    </>
  );
};
export default LimitForm;
