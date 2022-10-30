export function toArr (stdNotation) {
    // Convert from board notation ("E2") to index for terminalBoard(6,4)
    const chessRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const Index_j = chessRow.indexOf(stdNotation[0]);
    const Index_i = 8-stdNotation[1];
    return [Index_i, Index_j];
};

export function toStd (arr) {
    // for debugging
    // Convert from index for terminalBoard(6,4) to board notation ("E2")
    const chessRow = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const stdNotation = chessRow[arr[1]]+(8-arr[0]);
    return stdNotation;
};