import { toArr, toStd } from './translateMoves/toArr.js';
import { jeopardize } from './jeopardize.js';

// pass in
/*
    - lastMove: for en passant
    - bool check: for whether current color is in check
*/
export function logic (long_piece,from, board, canCastle, withoutJeopardize = false){
    const color = (long_piece.split(' ')[0])[0].toLowerCase()
    const piece = long_piece.split(' ')[1];

    // get all legal move for piece
    const legalMoves = getLegalMoves(color, piece, from, board, canCastle, withoutJeopardize);
    return legalMoves;
}

const getLegalMoves = (color, piece, from, board, canCastle, withoutJeopardize) => {
    switch (piece) {
        case 'Pawn':
            return getPawnMoves(color, from, board, canCastle, withoutJeopardize).map(x=>toStd(x));
        case 'Rook':
            return getRookMoves(color, from, board, canCastle, withoutJeopardize).map(x=>toStd(x));
        case 'Knight':
            return getKnightMoves(color, from, board, canCastle, withoutJeopardize).map(x=>toStd(x));
        case 'Bishop':
            return getBishopMoves(color, from, board, canCastle, withoutJeopardize).map(x=>toStd(x));
        case 'Queen':
            return getQueenMoves(color, from, board, canCastle, withoutJeopardize).map(x=>toStd(x));
        case 'King':
            return getKingMoves(color, from, board, canCastle, withoutJeopardize).map(x=>toStd(x));
        default:
            return [];
    }
};

const getPawnMoves = (color, from, board, canCastle, withoutJeopardize) => {
    let possibleMoves = [];
    // For white
    if (color==="w") {
        // moving one square forward
        if (board[toArr(from[0]+(parseInt(from[1])+1))[0]][toArr(from[0]+(parseInt(from[1])+1))[1]] === null) {
            if (withoutJeopardize || jeopardize(board, color, from[0]+(parseInt(from[1])), from[0]+(parseInt(from[1])+1), canCastle)) {
                possibleMoves.push(toArr(from[0]+(parseInt(from[1])+1)));
            }
            // moving two squares forward
            if (from[1]==='2' && board[toArr(from[0]+(parseInt(from[1])+2))[0]][toArr(from[0]+(parseInt(from[1])+2))[1]] === null) {
                if (withoutJeopardize || jeopardize(board, color, from[0]+(parseInt(from[1])), from[0]+(parseInt(from[1])+2), canCastle)) {
                    possibleMoves.push(toArr(from[0]+(parseInt(from[1])+2)));
                }
            }
        }

        // capturing
        const left = [toArr(from[0]+(parseInt(from[1])+1))[0], toArr(from[0]+(parseInt(from[1])+1))[1]-1];
        const right = [toArr(from[0]+(parseInt(from[1])+1))[0], toArr(from[0]+(parseInt(from[1])+1))[1]+1];
        // check if there is a piece there (!null) and if it is a valid move(!undefined)
        if (board[left[0]][left[1]]!==null && board[left[0]][left[1]]!==undefined && board[left[0]][left[1]][0]!=='w') {
            if (withoutJeopardize || jeopardize(board, color, from[0]+(parseInt(from[1])), toStd(left), canCastle)) {
                possibleMoves.push(left);
            }
        }
        if (board[right[0]][right[1]]!==null && board[right[0]][right[1]]!==undefined && board[right[0]][right[1]][0]!=='w') {
            if (withoutJeopardize || jeopardize(board, color, from[0]+(parseInt(from[1])), toStd(right), canCastle)) {
                possibleMoves.push(right);
            }
        }
        // END capturing

        // en passant
        // END en passant

        // Pawn promotion
        // END Pawn promotion

        return possibleMoves;
        // For black
    } else {
        // moving one square forward
        if (board[toArr(from[0]+(parseInt(from[1])-1))[0]][toArr(from[0]+(parseInt(from[1])-1))[1]] === null) {
            if (withoutJeopardize || jeopardize(board, color, from[0]+(parseInt(from[1])), from[0]+(parseInt(from[1])-1), canCastle)) {
                possibleMoves.push(toArr(from[0]+(parseInt(from[1])-1)));
            }
            // moving two squares forward
            if (from[1]==='7' && board[toArr(from[0]+(parseInt(from[1])-2))[0]][toArr(from[0]+(parseInt(from[1])-2))[1]] === null) {
                if (withoutJeopardize || jeopardize(board, color, from[0]+(parseInt(from[1])), from[0]+(parseInt(from[1])-2), canCastle)) {
                    possibleMoves.push(toArr(from[0]+(parseInt(from[1])-2)));
                }
            }
        }

        // capturing
        const left = [toArr(from[0]+(parseInt(from[1])-1))[0], toArr(from[0]+(parseInt(from[1])-1))[1]+1];
        const right = [toArr(from[0]+(parseInt(from[1])-1))[0], toArr(from[0]+(parseInt(from[1])-1))[1]-1];
        // check if there is a piece there (!null) and if it is a valid move(!undefined)
        if (board[left[0]][left[1]]!==null && board[left[0]][left[1]]!==undefined && board[left[0]][left[1]][0]!=='b') {
            if (withoutJeopardize || jeopardize(board, color, from[0]+(parseInt(from[1])), toStd(left), canCastle)) {
                possibleMoves.push(left);
            }
        }
        if (board[right[0]][right[1]]!==null && board[right[0]][right[1]]!==undefined && board[right[0]][right[1]][0]!=='b') {
            if (withoutJeopardize || jeopardize(board, color, from[0]+(parseInt(from[1])), toStd(right), canCastle)) {
                possibleMoves.push(right);
            }
        }
        // END capturing

        // En passant
        // END En passant

        // Pawn promotion
        // END Pawn promotion
        return possibleMoves;
    }
}

