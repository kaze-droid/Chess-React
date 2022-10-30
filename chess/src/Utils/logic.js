import { toArr, toStd } from './translateMoves/toArr.js';

// pass in
/*
    - lastMove: for en passant
    - bool castling: for whether current color can castling
    - bool check: for whether current color is in check
*/
export function logic (long_piece,from, board){
    const color = long_piece.split(' ')[0]
    const piece = long_piece.split(' ')[1];
    // get all legal move for piece
    const legalMoves = getLegalMoves(color, piece, from, board);
    return legalMoves;
}

const getLegalMoves = (color, piece, from, board) => {
    switch (piece) {
        case 'Pawn':
            return getPawnMoves(color, from, board).map(x=>toStd(x));
        case 'Rook':
            return null;
            return getRookMoves(from, board).map(x=>toStd(x));
        case 'Knight':
            return null;
            return getKnightMoves(from, board).map(x=>toStd(x));
        case 'Bishop':
            return null;
            return getBishopMoves(from, board).map(x=>toStd(x));
        case 'Queen':
            return null;
            return getQueenMoves(from, board).map(x=>toStd(x));
        case 'King':
            return null;
            return getKingMoves(from, board).map(x=>toStd(x));
        default:
            return [];
    }
};

const getPawnMoves = (color, from, board) => {
    let possibleMoves = [];
    // For white
    if (color==="White") {
        // moving one square forward
        if (board[toArr(from[0]+(parseInt(from[1])+1))[0]][toArr(from[0]+(parseInt(from[1])+1))[1]] === null) {
            possibleMoves.push(toArr(from[0]+(parseInt(from[1])+1)));
            // moving two squares forward
            if (from[1]==='2' && board[toArr(from[0]+(parseInt(from[1])+2))[0]][toArr(from[0]+(parseInt(from[1])+2))[1]] === null) {
                possibleMoves.push(toArr(from[0]+(parseInt(from[1])+2)));
            }
        }

        // capturing
        const left = [toArr(from[0]+(parseInt(from[1])+1))[0], toArr(from[0]+(parseInt(from[1])+1))[1]-1];
        const right = [toArr(from[0]+(parseInt(from[1])+1))[0], toArr(from[0]+(parseInt(from[1])+1))[1]+1];
        // check if there is a piece there (!null) and if it is a valid move(!undefined)
        if (board[left[0]][left[1]]!==null && board[left[0]][left[1]]!==undefined && board[left[0]][left[1]][0]!=='w') {
            possibleMoves.push(left);
        }
        if (board[right[0]][right[1]]!==null && board[right[0]][right[1]]!==undefined && board[right[0]][right[1]][0]!=='w') {
            possibleMoves.push(right);
        }
        // END capturing

        // en passant
        // END en passant

        // Pawn promotion
        // END Pawn promotion


        // For black
    } else {
        // moving one square forward
        if (board[toArr(from[0]+(parseInt(from[1])-1))[0]][toArr(from[0]+(parseInt(from[1])-1))[1]] === null) {
            possibleMoves.push(toArr(from[0]+(parseInt(from[1])-1)));
            // moving two squares forward
            if (from[1]==='7' && board[toArr(from[0]+(parseInt(from[1])-2))[0]][toArr(from[0]+(parseInt(from[1])-2))[1]] === null) {
                possibleMoves.push(toArr(from[0]+(parseInt(from[1])-2)));
            }
        }

        // capturing
        const left = [toArr(from[0]+(parseInt(from[1])-1))[0], toArr(from[0]+(parseInt(from[1])-1))[1]+1];
        const right = [toArr(from[0]+(parseInt(from[1])-1))[0], toArr(from[0]+(parseInt(from[1])-1))[1]-1];
        // check if there is a piece there (!null) and if it is a valid move(!undefined)
        if (board[left[0]][left[1]]!==null && board[left[0]][left[1]]!==undefined && board[left[0]][left[1]][0]!=='b') {
            possibleMoves.push(left);
        }
        if (board[right[0]][right[1]]!==null && board[right[0]][right[1]]!==undefined && board[right[0]][right[1]][0]!=='b') {
            possibleMoves.push(right);
        }
        // END capturing

        // En passant
        // END En passant

        // Pawn promotion
        // END Pawn promotion
    }
    // convert from[1] to int

    return possibleMoves;
}

const getRookMoves = (from, board) => {
    return null;
}

const getKnightMoves = (from, board) => {
    return null;
}

const getBishopMoves = (from, board) => {
    return null;
}

const getQueenMoves = (from, board) => {
    return null;
}

const getKingMoves = (from, board) => {
    return null;
}


