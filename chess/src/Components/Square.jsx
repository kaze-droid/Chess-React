import React from 'react';
import { useEffect, useState } from 'react';
import Piece from './Pieces';

// CSS

function Square(props) {
    const pieceName = props.pieceName;
    const pieceStyle = props.pieceStyle;

    const id = props.id;
    const size = props.size;
    const box = {
        width: size,
        height: size
    }

    const isWhite = props.isWhite;
    const HighlightedObj = props.highlighted;
    const LastMoveArr = props.lastMove;
    const prevMoveArr = props.prevMoves;
    const legalMoves = props.legalMoves;
    const isCheckArr = props.isCheck;

    const [isHighlighted, setIsHighlighted] = useState(id in HighlightedObj);
    const [isLastMove, setIsLastMove] = useState(id in LastMoveArr);
    const [isPrevMoveFrom, setIsPrevMoveFrom] = useState(id === prevMoveArr[0]);
    const [isPrevMoveTo, setIsPrevMoveTo] = useState(id === prevMoveArr[1]);
    const [pieceNameState, setPieceNameState] = useState(pieceName);
    const [isLegal, setIsLegal] = useState(legalMoves.includes(id));
    const [inCheck, setInCheck] = useState(false);

    // When highlighted obj changes, change the state of is highlighted
    useEffect(() => {
        setIsHighlighted(HighlightedObj[id] === undefined ? false : HighlightedObj[id]);
    // Since id will never change, we can don't have to add it to the dependency list
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [HighlightedObj]);

    // When last move arr changes, change the state of is last move
    useEffect(() => {
        setIsLastMove(LastMoveArr[1] === id || LastMoveArr[2] === id);
    // Since id will never change, we can don't have to add it to the dependency list
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [LastMoveArr]);

    // When prev move arr changes, change the state of is prev move
    useEffect(() => {
        setIsPrevMoveFrom(prevMoveArr[0] === id)
        setIsPrevMoveTo(prevMoveArr[1] === id);
    // Since id will never change, we can don't have to add it to the dependency list
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevMoveArr]);

    // When legal moves changes, change the state of is legal
    useEffect(() => {
        setIsLegal(legalMoves.includes(id));
    // Since id will never change, we can don't have to add it to the dependency list
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [legalMoves]);

    // When piece name changes, change the state of piece name
    useEffect(() => {
        setPieceNameState(pieceName);
    }, [pieceName]);

    // When is check changes, change the state of in check
    useEffect(() => {
        // console.log(isCheckArr)
        if (isCheckArr[0] && pieceName  === 'wK') {
            setInCheck(true);
        } else if (isCheckArr[1] && pieceName === 'bK') {
            setInCheck(true);
        } else {
            setInCheck(false);
        }
    // Since piece name will never change, we can don't have to add it to the dependency list
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isCheckArr]);

    const styleCursor = pieceName===null ? "default" : "grab";

    const RedWhite = "rgba(235, 97, 80, 0.8)";
    const RedBlack = "#EB6150";
    const White = "#B58863";
    const Black = "#F0D9B5";
    const prevMovesFrom = "rgba(155,199,0,0.5)";
    const prevMovesTo = "rgba(155,199,0,0.8)";
    const LastMove =  "rgba(20,85,30,0.65)";

    const legalSquare = "radial-gradient(circle at center, rgba(20,85,30,0.5) 19%, rgba(0,0,0,0) 20%)";
    const legalCapture = "radial-gradient(transparent 0%, transparent 79%, rgba(20,85,30,0.5) 80%)";

    const checkedPiece = "radial-gradient(ellipse at center, red 0%, #e70000 25%, rgba(169,0,0,0) 89%, rgba(158,0,0,0) 100%)";

    const styler = () => {
        if (isHighlighted) {
            return isWhite ? RedWhite : RedBlack;
        } else {
            // If it was the most recently moved piece
            if (isPrevMoveFrom) {
                return prevMovesFrom;
            } else if (isPrevMoveTo && !isLegal) {
                return prevMovesTo;
            } else {
                // If it is currently selected move
                if (isLastMove) {
                    return LastMove;
                } else {
                    // Default
                    return isWhite ? White : Black;
                }
            }
        }
    }

    const special = () => {
        if (inCheck) {
            return checkedPiece;
        } else {
            if (isLegal) {
                return pieceNameState === null ? legalSquare : legalCapture;
            } else {
                return null;
            }
        }
    }


    const onClick = props.onClick;
    const onContextMenu = props.onContextMenu;

  return (
    <div className="square" id={id} onClick = {onClick} onContextMenu = {onContextMenu} style={{backgroundColor: styler() , cursor: styleCursor, backgroundImage: special(), ...box}}><Piece name = {pieceNameState} style = {pieceStyle} /></div>
  )
}

export default Square;
