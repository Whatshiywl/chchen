import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Square } from '@chchen/api-interfaces';

@Component({
  selector: 'chchen-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board = [];
  originCell = [];
  matchId: string;

  constructor(
    private httpService: HttpService,
  ) { }

  ngOnInit() {
    this.init();
    this.getMatch();
  }

  init () {
    for (let i = 0; i < 8; i++)
      this.board.push(['', '', '', '', '', '', '', ''])
  }

  getMatch() {
    this.httpService.createMatch('white', 'black')
    .subscribe(match => {
      this.matchId = match.id;
      this.setBoardPositions(match.board.squares);
    });
  }

  setBoardPositions(board: Square[][]) {
    console.log(this.board, board);
    board.forEach((col, i) => {
      col.forEach((row, j) => {
        const piece = board[i][j];
        console.log(piece, i, j);
        this.board[i][j] = this.getClassFromType(piece);
      })
    })
  }

  onCellSelected (row: number, col: number) {
    console.log(row, col);

    // unselect if selected again
    if (this.originCell[0] === row && this.originCell[1] === col) {
      return this.originCell = [];
    }

    // selecting origin
    if (this.originCell.length === 0) {
      return this.originCell = [row, col];
    }

    //move
    const from = this.originCell.join(',');
    const to = `${row},${col}`;

    this.httpService.move(this.matchId, from, to)
    .subscribe((match) => {
      this.setBoardPositions(match.board.squares);
    });
    this.originCell = [];
  }

  

  isSelected (row: number, col: number) {
    return this.originCell[0] === row && this.originCell[1] === col;
  }

  getClassFromType (piece) {
    if (!piece) return '';

    const {type, color} = piece;
    let colorString = 'white-';

    if (color === -1)
      colorString = 'black-';

    let typeString: string;
    switch (type) {
      case 1:
        typeString = 'pawn';
        break;
      case 2:
        typeString = 'rook';
        break;
      case 3:
        typeString = 'bishop';
        break;
      case 4:
        typeString = 'knight';
        break;
      case 5:
        typeString = 'queen';
        break;
      case 6:
        typeString = 'king';
    }

    return colorString + typeString;
  }

}
