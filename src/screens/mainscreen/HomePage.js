import React, { useEffect, useRef, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useSelector, useDispatch } from 'react-redux';

import { gql, useQuery } from '@apollo/client';
import styled from '@emotion/styled'
import icon from './../../assets/assets';
import browserHistory from '../../navigation/browserHistory';
import colours from '../../assets/colors/pokemon-types';
import { DetailPokemon, PokemonData, PokemonName, PokemonRowUI, OwnedBadge, TypeBadge } from '../pokemon/styles';


const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous 
            status
            message
            results {
                url
                name
                image
            }
        }
    }
`;

const GET_POKEMON = gql`
query pokemon($name: String!) {
    pokemon(name: $name) {
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

export const HomeContainer = styled.div`
    // background-image: url(${icon.icon.celebi});
    // background-repeat: no-repeat;
    // background-size: 200px;
`

function PokemonRow(props) {
    const myPokemon = useSelector(state => state.myPokemon.data);
    const response = useQuery(GET_POKEMON, {
        variables: {
            name: props.name
        },
    });
    function goToPokemonDetail(name) {
        browserHistory.push(`/pokemon/${name}`)
    }
    const owned = myPokemon.findIndex((value)=> {return value.name == props.name })
    return <PokemonRowUI onClick={() => { goToPokemonDetail(props.name) }}>
        <DetailPokemon>
            <img src={props.image} />
            <PokemonData>
                <PokemonName>{props.name}</PokemonName>
                <span className="typeContainer">
                    {response?.data?.pokemon?.types?.map((value, index) => {
                        return <TypeBadge key={index + value.type.name} type={value.type.name}>{value.type.name}</TypeBadge>
                    })}
                </span>
            </PokemonData>
        </DetailPokemon>
        <OwnedBadge>
            {owned !== -1 && <img width="20" height="20" src={icon.icon.pokeball_color} />}
        </OwnedBadge>
    </PokemonRowUI>
}

export default function HomePage(props) {
    const { data, fetchMore, variables } = useQuery(GET_POKEMONS, {
        variables: {
            limit: 200, offset: 0
        },
    });

    // add loader refrence 
    const loader = useRef(null);

    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };
        // initialize IntersectionObserver
        // and attaching to Load More div
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current)
        }
    }, []);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            console.log('fetchmore')
            return fetchMore({
                variables: {
                    limit: 20,
                    offset: variables.offset + 20
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    const obj = Object.assign({}, prev, {
                        pokemons: {
                            results: [...prev.pokemons.results, ...fetchMoreResult.pokemons.results]
                        }
                    })
                    return obj;
                }
            })
        }
    }
    console.log(data)
    return <HomeContainer>
        {
            data?.pokemons?.results?.map((value, index) => {
                return <PokemonRow key={value.index + value.image} {...value} index={index} />
            })
        }
        {/* <div className="loading" ref={loader} >
            <h2>Load More</h2>
        </div> */}
    </HomeContainer >
}