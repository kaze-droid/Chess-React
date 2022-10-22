import Board from './Board';
import Square from './Square';
import './App.css'
import { useState, useEffect } from 'react';
import React from 'react';

function App() {

    // Credits: https://github.com/lichess-org/lila/tree/master/public/piece/pixel
    // Author: therealqtpi
    const pieces = new Map([
        ["wP", <img alt="White Pawn" src={process.env.PUBLIC_URL + '/assets/wP.svg'}  />],
        ["wR", <img alt="White Rook" src={process.env.PUBLIC_URL + '/assets/wR.svg'}  />],
        ["wN", <img alt="White Knight" src={process.env.PUBLIC_URL + '/assets/wN.svg'}  />],
        ["wB", <img alt="White Bishop" src={process.env.PUBLIC_URL + '/assets/wB.svg'}  />],
        ["wQ", <img alt="White Queen" src={process.env.PUBLIC_URL + '/assets/wQ.svg'}  />],
        ["wK", <img alt="White King" src={process.env.PUBLIC_URL + '/assets/wK.svg'}  />],
        ["bP", <img alt="Black Pawn" src={process.env.PUBLIC_URL + '/assets/bP.svg'}  />],
        ["bR", <img alt="Black Rook" src={process.env.PUBLIC_URL + '/assets/bR.svg'}  />],
        ["bN", <img alt="Black Knight" src={process.env.PUBLIC_URL + '/assets/bN.svg'}  />],
        ["bB", <img alt="Black Bishop" src={process.env.PUBLIC_URL + '/assets/bB.svg'}  />],
        ["bQ", <img alt="Black Queen" src={process.env.PUBLIC_URL + '/assets/bQ.svg'}  />],
        ["bK", <img alt="Black King" src={process.env.PUBLIC_URL + '/assets/bK.svg'}  />]
    ]);

    // Check piece movement
    const [lastMove, setLastMove] = useState({
        lastMove: null,
        pieceMove: null
    });

    // Track clicks for piece movement
    const [pieceMovement, setPieceMovement] = useState([]);

    // If user right clicks, reset the piece movement
    const rightClickEvent = (e) => {
        e.preventDefault();
        setPieceMovement([]);
    };

    // Check if piece is selected and move it
    useEffect(() => {
        // Only move piece if, you click on a piece, then click on a square and the square is empty or has an enemy piece
        if (pieceMovement.length === 2 && lastMove.lastMove !== null && (lastMove.pieceMove === null || (pieceMovement[0].split(' ')[0] !== lastMove.pieceMove.split(' ')[0]))) {
            setPieceMovement([p => lastMove.lastMove]);
            alert("The piece you just clicked is a " + pieceMovement[0] + " and it is located at " + pieceMovement[1] + " and you want to move it to " + lastMove.lastMove);
            window.location.reload();
            // TODO: Check if legal move 
            // TODO: Move piece
            // TODO: Store move in database in fide notation 
            // TODO: Check if check and if so check if checkmate
        // If a new piece is clicked
        } else if (lastMove.lastMove !== null && lastMove.pieceMove !== null) {
            setPieceMovement([lastMove.pieceMove, lastMove.lastMove]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastMove]);

    // Create Board object
    // Lifting state up
    // src: https://stackoverflow.com/questions/66330527/how-to-change-value-in-other-file-react
    const b = new Board(setLastMove);
    const board = b.board;

    // Fn to editSquare
    const editSquare = (i,j,piece) => {
        return <Square key={board[i][j].key} id={board[i][j].key} isWhite = {((i+j)%2) ? false : true} piece = {piece} detectPiece = {(event) => {b.detectPiece(event, board[i][j].key)}} />;
    }

    // Set chess pieces on board
    let setBoard_piece = [pieces.get('wR'),pieces.get('wN'),pieces.get('wB'),pieces.get('wQ'),pieces.get('wK'),pieces.get('wB'),pieces.get('wN'),pieces.get('wR'),pieces.get('bR'),pieces.get('bN'),pieces.get('bB'),pieces.get('bQ'),pieces.get('bK'),pieces.get('bB'),pieces.get('bN'),pieces.get('bR')]
    for (let i=0;i<8;i++) {
        // Black pieces
        board[0][i] = editSquare(0,i,setBoard_piece[i+8]);

        // Black pawns
        board[1][i] = editSquare(1,i,pieces.get('bP'));

        // White pawns
        board[6][i] = editSquare(6,i,pieces.get('wP'));

        // White pieces
        board[7][i] = editSquare(7,i,setBoard_piece[i]);
    }

    return (
        <div>
            <div className="gridContainer" onContextMenu={rightClickEvent}>{board}</div>
            <div className="test">{lastMove.lastMove}</div>
            <div className="test2">{lastMove.pieceMove}</div>
        </div>

    )
}
export default App;
