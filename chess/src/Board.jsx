import React from 'react';
import { useState, useEffect } from 'react';
import Square from './Components/Square';
import './Board.css';

function Board(props) {
    // props go here

    // states go here
    const [LastMove, setLastMove] = useState({
        lastMove: null,
        pieceMove: null
    });
    // arr of current piece movement
    const [pieceMovement, setPieceMovement] = useState([]);
    // arr of previous moves
    const [prevMoves, setPrevMoves] = useState([]);

    // Obj of highlighted squares
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

    const handleClick = (e, setLastMove, id) => {
        // Set last move
        if (e.target instanceof HTMLImageElement) {
            setLastMove({lastMove:id, pieceMove: e.target.className});
        } else {
            setLastMove({lastMove:id, pieceMove: null});
        }
        // Remove all highlights
        setHighlighted({});
    }

    // set piece movement
    useEffect (() => {
        // if you already clicked a piece and you are now clicking a square or enemy piece (to capture)
        if (pieceMovement.length === 2 && LastMove.lastMove !== null && (LastMove.pieceMove === null || (pieceMovement[0].split(' ')[0] !== LastMove.pieceMove.split(' ')[0]))) {
            setPieceMovement(oldArr => [...oldArr, LastMove.lastMove, LastMove.pieceMove]);
            alert("The piece you just clicked is a " + pieceMovement[0] + " and it is located at " + pieceMovement[1] + " and you want to move it to " + LastMove.lastMove);
            // TODO: Check if move is legal from Logic.jsx if so move it
            // TODO: Check(check) ? Checkmate : None
            // TODO: Check(stalemate)
            // TODO: Check(draw) => threefold repetition, fifty-move rule, insufficient material
            // TODO: Check(promotion) ? Pawn promotion popup : None
            // Add it to prev moves
            setPrevMoves([pieceMovement[1], LastMove.lastMove]);
            // Reset piece movement
            // setPieceMovement([]);
        // if you are clicking an empty square
        } else if (LastMove.lastMove !== null && LastMove.pieceMove === null) {
            setPieceMovement([]);
        // if same piece is clicked twice
        } else if (LastMove.lastMove !== null && LastMove.pieceMove === pieceMovement[0] && LastMove.lastMove === pieceMovement[1]) {
            setPieceMovement([]);
        // if you are clicking a piece
        // TODO: check if piece is the same color as the player to move
        } else if (LastMove.lastMove !== null && LastMove.pieceMove !== null) {
            setPieceMovement([LastMove.pieceMove, LastMove.lastMove]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [LastMove]);

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
            tmp.push(<Square key={chessRow[j]+""+(8-i)} id={chessRow[j]+""+(8-i)} onClick = {(event) => handleClick(event, setLastMove, chessRow[j]+""+(8-i))} onContextMenu = {(event) => {handleContextMenu(event, Highlighted, setHighlighted, chessRow[j]+""+(8-i))}} isWhite = {((i+j)%2) ? false : true} highlighted = {Highlighted} lastMove = {pieceMovement} prevMoves = {prevMoves} pieceName = {getPiece(i,j)} pieceStyle = "8bit"  />)
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
    console.log(LastMove);
    console.log(pieceMovement);
    console.log(prevMoves);

  return (
    <div className='gridContainer'>{Board}</div> 
)
}


export default Board;

