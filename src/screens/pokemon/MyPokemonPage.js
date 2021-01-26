import React, { useEffect, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useSelector, useDispatch } from 'react-redux';

import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled'
import icon from './../../assets/assets';
import browserHistory from '../../navigation/browserHistory';
import colours from '../../assets/colors/pokemon-types';
import { useParams } from 'react-router-dom';
import { DetailPokemon, PokemonData, PokemonName, PokemonRowUI, OwnedBadge, TypeBadge } from './styles';
import { Button } from 'react-bootstrap';
import MyVerticallyCenteredModal from '../../components/modals/MyVerticallyCenteredModal';
import SimpleTextInput from '../../components/forms/inputs/SimpleTextInput';
import { addMyPokemon, removeMyPokemon } from '../../redux/actions/myPokemonAction';

const PokemonListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px;
`
const PokemonNode = styled.button`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 10px;
    margin: 3px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: none;
    background: white;
    border-radius: 1rem;
    :hover {
        box-shadow: 0 0 0 0.2rem rgba(124, 252, 0, 0.25);
    }
    :active {
        box-shadow: 0 0 0 0.2rem rgba(124, 252, 0, 0.25);
    }
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .pokemonImg { 
        width: 250px;
        height: 250px;
    }
    .pokeBall {
        width: 50px;
        height: 50px;
        padding: 10px;
    }
`
const ButtonRelease = styled.button`
    border-radius: 5px;
    width: ${props => props.width ? props.width : '10rem'};
    margin: 0.5rem 1rem;
    padding: 0.5rem 0.5rem;
    border: 1px solid #e6e6e6;
    background: pink;
    color: red;
    :focus { 
        color: #495057;
        border-color: pink;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(124, 252, 0, 0.25);
    }
`
const PokeName = styled.div`
    border-radius: 5px;
    width: ${props => props.width ? props.width : '10rem'};
    margin: 0.5rem 1rem;
    padding: 0.5rem 0.5rem;
    border: 1px solid #e6e6e6;
    background: ${props=> colours[props.type]};
    color: black;
    :focus { 
        color: black;
        border-color: ${props=> colours[props.type]};
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(124, 252, 0, 0.25);
    }
`


export default function MyPokemonPage() {
    const myPokemon = useSelector(state => state.myPokemon.data)
    const dispatch = useDispatch();
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [alertText, setAlertText] = useState('');

    function releasePokemon() {
        console.log(selectedPokemon)
        const { data, message, error } = removeMyPokemon(selectedPokemon, myPokemon, dispatch)
        if (!error) setSelectedPokemon({});
        setShowModal(false);
        setAlertModal(true);
        setAlertText(message)
    }
    useEffect(() => {
        console.log(selectedPokemon)
    }, [selectedPokemon])
    return <div>
        {selectedPokemon.nickName && <PokeName type={selectedPokemon?.types[0].type?.name}>{selectedPokemon.nickName}</PokeName>} 
        <PokemonListContainer>
            {myPokemon.map((pokemon) => {
                return <PokemonNode onClick={() => { setShowModal(true); setSelectedPokemon({ ...pokemon }) }}>
                    <img width="75px" className="pokemonImg" src={pokemon?.sprites?.front_default} />
                </PokemonNode>
            })}
        </PokemonListContainer>
        <MyVerticallyCenteredModal
            show={showModal}
            header={false}
            footer={false}
            onHide={() => { setShowModal(false) }}
            children={
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span>{selectedPokemon.nickName}</span>
                    <Container style={{ textAlign: 'center' }}>
                        <img width="200px" className="pokemonImg" src={selectedPokemon?.sprites?.front_default} />
                    </Container>
                    <ButtonRelease width='100%' onClick={releasePokemon}>Release</ButtonRelease>
                </div>
            }
        />

        <MyVerticallyCenteredModal
            show={alertModal}
            header={false}
            footer={false}
            onHide={() => { setAlertModal(false) }}
            children={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Container style={{ textAlign: 'center' }}>
                    {alertText}
                </Container>
            </div>}
        />
    </div>
}