const getRookMoves = (color, from, board, canCastle, withoutJeopardize) => {
    let possibleMoves = [];
    // check all four directions
    let i,j;
    [i,j] = toArr(from);

    // upwards (white's perspective)
    let ii = -1;

    while (i+ii>=0) {
        if (board[i+ii][j] === null) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j]), canCastle)) {
                possibleMoves.push([i+ii, j]);
                ii--;
            } else {
                ii--;
                if (board[i+ii][j]!== undefined && board[i+ii][j]!== null && board[i+ii][j].split('')[0] !== color) {
                    if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j]), canCastle)) {
                        possibleMoves.push([i+ii, j]);
                    }
                }
                break;
            }
        } else {
            if (board[i+ii][j].split('')[0] !== color) {
                if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j]), canCastle)) {
                    possibleMoves.push([i+ii, j]);
                }
            }
            break;
        }
    }

    // downwards (white's perspective)
    ii = 1;

    while (i+ii<8) {
        if (board[i+ii][j] === null) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j]), canCastle)) {
                possibleMoves.push([i+ii, j]);
                ii++;
            } else {
                ii++;
                if (board[i+ii][j]!== undefined && board[i+ii][j]!== null && board[i+ii][j].split('')[0] !== color) {
                    if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j]), canCastle)) {
                        possibleMoves.push([i+ii, j]);
                    }
                }
                break;
            }
        } else {
            if (board[i+ii][j].split('')[0] !== color) {
                if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j]), canCastle)) {
                    possibleMoves.push([i+ii, j]);
                }
            }
            break;
        }
    }

    // leftwards (white's perspective)
    let jj = -1;

    while (j+jj>=0) {
        if (board[i][j+jj] === null) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i,j+jj]), canCastle)) {
                possibleMoves.push([i, j+jj]);
                jj--;
            } else {
                jj--;
                if (board[i][j+jj]!== undefined && board[i][j+jj]!== null && board[i][j+jj].split('')[0] !== color) {
                    if (withoutJeopardize || jeopardize(board, color, from, toStd([i,j+jj]), canCastle)) {
                        possibleMoves.push([i, j+jj]);
                    }
                }
                break;
            }
        } else {
            if (board[i][j+jj].split('')[0] !== color) {
                if (withoutJeopardize || jeopardize(board, color, from, toStd([i,j+jj]), canCastle)) {
                    possibleMoves.push([i, j+jj]);
                }
            }
            break;
        }
    }

    // rightwards (white's perspective)
    jj = 1;
    
    while (j+jj<8) {
        if (board[i][j+jj] === null) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i,j+jj]), canCastle)) {
                possibleMoves.push([i, j+jj]);
                jj++;
            } else {
                jj++;
                if (board[i][j+jj]!== undefined && board[i][j+jj]!== null && board[i][j+jj].split('')[0] !== color) {
                    if (withoutJeopardize || jeopardize(board, color, from, toStd([i,j+jj]), canCastle)) {
                        possibleMoves.push([i, j+jj]);
                    }
                }
                break;
            }
        } else {
            if (board[i][j+jj].split('')[0] !== color) {
                if (withoutJeopardize || jeopardize(board, color, from, toStd([i,j+jj]), canCastle)) {
                    possibleMoves.push([i, j+jj]);
                }
            }
            break;
        }
    }
    
    return possibleMoves;
}

