import React from 'react';
import { useState, useEffect } from 'react';
import Square from './Components/Square';
import './Board.css';
import { logic } from './Utils/logic.js';
import { toArr } from './Utils/translateMoves/toArr.js';
// import { getAllLegalMoves } from './Utils/getAllLegalMoves.js';
import { inCheck } from './Utils/inCheck.js';

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

    // arr of legal moves
    const [legalMoves, setLegalMoves] = useState([]);

    // arr of castling
    const [canCastle, setCanCastle] = useState([true,true, true, true]);

    // arr of is check
    const [isCheck, setIsCheck] = useState([false,false]);

    // color to move
    const [colorToMove, setColorToMove] = useState("White");



    // Board
    const blackPieces = ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"];
    const blackPawns = ["bP", "bP" , "bP", "bP", "bP", "bP", "bP", "bP"];
    const whitePieces = ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"];
    const whitePawns = ["wP", "wP" , "wP", "wP", "wP", "wP", "wP", "wP"];
    const nullarr = [null, null, null, null, null, null, null, null];
    const standardBoard = [blackPieces,blackPawns,nullarr,nullarr,nullarr,nullarr,whitePawns,whitePieces];

    const getPiece = (i,j) => {
        return board[i][j];
    }

    // Board state
    const [board, setBoard] = useState(standardBoard);

    // Define size of square
    const size = "10vh"

    // Handle Onclick event
    const handleClick = (e, setLastMove, id) => {
        // Set last move
        if (e.target instanceof HTMLImageElement && e.target.className.split(' ')[0] === colorToMove) {
            setLastMove({lastMove:id, pieceMove: e.target.className});
        } else {
            setLastMove({lastMove:id, pieceMove: null});
        }
        // Remove all highlights
        setHighlighted({});
    }

    // Detect piece movement and other miscellaneous
    useEffect (() => {
        // if you already clicked a piece and you are now clicking a square or enemy piece (to capture)
        if (pieceMovement.length === 2 && LastMove.lastMove !== null && (LastMove.pieceMove === null || (pieceMovement[0].split(' ')[0] !== LastMove.pieceMove.split(' ')[0]))) {
            if (legalMoves.includes(LastMove.lastMove)) {
                setPieceMovement(oldArr => [...oldArr, LastMove.lastMove, LastMove.pieceMove]);

                // Special case castling
                if (pieceMovement[0] === "White King" || pieceMovement[0] === "Black King") {
                    castleMove();
                // Normal move
                } else {
                    move(pieceMovement[1], LastMove.lastMove);
                }

                // Prevent castling if rook has moved
                if (pieceMovement[0] === "White Rook") {
                    if (pieceMovement[1] === "H1") {
                        setCanCastle([false, canCastle[1], canCastle[2], canCastle[3]]);
                    } else if (pieceMovement[1] === "A1") {
                        setCanCastle([canCastle[0], false, canCastle[2], canCastle[3]]);
                    }
                } else if (pieceMovement[0] === "Black Rook") {
                    if (pieceMovement[1] === "H8") {
                        setCanCastle([canCastle[0], canCastle[1], false, canCastle[3]]);
                    } else if (pieceMovement[1] === "A8") {
                        setCanCastle([canCastle[0], canCastle[1], canCastle[2], false]);
                    }
                }

                // Add it to prev moves
                setPrevMoves([pieceMovement[1], LastMove.lastMove]);
                setLegalMoves([]);
                setColorToMove(colorToMove === "White" ? "Black" : "White");
            // Made an illegal move
            } else {
                setPieceMovement([]);
            }
        // if you are clicking an empty square
        } else if (LastMove.lastMove !== null && LastMove.pieceMove === null) {
            setPieceMovement([]);
        // if same piece is clicked twice
        } else if (LastMove.lastMove !== null && LastMove.pieceMove === pieceMovement[0] && LastMove.lastMove === pieceMovement[1]  && LastMove.pieceMove.split(' ')[0] === colorToMove) {
            setPieceMovement([]);
            setLegalMoves([]);

        // if you are clicking a different/new piece
        } else if (LastMove.lastMove !== null && LastMove.pieceMove !== null) {
            // Special case if it is king moving to white rook
            if ((pieceMovement[0] === "White King" && LastMove.pieceMove === "White Rook") || (pieceMovement[0] === "Black King" && LastMove.pieceMove === "Black Rook")) {
                castleMove();
            } else {
                setPieceMovement([LastMove.pieceMove, LastMove.lastMove]);
                setLegalMoves(logic(LastMove.pieceMove,LastMove.lastMove, board, canCastle));
            }

            console.log(logic(LastMove.pieceMove,LastMove.lastMove, board, canCastle));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [LastMove, colorToMove]);

    // When the board changes, check for checks, checkmates and stalemates
    useEffect (() => {
        // Check for check
        if (pieceMovement !== null && pieceMovement !== undefined && pieceMovement.length > 0) {
            if (colorToMove === "White") {
                setIsCheck([inCheck(board, "Black", canCastle), isCheck[1]]);
            } else {
                setIsCheck([isCheck[0], inCheck(board, "White", canCastle)]);
            }
        }

        // TODO: Check(stalemate)
        // TODO: Check(draw) => threefold repetition, fifty-move rule, insufficient material
        // TODO: Check(promotion) ? Pawn promotion popup : None
    // eslint-disable-next-line
    }, [board]);

    const handleContextMenu = (e, Highlighted, setHighlighted, id) => {
        e.preventDefault();
        if (id in Highlighted) {
            setHighlighted({...Highlighted, [id]:!Highlighted[id]})
        } else {
            setHighlighted({...Highlighted, [id]:true});
        }
    }

    // Move piece
    const move = (from, to) => {
        let fromIndex_i, fromIndex_j, toIndex_i, toIndex_j;
        // Convert from board notation ("E2") to index for terminalBoard(6,4)
        [fromIndex_i, fromIndex_j] = [toArr(from)[0], toArr(from)[1]];
        [toIndex_i, toIndex_j] = [toArr(to)[0], toArr(to)[1]];
        const piece = board[fromIndex_i][fromIndex_j];

        // Move piece by editing board
        setBoard(oldBoard => [...oldBoard.slice(0,fromIndex_i), [...oldBoard[fromIndex_i].slice(0,fromIndex_j), null, ...oldBoard[fromIndex_i].slice(fromIndex_j+1)], ...oldBoard.slice(fromIndex_i+1)]);
        setBoard(oldBoard => [...oldBoard.slice(0,toIndex_i), [...oldBoard[toIndex_i].slice(0,toIndex_j), piece, ...oldBoard[toIndex_i].slice(toIndex_j+1)], ...oldBoard.slice(toIndex_i+1)]);
    }

    // Castling
    const castleMove = () => {
        if (legalMoves.includes(LastMove.lastMove)) {
            if ((LastMove.lastMove === "H1" || LastMove.lastMove === "G1") && canCastle[0]) {
                setCanCastle([false, false, canCastle[2], canCastle[3]]);
                move("H1", "F1");
                move("E1", "G1");
                setPrevMoves([pieceMovement[1], "G1"]);
            } else if ((LastMove.lastMove === "A1" || LastMove.lastMove === "C1") && canCastle[1]) {
                setCanCastle([false, false, canCastle[2], canCastle[3]]);
                move("A1", "D1");
                move("E1", "C1");
                setPrevMoves([pieceMovement[1], "C1"]);
            } else if ((LastMove.lastMove === "H8" || LastMove.lastMove === "G8") && canCastle[2]) {
                setCanCastle([canCastle[0], canCastle[1], false, false]);
                move("H8", "F8");
                move("E8", "G8");
                setPrevMoves([pieceMovement[1], "G8"]);
            } else if ((LastMove.lastMove === "A8" || LastMove.lastMove === "C8") && canCastle[3]) {
                setCanCastle([canCastle[0], canCastle[1], false, false]);
                move("A8", "D8");
                move("E8", "C8");
                setPrevMoves([pieceMovement[1], "C8"]);
                // Normal king move
            } else {
                move(pieceMovement[1], LastMove.lastMove);
                if (pieceMovement[0] === "White King") {
                    setCanCastle([false, false, canCastle[2], canCastle[3]]);
                } else if (pieceMovement[0] === "Black King") {
                    setCanCastle([canCastle[0], canCastle[1], false, false]);
                }
            }
            setLegalMoves([]);
            setPieceMovement([]);
        }
    }


    let Board = []; 
    const chessRow = ['A','B','C','D','E','F','G','H'];
    for (let i=0;i<8;i++) {
        let tmp = [];
        for (let j=0;j<8;j++) {
            tmp.push(<Square key={chessRow[j]+""+(8-i)} id={chessRow[j]+""+(8-i)} size={size} onClick = {(event) => handleClick(event, setLastMove, chessRow[j]+""+(8-i))} onContextMenu = {(event) => {handleContextMenu(event, Highlighted, setHighlighted, chessRow[j]+""+(8-i))}} isWhite = {(i+j)%2} highlighted = {Highlighted} lastMove = {pieceMovement} prevMoves = {prevMoves} isCheck = {isCheck} legalMoves = {legalMoves} pieceName = {getPiece(i,j)} pieceStyle = "8bit"  />)
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
    // console.log(pieceMovement);
    // console.log(prevMoves);

  return (
    <div className='gridContainer'>{Board}</div> 
)
}



export default Board;

