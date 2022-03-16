import styled from 'styled-components';

const HeaderOrderDetail = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="sellInfo">
          <h4>Buy USDT from WF Nguyễn</h4>
          <p>Created order. Please wait for the system to confirm</p>
        </div>
        <div className="orderInfo">
          <p>
            <span className="clgray">Order number</span>: 12312321632
          </p>
          <p>
            <span className="clgray">Create at</span>: 12/10/2022
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default HeaderOrderDetail;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.p2pGrayLight};
  padding-top: 20px;
  padding-bottom: 10px;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .orderInfo {
      text-align: right;

      .clgray {
        color: ${({ theme }) => theme.grayColor};
      }
    }
  }
`;
