import React, {useState} from "react";
import styled from "styled-components";
import Tap from "./Tap";

const Wrapper = styled.View`
  align-self: center;
  position: absolute;
  z-index: 2;
  top: 40px;
  flex-direction: row;
`;
const WrapButton = styled.View`
  width: 120px;
  height: 30px;
  background: ${props => props.active ? '#fff' : '#00b9a9'};
  align-items: center;
  border-width: ${props => props.active ? 2 : 0}px;
  border-color: ${props => props.active ? '#00b9a9' : '#fff'};
  justify-content: center;
`
const TextStyle = styled.Text`
  color: ${props => !props.active ? '#fff' : '#00b9a9'};
  font-size: 16px;
`
const TopButton = (props) => {
   const {active, setActive} = props
  return (
    <>
      <Wrapper>
          <Tap onPress={()=>setActive(false)}>
        <WrapButton active={active} style={{borderTopLeftRadius: 7, borderBottomLeftRadius: 7}}>
          <TextStyle active={active}>Карта</TextStyle>
        </WrapButton>
          </Tap>
          <Tap onPress={()=>setActive(true)}>
        <WrapButton active={!active} style={{borderTopRightRadius: 7, borderBottomRightRadius: 7}}>
          <TextStyle active={!active}>Список</TextStyle>
        </WrapButton>
          </Tap>
      </Wrapper>
    </>
  );
};

export default TopButton;
