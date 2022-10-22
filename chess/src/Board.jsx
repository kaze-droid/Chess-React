import React, { Component } from 'react';
import Square from './Square';

const chessRow = ['A','B','C','D','E','F','G','H'];

class Board extends Component {
    constructor(setLastMove) {
        super();
        this.board = [];
        this.chessBoard();
        this.setLastMove = setLastMove;
    }

    detectPiece = (e,key) => {
        if (e.target instanceof HTMLImageElement) {
            this.setLastMove({lastMove : key, pieceMove : e.target.alt});
        } else {
            this.setLastMove({lastMove : key, pieceMove : null});
        }
    };

    chessBoard = () => {
        const SIZE = 8;
        for (let i=0;i<SIZE;i++) {
            let tmp = [];
            for (let j=0;j<SIZE;j++) {
                tmp.push(<Square key={chessRow[j]+""+(8-i)} id={chessRow[j]+""+(8-i)} isWhite = {((i+j)%2) ? false : true} detectPiece = {(event) => {this.detectPiece(event, chessRow[j]+""+(8-i))}} />);
            }
            this.board.push(tmp);
        }
    };
}

export default Board;

