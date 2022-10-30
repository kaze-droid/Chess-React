import { toArr, toStd } from './translateMoves/toArr.js';

// pass in
/*
    - lastMove: for en passant
    - bool check: for whether current color is in check
*/

// TODO: check if each move will put in the king in check. If yes, don't push that move
// TODO: Get all possible legal moves for a given color (if len==0 return checkmate) => maybe seperate file
export function logic (long_piece,from, board, canCastle){
    const color = (long_piece.split(' ')[0])[0].toLowerCase()
    const piece = long_piece.split(' ')[1];
    // get all legal move for piece
    const legalMoves = getLegalMoves(color, piece, from, board, canCastle);
    return legalMoves;
}

const getLegalMoves = (color, piece, from, board, canCastle) => {
    switch (piece) {
        case 'Pawn':
            return getPawnMoves(color, from, board).map(x=>toStd(x));
        case 'Rook':
            return getRookMoves(color, from, board).map(x=>toStd(x));
        case 'Knight':
            return getKnightMoves(color, from, board).map(x=>toStd(x));
        case 'Bishop':
            return getBishopMoves(color, from, board).map(x=>toStd(x));
        case 'Queen':
            return getQueenMoves(color, from, board).map(x=>toStd(x));
        case 'King':
            return getKingMoves(color, from, board, canCastle).map(x=>toStd(x));
        default:
            return [];
    }
};

