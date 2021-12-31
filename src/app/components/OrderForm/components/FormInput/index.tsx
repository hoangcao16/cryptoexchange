import styled from 'styled-components';
interface ContainerProps {
  prefix: string;
  suffix: string;
  id: string;
  Change?: any;
}
const FormInput = (props: ContainerProps) => {
  const { prefix, suffix, id, Change } = props;
  return (
    <Container>
      <Div>
        <div className="input-prefix">
          <label htmlFor={id}>{prefix}</label>
        </div>
        <input
          id={id}
          className="inputtext"
          type="number"
          min="0.0001"
          step="0.0001"
          onChange={Change}
        />
        <div className="input-suffix">
          <label htmlFor={id}>{suffix}</label>
        </div>
      </Div>
    </Container>
  );
};
export default FormInput;
export const FormInputDisabled = (props: ContainerProps) => {
  const { prefix, suffix, id, Change } = props;
  return (
    <Container>
      <Div className="input-disabled">
        <div className="input-prefix">
          <label htmlFor={id}>{prefix}</label>
        </div>
        <input
          id={id}
          className="inputtext"
          type="number"
          min="0.0001"
          step="0.0001"
          onChange={Change}
          disabled
          placeholder="Market"
        />
        <div className="input-suffix">
          <label htmlFor={id}>{suffix}</label>
        </div>
      </Div>
    </Container>
  );
};
export const Container = styled.div`
  margin: 16px 0px 8px;
  min-width: 0px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  height: 40px;
  line-height: 40px;
  background-color: rgba(43, 47, 54, 0.9);
  .input-disabled {
    border-color: rgb(71, 77, 87);
    background-color: rgb(71, 77, 87);
    &:hover {
      border-color: rgb(71, 77, 87);
    }
    input {
      cursor: default;
    }
  }
`;
export const Div = styled.div`
  margin: 0px;
  min-width: 0px;
  display: inline-flex;
  position: relative;
  -webkit-box-align: center;
  align-items: center;
  line-height: 1.6;
  border: 1px solid rgba(43, 47, 54, 0.8);
  border-radius: 4px;
  width: 100%;
  height: 100%;
  font-size: 14px;
  &:hover {
    border-color: rgb(240, 185, 11);
  }
  .inputtext {
    color: rgb(234, 236, 239);
    font-size: 14px;
    padding: 0 6px 0 4px;
    text-align: right;
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    width: 100%;
    height: 100%;
    outline: none;
    background-color: inherit;
    opacity: 1;
    border: none !important;
}
  }
  .input-prefix {
    flex-shrink: 0;
    margin-left: 8px;
    min-width: 48px;
    font-size: 14px;
    color: rgb(183, 189, 198);
    label {
      margin: 0px;
      min-width: 0px;
      font-size: 14px;
      color: rgb(132, 142, 156);
      display: inline-block;
      text-align: right;
    }
  }
  .input-suffix {
    flex-shrink: 0;
    margin-right: 8px;
    font-size: 14px;
    color: rgb(132, 142, 156);
    label {
      margin: 0px;
      min-width: 0px;
      font-size: 14px;
      color: rgb(234, 236, 239);
      display: inline-block;
      text-align: right;
    }
  }
`;