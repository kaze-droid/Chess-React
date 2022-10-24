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
        ["wP", <img alt="White Pawn" id="wP" className="White Pawn" src={SRC_URL + '/wP.svg'}  />],
        ["wR", <img alt="White Rook" id="wR" className="White Rook" src={SRC_URL + '/wR.svg'}  />],
        ["wN", <img alt="White Knight" id="wN" className="White Knight"  src={SRC_URL + '/wN.svg'}  />],
        ["wB", <img alt="White Bishop" id="wB" className="White Bishop" src={SRC_URL + '/wB.svg'}  />],
        ["wQ", <img alt="White Queen" id="wQ" className="White Queen" src={SRC_URL + '/wQ.svg'}  />],
        ["wK", <img alt="White King" id="wK" className="White King" src={SRC_URL + '/wK.svg'}  />],
        ["bP", <img alt="Black Pawn" id="bP" className="Black Pawn" src={SRC_URL + '/bP.svg'}  />],
        ["bR", <img alt="Black Rook" id="bR" className="Black Rook" src={SRC_URL + '/bR.svg'}  />],
        ["bN", <img alt="Black Knight" id="bN" className="Black Knight" src={SRC_URL + '/bN.svg'}  />],
        ["bB", <img alt="Black Bishop" id="bB" className="Black Bishop" src={SRC_URL + '/bB.svg'}  />],
        ["bQ", <img alt="Black Queen" id="bQ" className="Black Queen" src={SRC_URL + '/bQ.svg'}  />],
        ["bK", <img alt="Black King" id="bK" className="Black King" src={SRC_URL + '/bK.svg'}  />]
    ]);
    const piece = pieces.get(name);
  return (
    piece
  )
}
