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
import { useTradehistorySlice } from '../../slice';

const FilterOrderHistory = () => {
  const { RangePicker } = DatePicker;
  const [time, setTime] = useState(1);
  const dispatch = useDispatch();
  const { actions } = useTradehistorySlice();
  const [startTimeRange, setStartTimeRange]: any = useState();
  const [endTimeRange, setEndTimeRange]: any = useState();
  const onChangeTimeRange = (value: any) => {
    setStartTimeRange(moment(value[0]).valueOf());
    setEndTimeRange(moment(value[1]).valueOf());
  };
  const select1Day = () => {
    const data = {
      startTime: moment().subtract(1, 'day').startOf('day').valueOf(),
      endTime: moment().valueOf(),
    };
    setTime(1);
    dispatch(actions.getTradeHistoryRequest(data));
  };
  const select1Week = () => {
    const data = {
      startTime: moment().subtract(1, 'w').startOf('day').valueOf(),
      endTime: moment().valueOf(),
    };
    setTime(2);
    dispatch(actions.getTradeHistoryRequest(data));
  };
  const select1Month = () => {
    const data = {
      startTime: moment().subtract(1, 'month').startOf('day').valueOf(),
      endTime: moment().valueOf(),
    };
    setTime(3);
    dispatch(actions.getTradeHistoryRequest(data));
  };
  const select3Months = () => {
    const data = {
      startTime: moment().subtract(1, 'month').startOf('day').valueOf(),
      endTime: moment().valueOf(),
    };
    setTime(4);
    dispatch(actions.getTradeHistoryRequest(data));
  };
  const handleSearch = () => {
    const data = {
      startTime: startTimeRange,
      endTime: endTimeRange,
    };
    setTime(1);
    dispatch(actions.getTradeHistoryRequest(data));
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
            1 Day
          </SelectButton>
          <SelectButton
            data-type={time === 2 ? 'active' : 'normal'}
            onClick={select1Week}
          >
            1 Week
          </SelectButton>
          <SelectButton
            data-type={time === 3 ? 'active' : 'normal'}
            onClick={select1Month}
          >
            1 Month
          </SelectButton>
          <SelectButton
            data-type={time === 4 ? 'active' : 'normal'}
            onClick={select3Months}
          >
            3 Months
          </SelectButton>
        </div>
        <TimeRangeGroup>
          <div className="time-range--label">Time</div>
          <RangePicker
            separator={<span>to</span>}
            placeholder={['YYYY-MM-DD', 'YYYY-MM-DD']}
            onChange={onChangeTimeRange}
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </TimeRangeGroup>
        <ResetButton data-bn-type="button" onClick={handleReset}>
          Reset
        </ResetButton>
      </div>
      <div></div>
    </Container>
  );
};
export default FilterOrderHistory;
