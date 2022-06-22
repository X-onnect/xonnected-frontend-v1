import React, { useState } from 'react';
import * as S from './styles';

const Hamburger = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => setClicked(!clicked);

    return (
        <S.HamburgerLines
            onClick = { handleClick }
        >
            <S.Line1 hidden={ !clicked }></S.Line1>
            <S.Line2 hidden={ !clicked }></S.Line2>
            <S.Line3 hidden={ !clicked }></S.Line3>
        </S.HamburgerLines>
    )
};

export { Hamburger }