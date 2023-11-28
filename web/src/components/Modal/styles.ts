import styled from 'styled-components'

export const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100%;
  background-color: var(--colors-background-default-75);
`

export const ModalContent = styled.div`
  position: fixed;
  top: 20vh;
  width: calc(100vw - 2rem);
  max-width: 36rem;
  margin: 0 1rem;
  padding: 1rem;
  border-radius: var(--borders-radius-big);
  background-color: var(--colors-background-default-100);

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 2rem;
  }
`

export const ModalOutsideBackground = styled.div`
  width: 100vw;
  height: 100%;
`
