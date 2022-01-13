// From React Docs (modified);
import React from 'react';
import Styled from 'styled-components';


const Wrapper = Styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

const M = Styled.h1`
  position: absolute;
  top: 50vh;
  left: 50vw;
  z-index: 10;
  color: #000;
`

const RedLight = Styled.section`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  opacity: 0;
  transition: 500ms;
  background-color: rgb(255 0 0 / 20%);
  box-shadow: 0px 0px 70px red, 0px 0px 70px red;
  animation: pulse infinite alternate 3s;

  @keyframes pulse {
    to {
      opacity: 1;
    }
  }

  :hover {
    transform: scale(2);
    cursor: not-allowed;
  }
`

class ErrorBoundary extends React.Component {
  state: { hasError: Boolean };
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper>
          <M>Why you just listen to me?</M>
          <RedLight/>
        </Wrapper>
      )
    }
    return this.props.children; 
  }
}

export { ErrorBoundary }