import React from 'react'

export default function Pieces(props) {
    // Credits: https://github.com/lichess-org/lila/tree/master/public/piece/pixel
    // Author: therealqtpi
    const name = props.name;
    const style = props.style;
    const SRC_URL = process.env.PUBLIC_URL + '/assets/' + style;
    if (name === null || style === null) {
        return null;
    }
    const pieces = new Map([
        ["wP", <img alt="White Pawn" src={SRC_URL + '/wP.svg'}  />],
        ["wR", <img alt="White Rook" src={SRC_URL + '/wR.svg'}  />],
        ["wN", <img alt="White Knight" src={SRC_URL + '/wN.svg'}  />],
        ["wB", <img alt="White Bishop" src={SRC_URL + '/wB.svg'}  />],
        ["wQ", <img alt="White Queen" src={SRC_URL + '/wQ.svg'}  />],
        ["wK", <img alt="White King" src={SRC_URL + '/wK.svg'}  />],
        ["bP", <img alt="Black Pawn" src={SRC_URL + '/bP.svg'}  />],
        ["bR", <img alt="Black Rook" src={SRC_URL + '/bR.svg'}  />],
        ["bN", <img alt="Black Knight" src={SRC_URL + '/bN.svg'}  />],
        ["bB", <img alt="Black Bishop" src={SRC_URL + '/bB.svg'}  />],
        ["bQ", <img alt="Black Queen" src={SRC_URL + '/bQ.svg'}  />],
        ["bK", <img alt="Black King" src={SRC_URL + '/bK.svg'}  />]
    ]);
    const piece = pieces.get(name);
  return (
    piece
  )
}