import { logic } from './logic.js';
import { toStd } from './translateMoves/toArr.js';

export function getAllLegalMoves (board, color, canCastle) {
    let en_Prise = new Map();
    for (let i=0;i<8;i++) {
        for (let j=0;j<8;j++) {
            if (board[i][j] !== null && board[i][j][0] === color[0].toLowerCase()) {
                const longPiece = color + " " + mapPieces.get(board[i][j][1]);
                const from = toStd([i,j]);

                if (board[i][j][1] === 'P') {
                    const movement = logic(longPiece, from, board, canCastle);
                    let capturables = [];
                    for (let move of movement) {
                        if (move[0] !== from[0]) {
                            capturables.push(move);
                        }
                    }
                    en_Prise.set(longPiece + '_' + from, capturables);
                } else {
                    en_Prise.set(longPiece + '_' + from, logic(longPiece,from,board,canCastle));
                }
            }
        }
    }
    return en_Prise;
}

const mapPieces = new Map();

mapPieces.set('P', "Pawn");
mapPieces.set('R', "Rook");
mapPieces.set('N', "Knight");
mapPieces.set('B', "Bishop");
mapPieces.set('Q', "Queen");
mapPieces.set('K', "King");


