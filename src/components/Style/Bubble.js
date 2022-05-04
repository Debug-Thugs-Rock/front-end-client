
import styled from 'styled-components'

export const Bubble = styled.div`
 border: 1px solid red;
  background-color:#fff;
  padding:20px;
  border-radius:100px;
  min-width:40px;
  max-width:220px;
  min-height:40px;
  width:200px;
  height:200px;
  margin:30px;
  position:relative;
  align-items:center;
  justify-content:center;
  text-align:center;
  &:before,
  &:after {
      border: 1px solid red;
      content:"";
  background-color:#fff;
  border-radius:50%;
  display:block;
  position:absolute;
  z-index:-1;
  }
  &:before {
      width:44px;
  height:44px;
  top:-12px;
  left:28px;
  box-shadow:-50px 30px 0 -12px #fff;
  }
  &:after {
        bottom:-10px;
  right:26px;
  width:30px;
  height:30px;
  box-shadow:40px -34px 0 0 #fff,
             -28px -6px 0 -2px #fff,
             -24px 17px 0 -6px #fff,
             -5px 25px 0 -10px #fff;
  }
`
