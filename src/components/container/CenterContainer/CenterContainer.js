import styled from '@emotion/styled'
const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export default function CenterContainer(props) {
    return <Container {...props} />
}