import styled from "styled-components";
import {Color, FontSize} from "../helpers/constants";
import * as MODELS from "../helpers/models";

export const Page = styled.div`
    width: 100vw;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const ButtonContainer = styled.div`
    display: flex;
`;

export const ButtonBody = styled.div``;

export const Button = styled.div<MODELS.Button>`
    cursor: pointer;
    border: 1px solid ${Color.Grey};
    outline: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: ${props => props.icon ? "5px 10px" : "5px 20px"};
    font-size: ${props => props.icon && FontSize.Fs35};
    transition: .2s ease-in-out all;
    &:hover{
        background: ${Color.Secondary};
        transition: .2s ease-in-out all;
    }
`;

export const CellWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100vw;
`;

export const CellContainer = styled.div`
    overflow-y: scroll;
    margin: 30px auto;
`;

export const CellBody = styled.div<MODELS.CellBody>`
    display: grid;
    grid-template-columns: repeat(${props => props.grid}, 20px);
`;

export const Cell = styled.div<MODELS.Cell>`
    width: 20px;
    height: 20px;
    border: 1px solid ${Color.Grey};
    background: ${props => props.active && Color.Black};
`;