const getPawnMoves = (color, from, board) => {
    let possibleMoves = [];
    // For white
    if (color==="w") {
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

const getRookMoves = (color, from, board) => {
    let possibleMoves = [];
    // check all four directions
    let i,j;
    [i,j] = toArr(from);

    // upwards (white's perspective)
    let ii = -1;

    while (i+ii>=0) {
        if (board[i+ii][j] === null) {
            possibleMoves.push([i+ii, j]);
            ii-=1;
        } else {
            if (board[i+ii][j].split('')[0] !== color) {
                possibleMoves.push([i+ii, j]);
            }
            break;
        }
    }

    // downwards (white's perspective)
    ii = 1;

    while (i+ii<8) {
        if (board[i+ii][j] === null) {
            possibleMoves.push([i+ii, j]);
            ii+=1;
        } else {
            if (board[i+ii][j].split('')[0] !== color) {
                possibleMoves.push([i+ii, j]);
            }
            break;
        }
    }

    // leftwards (white's perspective)
    let jj = -1;

    while (j+jj>=0) {
        if (board[i][j+jj] === null) {
            possibleMoves.push([i, j+jj]);
            jj-=1;
        } else {
            if (board[i][j+jj].split('')[0] !== color) {
                possibleMoves.push([i, j+jj]);
            }
            break;
        }
    }

    // rightwards (white's perspective)
    jj = 1;
    
    while (j+jj<8) {
        if (board[i][j+jj] === null) {
            possibleMoves.push([i, j+jj]);
            jj+=1;
        } else {
            if (board[i][j+jj].split('')[0] !== color) {
                possibleMoves.push([i, j+jj]);
            }
            break;
        }
    }
    
    return possibleMoves;
}

const getKnightMoves = (color,from, board) => {
    let possibleMoves = [];

    let i,j;
    [i,j] = toArr(from);

    // In a clockwise manner,
    // i-2, j-1
    if (i-2>=0 && i-2<8 && j-1>=0 && j-1<8) {
        if (board[i-2][j-1] === null || board[i-2][j-1].split('')[0] !== color) {
            possibleMoves.push([i-2, j-1]);
        }
    }
    // i-2, j+1
    if (i-2>=0 && i-2<8 && j+1>=0 && j+1<8) {
        if (board[i-2][j+1] === null || board[i-2][j+1].split('')[0] !== color) {
            possibleMoves.push([i-2, j+1]);
        }
    }
    // j+2, i-1
    if (i-1>=0 && i-1<8 && j+2>=0 && j+2<8) {
        if (board[i-1][j+2] === null || board[i-1][j+2].split('')[0] !== color) {
            possibleMoves.push([i-1, j+2]);
        }
    }
    // j+2, i+1
    if (i+1>=0 && i+1<8 && j+2>=0 && j+2<8) {
        if (board[i+1][j+2] === null || board[i+1][j+2].split('')[0] !== color) {
            possibleMoves.push([i+1, j+2]);
        }
    }
    // i+2, j+1
    if (i+2>=0 && i+2<8 && j+1>=0 && j+1<8) {
        if (board[i+2][j+1] === null || board[i+2][j+1].split('')[0] !== color) {
            possibleMoves.push([i+2, j+1]);
        }
    }
    // i+2, j-1
    if (i+2>=0 && i+2<8 && j-1>=0 && j-1<8) {
        if (board[i+2][j-1] === null || board[i+2][j-1].split('')[0] !== color) {
            possibleMoves.push([i+2, j-1]);
        }
    }
    // j-2, i+1
    if (i+1>=0 && i+1<8 && j-2>=0 && j-2<8) {
        if (board[i+1][j-2] === null || board[i+1][j-2].split('')[0] !== color) {
            possibleMoves.push([i+1, j-2]);
        }
    }
    // j-2, i-1
    if (i-1>=0 && i-1<8 && j-2>=0 && j-2<8) {
        if (board[i-1][j-2] === null || board[i-1][j-2].split('')[0] !== color) {
            possibleMoves.push([i-1, j-2]);
        }
    }

    return possibleMoves;
}

const getBishopMoves = (color, from, board) => {
    let possibleMoves = [];
    // check all 4 diagonals
    let i,j;
    [i, j] = toArr(from);

    // up right (white's perspective)
    let ii = -1;
    let jj = 1;

    while (i+ii>=0 && j+jj<8) {
        if (board[i+ii][j+jj] === null) {
            possibleMoves.push([i+ii, j+jj]);
            ii--;
            jj++;
        } else {
            if (board[i+ii][j+jj]!== undefined && board[i+ii][j+jj].split('')[0] !== color) {
                possibleMoves.push([i+ii, j+jj]);
            }
            break;
        }
    }
    // up left (white's perspective)
    ii = -1;
    jj = -1;

    while (i+ii>=0 && j+jj>=0) {
        if (board[i+ii][j+jj] === null) {
            possibleMoves.push([i+ii, j+jj]);
            ii--;
            jj--;
        } else {
            if (board[i+ii][j+jj]!== undefined && board[i+ii][j+jj].split('')[0] !== color) {
                possibleMoves.push([i+ii, j+jj]);
            }
            break;
        }
    }

    // down right (white's perspective)
    ii = 1;
    jj = 1;

    while (i+ii<8 && j+jj<8) {
        if (board[i+ii][j+jj] === null) {
            possibleMoves.push([i+ii, j+jj]);
            ii++;
            jj++;
        } else {
            if (board[i+ii][j+jj]!== undefined && board[i+ii][j+jj].split('')[0] !== color) {
                possibleMoves.push([i+ii, j+jj]);
            }
            break;
        }
    }

    // down left (white's perspective)
    ii = 1;
    jj = -1;

    while (i+ii<8 && j+jj>=0) {
        if (board[i+ii][j+jj] === null) {
            possibleMoves.push([i+ii, j+jj]);
            ii++;
            jj--;
        } else {
            if (board[i+ii][j+jj]!== undefined &&  board[i+ii][j+jj].split('')[0] !== color) {
                possibleMoves.push([i+ii, j+jj]);
            }
            break;
        }
    }

    return possibleMoves;
}

const getQueenMoves = (color, from, board) => {
    return getRookMoves(color, from, board).concat(getBishopMoves(color, from, board));
}

const getKingMoves = (color, from, board, canCastle) => {
    let possibleMoves = [];
    let i,j;
    [i,j] = toArr(from);

    if (i-1>=0) {
        if (board[i-1][j] === null || (board[i-1][j]!== undefined && board[i-1][j].split('')[0] !== color)) {
            possibleMoves.push([i-1, j]);
        }
    }

    if (i-1>=0 && j+1>=0) {
        if (board[i-1][j+1] === null ||  (board[i-1][j+1]!== undefined && board[i-1][j+1].split('')[0] !== color)) {
            possibleMoves.push([i-1, j+1]);
        }
    }

    if (j+1>=0) {
        if (board[i][j+1] === null || (board[i][j+1]!== undefined && board[i][j+1].split('')[0] !== color)) {
            possibleMoves.push([i, j+1]);
        }
    }

    if (i+1<8 && j+1<8) {
        if (board[i+1][j+1] === null || (board[i+1][j+1]!== undefined && board[i+1][j+1].split('')[0] !== color)) {
            possibleMoves.push([i+1, j+1]);
        }
    }

    if (i+1<8) {
        if (board[i+1][j] === null || (board[i+1][j]!== undefined &&board[i+1][j].split('')[0] !== color)) {
            possibleMoves.push([i+1, j]);
        }
    }

    if (i+1<8 && j-1>=0) {
        if (board[i+1][j-1] === null || (board[i+1][j-1]!== undefined && board[i+1][j-1].split('')[0] !== color)) {
            possibleMoves.push([i+1, j-1]);
        }
    }

    if (j-1>=0) {
        if (board[i][j-1] === null || (board[i][j-1]!== undefined && board[i][j-1].split('')[0] !== color)) {
            possibleMoves.push([i, j-1]);
        }
    }

    if (i-1>=0 && j-1>=0) {
        if (board[i-1][j-1] === null || (board[i-1][j-1]!== undefined && board[i-1][j-1].split('')[0] !== color)) {
            possibleMoves.push([i-1, j-1]);
        }
    }

    // Castling
    // TODO: check if any of these squares are under attack if so can't castle
    if (color==='w') {
        // White short
        if (canCastle[0] === true) {
            if (board[7][5] === null && board[7][6] === null) {
                possibleMoves.push([7,6]);
                possibleMoves.push([7,7]);
            }
        }
        // White long
        if (canCastle[1] === true) {
            if (board[7][1] === null && board[7][2] === null && board[7][3] === null) {
                possibleMoves.push([7,2]);
                possibleMoves.push([7,0]);
            }
            
        }
    } else {
        // Black short
        if (canCastle[2] === true) {
            if (board[0][5] === null && board[0][6] === null) {
                possibleMoves.push([0,6]);
                possibleMoves.push([0,7]);
            }
        }
        // Black long
        if (canCastle[3] === true) {
            if (board[0][1] === null && board[0][2] === null && board[0][3] === null) {
                possibleMoves.push([0,2]);
                possibleMoves.push([0,0]);
            }
        }
    }

    return possibleMoves;
}


