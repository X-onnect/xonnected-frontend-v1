import styled from "styled-components"

export const HamburgerLines = styled.div`
    display: block;
    height: 26px;
    width: 32px;
    position: absolute;
    top: 17px;
    left: 20px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const Line = styled.div`
    display: block;
    height: 4px;
    width: 100%;
    border-radius: 10px;
    background: #0e2431;
`

export const Line1 = styled.span`
    display: block;
    height: 4px;
    width: 100%;
    border-radius: 10px;
    background: #0e2431;
    transform-origin: 0% 0%;
    transition: transform 0.4s ease-in-out;
    transform: ${(props) => (props.hidden? 'none' : 'rotate(45deg)' )};
`

export const Line2 = styled.span`
    display: block;
    height: 4px;
    width: 100%;
    border-radius: 10px;
    background: #0e2431;
    transition: opacity 0.2s ease-in-out;
    opacity: ${(props) => (props.hidden? '1' : '0' )}
`

export const Line3 = styled.span`
    display: block;
    height: 4px;
    width: 100%;
    border-radius: 10px;
    background: #0e2431;
    transform-origin: 0% 100%;
    transition: transform 0.4s ease-in-out;
    transform: ${(props) => (props.hidden? 'none' : 'rotate(-45deg)' )}
`