const getKnightMoves = (color,from, board, canCastle, withoutJeopardize) => {
    let possibleMoves = [];

    let i,j;
    [i,j] = toArr(from);

    // In a clockwise manner,
    // i-2, j-1
    if (i-2>=0 && i-2<8 && j-1>=0 && j-1<8) {
        if (board[i-2][j-1] === null || board[i-2][j-1].split('')[0] !== color) { 
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i-2,j-1]), canCastle)) {
                possibleMoves.push([i-2, j-1]);
            }
        }
    }
    // i-2, j+1
    if (i-2>=0 && i-2<8 && j+1>=0 && j+1<8) {
        if (board[i-2][j+1] === null || board[i-2][j+1].split('')[0] !== color) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i-2,j+1]), canCastle)) {
                possibleMoves.push([i-2, j+1]);
            }
        }
    }
    // j+2, i-1
    if (i-1>=0 && i-1<8 && j+2>=0 && j+2<8) {
        if (board[i-1][j+2] === null || board[i-1][j+2].split('')[0] !== color) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i-1,j+2]), canCastle)) {
                possibleMoves.push([i-1, j+2]);
            }
        }
    }
    // j+2, i+1
    if (i+1>=0 && i+1<8 && j+2>=0 && j+2<8) {
        if (board[i+1][j+2] === null || board[i+1][j+2].split('')[0] !== color) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i+1,j+2]), canCastle)) {
                possibleMoves.push([i+1, j+2]);
            }
        }
    }
    // i+2, j+1
    if (i+2>=0 && i+2<8 && j+1>=0 && j+1<8) {
        if (board[i+2][j+1] === null || board[i+2][j+1].split('')[0] !== color) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i+2,j+1]), canCastle)) {
                possibleMoves.push([i+2, j+1]);
            }
        }
    }
    // i+2, j-1
    if (i+2>=0 && i+2<8 && j-1>=0 && j-1<8) {
        if (board[i+2][j-1] === null || board[i+2][j-1].split('')[0] !== color) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i+2,j-1]), canCastle)) {
                possibleMoves.push([i+2, j-1]);
            }
        }
    }
    // j-2, i+1
    if (i+1>=0 && i+1<8 && j-2>=0 && j-2<8) {
        if (board[i+1][j-2] === null || board[i+1][j-2].split('')[0] !== color) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i+1,j-2]), canCastle)) {
                possibleMoves.push([i+1, j-2]);
            }
        }
    }
    // j-2, i-1
    if (i-1>=0 && i-1<8 && j-2>=0 && j-2<8) {
        if (board[i-1][j-2] === null || board[i-1][j-2].split('')[0] !== color) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i-1,j-2]), canCastle)) {
                possibleMoves.push([i-1, j-2]);
            }
        }
    }

    return possibleMoves;
}

