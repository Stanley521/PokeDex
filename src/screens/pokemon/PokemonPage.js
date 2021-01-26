import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled'
import icon from './../../assets/assets';
import { useParams } from 'react-router-dom';
import MyVerticallyCenteredModal from '../../components/modals/MyVerticallyCenteredModal';
import SimpleTextInput from '../../components/forms/inputs/SimpleTextInput';
import { addMyPokemon } from '../../redux/actions/myPokemonAction';

const GET_POKEMON = gql`
query pokemon($name: String!) {
    pokemon(name: $name) {
        id
        name
        abilities {
          ability {
            url
            name
          }
        }
        base_experience
        forms {
          url
          name
        }
        height
        is_default
        order
        weight
        location_area_encounters
        moves{
          move {
             url
            name
          }
        }
        species {
            url
            name
        }
        sprites {
          back_default
          back_female
          back_shiny
          back_shiny_female
          front_default
          front_female
          front_shiny
          front_shiny_female
        }
        stats{
          base_stat
          effort
          stat {
            url
            name
          }
        }
        types {
          slot
          type {
            url
            name
          }
        }
    }
}
`;
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .pokemonImg { 
        width: 250px;
        height: 250px;
        margin-top: 3rem;
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
    color: black;
    :focus { 
        color: #495057;
        border-color: pink;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(124, 252, 0, 0.25);
    }
`
const ButtonConfirm = styled.button`
    border-radius: 5px;
    width: ${props => props.width ? props.width : '10rem'};
    margin: 0.5rem 1rem;
    padding: 0.5rem 0.5rem;
    border: 1px solid #e6e6e6;
    background: lawngreen;
    color: black;
    :focus { 
        color: #495057;
        border-color: lawngreen;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(124, 252, 0, 0.25);
    }
`

export default function PokemonPage(props) {
    const { name } = useParams();
    const [modalShow, setModalShow] = useState(false);
    const [modalError, setModalError] = useState('');
    const [failModal, setFailModal] = useState(false);
    const [failText, setFailText] = useState('');
    const response = useQuery(GET_POKEMON, {
        variables: {
            name: name
        },
    });
    const dispatch = useDispatch();
    const myPokemon = useSelector(state => state.myPokemon.data)
    function catchPokemon() {
        const pokemon = { ...response?.data?.pokemon };
        console.log(pokemon);
        if (!pokemon.id || !pokemon.name) {
            alert('Pokemon not ready')
            return
        } 
        const success = Math.random()
        if (success >= 0.5) {
            setModalShow(true)
            return;
        }

        console.log(success)
        let fail = ''
        if (success >= 0.4) {
            fail = 'Gah! It was so close, too!'
        } else if (success >= 0.3) {
            fail = 'Aargh! Almost had it!'
        } else if (success >= 0.15) {
            fail = 'Aww! It appeared to be caught!'
        } else if (success <= 0.15) {
            fail = 'Oh no! The Pokémon broke free!'
        }
        setFailModal(true)
        setFailText(fail)
    }
    const [nickName, setNickName] = useState('');
    function endNickName() {
        if (!nickName || nickName === '') {
            setModalShow(true);
            setModalError(`Please give a nickname to your ${name}`)
            return;
        }
        const pokemon = { ...response?.data?.pokemon };
        pokemon.nickName = nickName
        if (!pokemon.id || !pokemon.name) {
            alert('Pokemon not found')
            return
        } 
        const { data, message, error } = addMyPokemon(pokemon, myPokemon, dispatch)
        console.log('addMyPokemonResponse');
        console.log(data);
        if (error) {
            alert(message)
            return;
        }
        setNickName('');
        setModalShow(false);
        setModalError(null)
    }
    function onHide() {
        setModalShow(false)
        endNickName();
    }
    function releasePokemon() {
        setModalShow(false);
        setModalError(null)
    }

    return <Container>
        <img className="pokemonImg" src={response?.data?.pokemon?.sprites?.front_default} alt="img"/>
        <img className="pokeBall" src={icon.icon.pokeball_color} onClick={catchPokemon} alt="img"/>

        <MyVerticallyCenteredModal
            show={modalShow}
            header={<span>
                Gotcha! <span style={{ textTransform: 'capitalize' }}>{name}</span> was caught!</span>}
            footer={false}
            onHide={onHide}
            children={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Container style={{ textAlign: 'center' }}>
                    <img className="pokemonImg" src={response?.data?.pokemon?.sprites?.front_default} alt="img"/>
                </Container>
                <span>Give your {name} a nickname.</span><span style={{ color: 'red' }}>{modalError}</span>
                <SimpleTextInput
                    width='100%'
                    value={nickName} key="nickname" placeholder={name} onChange={(e) => { setNickName(e.target.value) }}
                />
                <ButtonConfirm width='100%' onClick={endNickName}>OK</ButtonConfirm>

                <ButtonRelease width='100%' onClick={releasePokemon}>Release</ButtonRelease>
            </div>}
        />
        <MyVerticallyCenteredModal
            show={failModal}
            header={false}
            footer={false}
            onHide={() => { setFailModal(false) }}
            children={<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Container style={{ textAlign: 'center' }}>
                    {failText}
                </Container>
            </div>}
        />
    </Container>
}