import styled from 'styled-components';

const MovieStyles = styled.div`
    background: white;
    border: 1px solid ${props => props.theme.offWhite};
    box-shadow: ${props => props.theme.bs};
    position: relative;
    display: flex;
    flex-direction: column;
    &:hover {
        border: 1px solid ${props => props.theme.green};
    }
    img {
        width: 240px;
        height: 345px;
        object-fit: cover;
    }
    p {
        flex-grow: 1;
        font-size: 1.5rem;
    }
`;

export default MovieStyles;
