
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled'
import { Link } from 'react-router-dom';
import icon from '../../assets/assets';

const media = {
    desktop: '@media(min-width: 1000px)'
}

const Header = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 20;
    ${media.desktop} {
        position: relative;
    }
    background: white;
    padding: 0.5rem 0.5em;
    box-shadow: 1px 1px 10px 1px #d9d9d9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
        display: flex;
        align-items: center;
        height: 30px;
        padding: 0px 20px;
        color: black;
        text-decoration: auto;
    }
    a:hover {
        background: rgba(0,0,0, 0.1);
        text-decoration: auto;
    }
`

export default function MainHeader(props) {
    return <Header>
        <Link to="/">Pokemon</Link>
        <Link to="/myPokemon">
            <img width={30} height={30} src={icon.icon.pokeball} />
        </Link>
    </Header>
}