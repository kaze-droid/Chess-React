import React from 'react';
import { useEffect, useState } from 'react';
import Piece from './Pieces';

// CSS
const box = {
    width: "10vh",
    height: "10vh"
}

function Square(props) {
    const pieceName = props.pieceName;
    const pieceStyle = props.pieceStyle;

    const id = props.id;

    const isWhite = props.isWhite;
    const HighlightedObj = props.highlighted;
    const LastMoveArr = props.lastMove;
    const prevMoveArr = props.prevMoves;

    const [isHighlighted, setIsHighlighted] = useState(id in HighlightedObj);
    const [isLastMove, setIsLastMove] = useState(id in LastMoveArr);
    const [isPrevMove, setIsPrevMove] = useState(id in prevMoveArr);

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

    const styleCursor = pieceName===null ? "default" : "grab";

    const RedWhite = "rgba(235, 97, 80, 0.8)";
    const RedBlack = "#EB6150";
    const White = "#B58863";
    const Black = "#F0D9B5";
    const prevMoves = "rgba(204, 145, 34, 0.8)";
    const LastMove =  "#CC9122";


    const onClick = props.onClick;
    const onContextMenu = props.onContextMenu;

  return (
    <div className="square" id={id} onClick = {onClick} onContextMenu = {onContextMenu} style={{backgroundColor:  isHighlighted ? ((isWhite ? RedWhite : RedBlack)) : (isPrevMove ? prevMoves : (isLastMove ?  (LastMove) : (isWhite ? White : Black))) , cursor: styleCursor  ,...box}}><Piece name = {pieceName} style = {pieceStyle} /></div>
  )
}

export default Square;
