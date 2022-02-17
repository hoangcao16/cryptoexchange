import {
  Container,
  SelectButton,
  TimeRangeGroup,
  ResetButton,
  SearchButton,
} from './style';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useOrderhistorySlice } from '../../slice';
import { useTranslation } from 'react-i18next';

const FilterOrderHistory = () => {
  const { RangePicker } = DatePicker;
  const { t } = useTranslation();
  const [time, setTime] = useState(1);
  const dispatch = useDispatch();
  const { actions } = useOrderhistorySlice();
  const [startTimeRange, setStartTimeRange]: any = useState();
  const [endTimeRange, setEndTimeRange]: any = useState();
  const onChangeTimeRange = (value: any) => {
    setStartTimeRange(moment(value[0]).valueOf());
    setEndTimeRange(moment(value[1]).valueOf());
  };
  const select1Day = () => {
    const data = {
      startTime: moment().startOf('day').valueOf(),
      endTime: moment().valueOf(),
      status: 'ALL',
      pageIndex: 0,
      pageSize: null,
    };
    setTime(1);
    dispatch(actions.getOrderhistoryRequest(data));
  };
  const select1Week = () => {
    const data = {
      startTime: moment().subtract(1, 'w').startOf('day').valueOf(),
      endTime: moment().valueOf(),
      status: 'ALL',
      pageIndex: 0,
      pageSize: null,
    };
    setTime(2);
    dispatch(actions.getOrderhistoryRequest(data));
  };
  const select1Month = () => {
    const data = {
      startTime: moment().subtract(1, 'month').startOf('day').valueOf(),
      endTime: moment().valueOf(),
      status: 'ALL',
      pageIndex: 0,
      pageSize: null,
    };
    setTime(3);
    dispatch(actions.getOrderhistoryRequest(data));
  };
  const select3Months = () => {
    const data = {
      startTime: moment().subtract(1, 'month').startOf('day').valueOf(),
      endTime: moment().valueOf(),
      status: 'ALL',
      pageIndex: 0,
      pageSize: null,
    };
    setTime(4);
    dispatch(actions.getOrderhistoryRequest(data));
  };
  const handleSearch = () => {
    const data = {
      startTime: startTimeRange,
      endTime: endTimeRange,
      status: 'ALL',
      pageIndex: 0,
      pageSize: null,
    };
    setTime(1);
    dispatch(actions.getOrderhistoryRequest(data));
  };
  const handleReset = () => {
    select1Day();
  };
  return (
    <Container>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          <SelectButton
            data-type={time === 1 ? 'active' : 'normal'}
            onClick={select1Day}
          >
            1 {t('day')}
          </SelectButton>
          <SelectButton
            data-type={time === 2 ? 'active' : 'normal'}
            onClick={select1Week}
          >
            1 {t('week')}
          </SelectButton>
          <SelectButton
            data-type={time === 3 ? 'active' : 'normal'}
            onClick={select1Month}
          >
            1 {t('month')}
          </SelectButton>
          <SelectButton
            data-type={time === 4 ? 'active' : 'normal'}
            onClick={select3Months}
          >
            3 {t('months')}
          </SelectButton>
        </div>
        <TimeRangeGroup>
          <div className="time-range--label">{t('time')}</div>
          <RangePicker
            separator={<span>{t('to')}</span>}
            placeholder={['YYYY-MM-DD', 'YYYY-MM-DD']}
            onChange={onChangeTimeRange}
          />
          <SearchButton onClick={handleSearch}>{t('search')}</SearchButton>
        </TimeRangeGroup>
        <ResetButton data-bn-type="button" onClick={handleReset}>
          {t('reset')}
        </ResetButton>
      </div>
      <div></div>
    </Container>
  );
};
export default FilterOrderHistory;
