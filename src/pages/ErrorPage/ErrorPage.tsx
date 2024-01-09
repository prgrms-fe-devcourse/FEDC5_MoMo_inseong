import styled from '@emotion/styled';
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <StErrorPage>
      {isRouteErrorResponse(error) ? (
        <>
          <h1>
            😓 {error.status} {error.statusText}
          </h1>
          <p></p>
        </>
      ) : error instanceof Error ? (
        <>
          <h1>😓 Unexpected Error</h1>
          <p>Something went wrong.</p>
        </>
      ) : (
        <></>
      )}
      <button
        className="label"
        onClick={() => navigate(-1)}>
        <span
          className="circle"
          aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
        <span className="button-text">뒤로가기</span>
      </button>
    </StErrorPage>
  );
};

const StErrorPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    background: transparent;
    padding: 0;
    font-size: inherit;
    font-family: inherit;

    &.label {
      width: 12rem;
      height: auto;
    }
    &.label .circle {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      position: relative;
      display: block;
      margin: 0;
      width: 3rem;
      height: 3rem;
      background: #282936;
      border-radius: 1.625rem;
    }
    &.label .circle .icon {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
      background: #fff;
    }

    &.label .circle .icon.arrow {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      left: 0.625rem;
      width: 1.125rem;
      height: 0.125rem;
      background: none;
    }
    &.label .circle .icon.arrow::before {
      position: absolute;
      content: '';
      top: -0.25rem;
      right: 0.0625rem;
      width: 0.625rem;
      height: 0.625rem;
      border-top: 0.125rem solid #fff;
      border-right: 0.125rem solid #fff;
      transform: rotate(45deg);
    }
    &.label .button-text {
      transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0.75rem 0;
      margin: 0 0 0 1.85rem;
      color: #282936;
      font-weight: 700;
      line-height: 1.6;
      text-align: center;
      text-transform: uppercase;
    }
    &:hover .circle {
      width: 100%;
    }
    &:hover .circle .icon.arrow {
      background: #fff;
      transform: translate(1rem, 0);
    }
    &:hover .button-text {
      color: #fff;
    }
  }
`;
