import React from 'react';
import { useState } from 'react';
import Square from './Components/Square';
import './Board.css';

function Board(props) {
    // props go here

    // states go here
    const [LastMove, setLastMove] = useState({});
    const [Highlighted, setHighlighted] = useState({});

    const blackPieces = ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"];
    const blackPawns = ["bP", "bP" , "bP", "bP", "bP", "bP", "bP", "bP"];
    const whitePieces = ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"];
    const whitePawns = ["wP", "wP" , "wP", "wP", "wP", "wP", "wP", "wP"];
    const setPieces = [blackPieces, blackPawns, null, null, null, null, whitePawns, whitePieces];

    const getPiece = (i,j) => {
        if (setPieces[i] === null) {
            return null;
        }
        return setPieces[i][j];
    }

    const handleClick = (LastMove, setLastMove, id) => {
        if (id in LastMove) {
            setLastMove({...LastMove, [id]:!LastMove[id]});
        } else {
            setLastMove({...LastMove, [id]:true});
        }
        setHighlighted({});
    }

    const handleContextMenu = (e, Highlighted, setHighlighted, id) => {
        e.preventDefault();
        if (id in Highlighted) {
            setHighlighted({...Highlighted, [id]:!Highlighted[id]})
        } else {
            setHighlighted({...Highlighted, [id]:true});
        }
    }

    let Board = []; 
    const chessRow = ['A','B','C','D','E','F','G','H'];
    for (let i=0;i<8;i++) {
        let tmp = [];
        for (let j=0;j<8;j++) {
            tmp.push(<Square key={chessRow[j]+""+(8-i)} id={chessRow[j]+""+(8-i)} onClick = {() => handleClick(LastMove, setLastMove, chessRow[j]+""+(8-i))} onContextMenu = {(event) => {handleContextMenu(event, Highlighted, setHighlighted, chessRow[j]+""+(8-i))}} isWhite = {((i+j)%2) ? false : true} isHighlighted = {Highlighted} isLastMove = {LastMove} pieceName = {getPiece(i,j)} pieceStyle = "8bit"  />)
        }
        Board.push(tmp);
    }

    // Debug
    // for (let i=0;i<8;i++) {
    //     for (let j=0;j<8;j++) {
    //         console.log(Board[i][j]);
    //     }
    // }
    // console.log(Highlighted);
    // console.log(LastMove);

  return (
    <div className='gridContainer'>{Board}</div> 
)
}


export default Board;

