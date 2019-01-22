import styled from 'styled-components';

const ReviewListStyles = styled.ul`
    overflow: hidden;
    height: auto;
    list-style: none;
`;
const ReviewListItemStyles = styled.li`
    display: flex;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
    overflow: hidden;
    padding: 15px;
    .image-column {
        align-self: flex-start;
    }
    .contents-column {
        margin-left: 30px;
        h2 {
            font-size: 1.5rem;
            color: ${props => props.theme.white};
            font-family: Georgia, 'Times New Roman', Times, serif;
        }
        .rating {
            color: ${props => props.theme.green};
        }
        .contents {
            font-family: Georgia, 'Times New Roman', Times, serif;
            font-size: 1.3rem;
            a {
                color: ${props => props.theme.white};
                :hover {
                    color: ${props => props.theme.blue};
                }
            }
        }
    }
`;

export { ReviewListStyles, ReviewListItemStyles };
