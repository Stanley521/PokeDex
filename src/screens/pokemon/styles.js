import styled from '@emotion/styled'
import colours from '../../assets/colors/pokemon-types'

const media = {
    desktop: '@media(min-width: 1000px)'
}

export const PokemonRowUI = styled.div`
    position: relative;
    border-radius: 5px;
    margin: 0.5rem 3rem;
    padding: 0rem 0.5rem;
    ${media.desktop} {
        padding: 0.5rem 1rem;
    }
    border: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    background: white;
    box-shadow: 0 2px 10px 0.2rem rgba( 0, 0, 0, 0.05);
    :focus { 
        color: #495057;
        border-color: lawngreen;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(124, 252, 0, 0.25);
    }
`
export const DetailPokemon = styled.div`
    text-transform: capitalize;
    display: flex;
    align-items: center;
`

export const PokemonName = styled.div`
    padding: 0.5em 0;
`
export const PokemonData = styled.div`
    display: flex;
    flex-direction: column;
    .typeContainer {
        display: flex;
    }
`



export const OwnedBadge = styled.div`
    position: absolute;
    right: 10px;
    top: 5px;
    display: flex;
    align-items: center;
    ${media.desktop} {
        right: 20px;
        top: 10px;
    }
`
export const TypeBadge = styled.div`
    font-size: 0.9em;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => colours[props.type]};
    color: white;
    border-radius: 2px;
    font-weight: bold;
    width: 4em;
    margin-right: 0.5em;
`