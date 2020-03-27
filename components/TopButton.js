import React, {useState} from "react";
import styled from "styled-components";
import Tap from "./Tap";

const Wrapper = styled.View`
  align-self: center;
  position: absolute;
  z-index: 2;
  top: 40;
  flex-direction: row;
`;
const WrapButton = styled.View`
  width: 120;
  height: 30;
  background: ${props => props.active ? '#fff' : '#00b9a9'};
  align-items: center;
  border-width: ${props => props.active ? 2 : 0};
  border-color: ${props => props.active ? '#00b9a9' : '#fff'};
  justify-content: center;
`
const TextStyle = styled.Text`
  color: ${props => !props.active ? '#fff' : '#00b9a9'};
  font-size: 16;
`
const TopButton = () => {
    const [active, setActive] = useState(false)
  return (
    <>
      <Wrapper>
          <Tap onPress={()=>setActive(false)}>
        <WrapButton active={active} style={{borderTopLeftRadius: 7, borderBottomLeftRadius: 7}}>
          <TextStyle active={active}>Map</TextStyle>
        </WrapButton>
          </Tap>
          <Tap onPress={()=>setActive(true)}>
        <WrapButton active={!active} style={{borderTopRightRadius: 7, borderBottomRightRadius: 7}}>
          <TextStyle active={!active}>List</TextStyle>
        </WrapButton>
          </Tap>
      </Wrapper>
    </>
  );
};

export default TopButton;
