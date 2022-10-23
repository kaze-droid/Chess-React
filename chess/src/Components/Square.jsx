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
    const HighlightedObj = props.isHighlighted;
    const LastMoveObj = props.isLastMove;

    const [isHighlighted, setIsHighlighted] = useState(id in HighlightedObj);
    const [isLastMove, setIsLastMove] = useState(id in LastMoveObj);

    // When highlighted obj changes, change the state of is highlighted
    useEffect(() => {
        setIsHighlighted(HighlightedObj[id] === undefined ? false : HighlightedObj[id]);
    // Since id will never change, we can don't have to add it to the dependency list
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [HighlightedObj]);



    const RedWhite = "rgba(235, 97, 80, 0.8)";
    const RedBlack = "#EB6150";
    const White = "#B58863";
    const Black = "#F0D9B5";
    const LastMove = "rgba(155,199,0,0.41)";


    const onClick = props.onClick;
    const onContextMenu = props.onContextMenu;

    
  return (
    <div className="square" id={id} onClick = {onClick} onContextMenu = {onContextMenu} style={{backgroundColor:  isHighlighted ? ((isWhite ? RedWhite : RedBlack)) : (isLastMove ?  (LastMove) : (isWhite ? White : Black)) , ...box}}><Piece name = {pieceName} style = {pieceStyle} /></div>
  )
}

export default Square;
