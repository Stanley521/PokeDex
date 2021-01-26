import styled from '@emotion/styled'
import { css } from '@emotion/react';
export default function DefaultButton(props) {
    const {
        text = 'Fill in text key'
    } = props;
    const Button = styled.button`
        display: inline-block;
        border-radius: 3px;
        padding: 0.5rem 0;
        margin: 0.5rem 1rem;
        width: 11rem;
        background: transparent;
        color: white;
        border: 2px solid white;
        :focus { 
            border-color: lawngreen;
            outline: 0;
            box-shadow: 0 0 0 0.2rem rgba(124, 252, 0, 0.25);
        }
        ${props => props.primary && css`
            background: lawngreen;
            color: white;
        `}
    `
    return <Button {...props} >{text}</Button>
}