const getBishopMoves = (color, from, board, canCastle, withoutJeopardize) => {
    let possibleMoves = [];
    // check all 4 diagonals
    let i,j;
    [i, j] = toArr(from);

    // up right (white's perspective)
    let ii = -1;
    let jj = 1;

    while (i+ii>=0 && j+jj<8) {
        if (board[i+ii][j+jj] === null) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j+jj]), canCastle)) {
                possibleMoves.push([i+ii, j+jj]);
                ii--;
                jj++;
            } else {
                ii--;
                jj++;
                if (!(i+ii>=0 && j+jj>=0 && i+ii <8 && j+jj <8)) {
                    break;
                }
                if (board[i+ii][j+jj]!== undefined && board[i+ii][j+jj]!== null && board[i+ii][j+jj].split('')[0] !== color) {
                    if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j+jj]), canCastle)) {
                        possibleMoves.push([i+ii, j+jj]);
                    }
                }
                break;
            }
        } else {
            if (board[i+ii][j+jj]!== undefined && board[i+ii][j+jj].split('')[0] !== color) {
                if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j+jj]), canCastle)) {
                    possibleMoves.push([i+ii, j+jj]);
                }
            }
            break;
        }
    }
    // up left (white's perspective)
    ii = -1;
    jj = -1;

    while (i+ii>=0 && j+jj>=0) {
        if (board[i+ii][j+jj] === null) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j+jj]), canCastle)) {
                possibleMoves.push([i+ii, j+jj]);
                ii--;
                jj--;
            } else {
                ii--;
                jj--;
                if (!(i+ii>=0 && j+jj>=0 && i+ii <8 && j+jj <8)) {
                    break;
                }

                if (board[i+ii][j+jj]!== undefined && board[i+ii][j+jj]!== null && board[i+ii][j+jj].split('')[0] !== color) {
                    if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j+jj]), canCastle)) {
                        possibleMoves.push([i+ii, j+jj]);
                    }
                }
                break;
            }
        } else {
            if (board[i+ii][j+jj]!== undefined && board[i+ii][j+jj].split('')[0] !== color) {
                if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j+jj]), canCastle)) {
                    possibleMoves.push([i+ii, j+jj]);
                }
            }
            break;
        }
    }

    // down right (white's perspective)
    ii = 1;
    jj = 1;

    while (i+ii<8 && j+jj<8) {
        if (board[i+ii][j+jj] === null) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j+jj]), canCastle)) {
                possibleMoves.push([i+ii, j+jj]);
                ii++;
                jj++;
            } else {
                ii++;
                jj++;
                if (!(i+ii>=0 && j+jj>=0 && i+ii <8 && j+jj <8)) {
                    break;
                }
                if (board[i+ii][j+jj]!== undefined && board[i+ii][j+jj]!== null && board[i+ii][j+jj].split('')[0] !== color) {
                    if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j+jj]), canCastle)) {
                        possibleMoves.push([i+ii, j+jj]);
                    }
                }
                break;
            }
        } else {
            if (board[i+ii][j+jj]!== undefined && board[i+ii][j+jj].split('')[0] !== color) {
                if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j+jj]), canCastle)) {
                    possibleMoves.push([i+ii, j+jj]);
                }
            }
            break;
        }
    }

    // down left (white's perspective)
    ii = 1;
    jj = -1;

    while (i+ii<8 && j+jj>=0) {
        if (board[i+ii][j+jj] === null) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j+jj]), canCastle)) {
                possibleMoves.push([i+ii, j+jj]);
                ii++;
                jj--;
            } else {
                ii++;
                jj--;
                if (!(i+ii>=0 && j+jj>=0 && i+ii <8 && j+jj <8)) {
                    break;
                }
                if (board[i+ii][j+jj]!== undefined && board[i+ii][j+jj]!== null && board[i+ii][j+jj].split('')[0] !== color) {
                    if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j+jj]), canCastle)) {
                        possibleMoves.push([i+ii, j+jj]);
                    }
                }
                break;
            }
        } else {
            if (board[i+ii][j+jj]!== undefined && board[i+ii][j+jj].split('')[0] !== color) {
                if (withoutJeopardize || jeopardize(board, color, from, toStd([i+ii,j+jj]), canCastle)) {
                    possibleMoves.push([i+ii, j+jj]);
                }
            }
            break;
        }
    }

    return possibleMoves;
}

const getQueenMoves = (color, from, board, canCastle, withoutJeopardize) => {
    return getRookMoves(color, from, board, canCastle, withoutJeopardize).concat(getBishopMoves(color, from, board, canCastle, withoutJeopardize));
}

