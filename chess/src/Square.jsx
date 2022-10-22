import React from 'react';

// CSS
const box = {
    width: "10vh",
    height: "10vh"
}
// Keep track of colours
// Black = #F0D9B5
// white = #B58863
// Red = #EB6150 (when highlighted with right click) -> no opacity black
// Red = rgba(235, 97, 80, 0.8) (when highlighted with right click) -> opacity white


export default function Square(props) {
    const piece = props.piece;
    const isWhite = props.isWhite;
    const detectPiece = props.detectPiece;
    const id = props.id;
    const [highlight, setHighlight] = React.useState(false);
    const toggleHighlight = () => setHighlight(!highlight);
    
  return (
    <div className="square" id={id} onClick = {detectPiece} onContextMenu = {toggleHighlight} style={{backgroundColor:  highlight ? (isWhite ? 'rgba(235,97,80,0.9)' : '#EB6150') : (isWhite ? '#B58863' : '#F0D9B5') , ...box}}>{piece}</div>
  )
}
