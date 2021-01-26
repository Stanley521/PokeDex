import styled from '@emotion/styled'
const SimpleInput = styled.input`
    border-radius: 5px;
    width: ${props => props.width ? props.width : '10rem'};
    margin: 0.5rem 1rem;
    padding: 0.5rem 0.5rem;
    border: 1px solid #e6e6e6;
    :focus { 
        color: #495057;
        border-color: lawngreen;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(124, 252, 0, 0.25);
    }
`
export default function SimpleTextInput(props) {
    return <SimpleInput {...props} />
}