const getKingMoves = (color, from, board, canCastle, withoutJeopardize) => {
    let possibleMoves = [];
    let i,j;
    [i,j] = toArr(from);

    if (i-1>=0) {
        if (board[i-1][j] === null || (board[i-1][j]!== undefined && board[i-1][j].split('')[0] !== color)) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i-1,j]), canCastle)) {
                possibleMoves.push([i-1, j]);
            }
        }
    }

    if (i-1>=0 && j+1>=0) {
        if (board[i-1][j+1] === null ||  (board[i-1][j+1]!== undefined && board[i-1][j+1].split('')[0] !== color)) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i-1,j+1]), canCastle)) {
                possibleMoves.push([i-1, j+1]);
            }
        }
    }

    if (j+1>=0) {
        if (board[i][j+1] === null || (board[i][j+1]!== undefined && board[i][j+1].split('')[0] !== color)) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i,j+1]), canCastle)) {
                possibleMoves.push([i, j+1]);
            }
        }
    }

    if (i+1<8 && j+1<8) {
        if (board[i+1][j+1] === null || (board[i+1][j+1]!== undefined && board[i+1][j+1].split('')[0] !== color)) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i+1,j+1]), canCastle)) {
                possibleMoves.push([i+1, j+1]);
            }
        }
    }

    if (i+1<8) {
        if (board[i+1][j] === null || (board[i+1][j]!== undefined &&board[i+1][j].split('')[0] !== color)) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i+1,j]), canCastle)) {
                possibleMoves.push([i+1, j]);
            }
        }
    }

    if (i+1<8 && j-1>=0) {
        if (board[i+1][j-1] === null || (board[i+1][j-1]!== undefined && board[i+1][j-1].split('')[0] !== color)) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i+1,j-1]), canCastle)) {
                possibleMoves.push([i+1, j-1]);
            }
        }
    }

    if (j-1>=0) {
        if (board[i][j-1] === null || (board[i][j-1]!== undefined && board[i][j-1].split('')[0] !== color)) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i,j-1]), canCastle)) {
                possibleMoves.push([i, j-1]);
            }
        }
    }

    if (i-1>=0 && j-1>=0) {
        if (board[i-1][j-1] === null || (board[i-1][j-1]!== undefined && board[i-1][j-1].split('')[0] !== color)) {
            if (withoutJeopardize || jeopardize(board, color, from, toStd([i-1,j-1]), canCastle)) {
                possibleMoves.push([i-1, j-1]);
            }
        }
    }

    // Castling
    if (color==='w') {
        // White short
        if (canCastle[0] === true) {
            if (board[7][5] === null && board[7][6] === null) {
                if (withoutJeopardize || (jeopardize(board, color, from, toStd([7,6]), canCastle) && jeopardize(board, color, from, toStd([7,5]), canCastle) && jeopardize(board, color, from, toStd([7,4]), canCastle))) {
                    possibleMoves.push([7,6]);
                    possibleMoves.push([7,7]);
                }
            }
        }
        // White long
        if (canCastle[1] === true) {
            if (board[7][1] === null && board[7][2] === null && board[7][3] === null) {
                if (withoutJeopardize || (jeopardize(board, color, from, toStd([7,2]), canCastle) && jeopardize(board, color, from, toStd([7,3]), canCastle) && jeopardize(board, color, from, toStd([7,4]), canCastle))) {
                    possibleMoves.push([7,2]);                    
                    possibleMoves.push([7,0]);
                }
            }
            
        }
    } else {
        // Black short
        if (canCastle[2] === true) {
            if (board[0][5] === null && board[0][6] === null) {
                if (withoutJeopardize || (jeopardize(board, color, from, toStd([0,6]), canCastle) && jeopardize(board, color, from, toStd([0,5]), canCastle) && jeopardize(board, color, from, toStd([0,4]), canCastle))) {
                    possibleMoves.push([0,6]);
                    possibleMoves.push([0,7]);
                }
            }
        }
        // Black long
        if (canCastle[3] === true) {
            if (board[0][1] === null && board[0][2] === null && board[0][3] === null) {
                if (withoutJeopardize || (jeopardize(board, color, from, toStd([0,2]), canCastle) && jeopardize(board, color, from, toStd([0,3]), canCastle) && jeopardize(board, color, from, toStd([0,4]), canCastle))) {
                    possibleMoves.push([0,2]);
                    possibleMoves.push([0,0]);
                }
            }
        }
    }

    return possibleMoves;
}


