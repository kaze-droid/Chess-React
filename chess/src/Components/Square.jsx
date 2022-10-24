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

    const [isHighlighted, setIsHighlighted] = useState(id in HighlightedObj);
    const [isLastMove, setIsLastMove] = useState(id in LastMoveArr);
    const [isPrevMove, setIsPrevMove] = useState(id in prevMoveArr);
    const [pieceNameState, setPieceNameState] = useState(pieceName);

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
        setIsPrevMove(prevMoveArr[0] === id || prevMoveArr[1] === id);
    // Since id will never change, we can don't have to add it to the dependency list
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevMoveArr]);

    // When piece name changes, change the state of piece name
    useEffect(() => {
        setPieceNameState(pieceName);
    }, [pieceName]);

    const styleCursor = pieceName===null ? "default" : "grab";

    const RedWhite = "rgba(235, 97, 80, 0.8)";
    const RedBlack = "#EB6150";
    const White = "#B58863";
    const Black = "#F0D9B5";
    const prevMovesWhite = "rgba(155,199,0,0.5)";
    const prevMovesBlack = "rgba(155,199,0,0.65)";
    const LastMove =  "rgba(20,85,30,0.65)";


    const onClick = props.onClick;
    const onContextMenu = props.onContextMenu;

  return (
    <div className="square" id={id} onClick = {onClick} onContextMenu = {onContextMenu} style={{backgroundColor:  isHighlighted ? ((isWhite ? RedWhite : RedBlack)) : (isPrevMove ? (isWhite ? prevMovesWhite : prevMovesBlack) : (isLastMove ?  (LastMove) : (isWhite ? White : Black))) , cursor: styleCursor  ,...box}}><Piece name = {pieceNameState} style = {pieceStyle} /></div>
  )
}

export default Square;
