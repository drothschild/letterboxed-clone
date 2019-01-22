import styled from 'styled-components';

const Form = styled.form`
    width: 360px;
    margin: 0 auto;
    fieldset {
        padding: 20px 20px 25px;
        width: 100%;
        box-shadow: ${props => props.theme.bs};
        position: relative;
        &[disabled] {
            opacity: 0.5;
        }
    }
    label {
        display: block;
        font-size: 1.5rem;
    }
    input,
    textarea,
    select {
        box-shadow: ${props => props.theme.bsInset};
        font-size: 1rem;
        background-color: #2c3440;
        &:focus {
            background-color: #fff;
            color: #234;
            box-shadow: none;
        }
    }
    button {
        background-color: ${props => props.theme.green};
        box-shadow: ${props => props.theme.bsInset};
        color: ${props => props.theme.offWhite};
        border-radius: 3px;
        font-size: 1rem;
    }
`;

export default Form;
