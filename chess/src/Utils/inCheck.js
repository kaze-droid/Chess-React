import { toStd } from "./translateMoves/toArr.js";
import { getAllLegalMoves } from "./getAllLegalMoves.js";

export function inCheck (board, color, canCastle) {
    let enemyKing;
    let kingLocation;
    if (color[0].toLowerCase() === 'w') {
        enemyKing = 'bK';
    } else {
        enemyKing = 'wK';
    }
    
    const values = Array.from(getAllLegalMoves(board, color, canCastle).values());
    for (let i=0;i<8;i++) {
        for (let j=0;j<8;j++) {
            if (board[i][j] === enemyKing) {
                kingLocation = toStd([i,j]);
            }
        }
    }

    // search for kingLocation inside values
    for (let i=0;i<values.length;i++) {
        for (let j=0;j<values[i].length;j++) {
            if (values[i][j] === kingLocation) {
                return true;
            }
        }
    }
    return false;
}