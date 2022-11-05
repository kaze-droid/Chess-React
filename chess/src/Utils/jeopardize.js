// Check if a move will jeopardize the king (put the king in check)
import { toArr } from './translateMoves/toArr.js';
import { inCheck } from './inCheck';

export function jeopardize(board, color, from, to, canCastle, prevMove, isEnPassant = false) {
    // deepcopy a virtual board (won't affect the main board in Board.jsx)
    // checks if the move will put the king in check in the virtual board
    // returns true if the move will put the king in check (which prevents the move from being legal)
    const virtualBoard = JSON.parse(JSON.stringify(board));
    const [from_i, from_j] = toArr(from);
    const [to_i, to_j] = toArr(to);

    if (isEnPassant) {
        virtualBoard[to_i][to_j] = virtualBoard[from_i][from_j];
        virtualBoard[from_i][from_j] = null;
        if (color === 'w') {
            virtualBoard[to_i + 1][to_j] = null;
        } else {
            virtualBoard[to_i - 1][to_j] = null;
        }

    } else {
        const tmp = virtualBoard[from_i][from_j];
        virtualBoard[from_i][from_j] = null;
        virtualBoard[to_i][to_j] = tmp;
    }

    if (color === 'w') {
        return !inCheck(virtualBoard, 'Black', canCastle, prevMove);
    } else {
        return !inCheck(virtualBoard, 'White', canCastle, prevMove);
    }
}