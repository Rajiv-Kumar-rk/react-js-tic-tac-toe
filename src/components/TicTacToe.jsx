import { useRef, useState } from 'react';
import styles from '../styles/TicTacToe.module.css';

let board = ['', '', '', '', '', '', '', '', ''];

function  TicTacToe() {
  console.log('------------ tic tac toe complete component -------')

  let boardPosRef0 = useRef(null);
  let boardPosRef1 = useRef(null);
  let boardPosRef2 = useRef(null);
  let boardPosRef3 = useRef(null);
  let boardPosRef4 = useRef(null);
  let boardPosRef5 = useRef(null);
  let boardPosRef6 = useRef(null);
  let boardPosRef7 = useRef(null);
  let boardPosRef8 = useRef(null);

  let boxPosRef = [boardPosRef0, boardPosRef1, boardPosRef2, boardPosRef3, boardPosRef4, boardPosRef5, boardPosRef6, boardPosRef7, boardPosRef8];

  let titleRef = useRef();

  let [turn, setTurn] = useState(0);
  let [freeze, setFreeze] = useState(false);

  function winMatch(){
    console.log('checking the winner...')

    if(board[0]!=='' && board[0] === board[1] && board[1] === board[2]){
      stopGame(board[0]);
    }

    else if(board[3]!=='' && board[3] === board[4] && board[4] === board[5]){
      stopGame(board[3]);
    }

    else if(board[6]!=='' && board[6] === board[7] && board[7] === board[8]){
      stopGame(board[6]);
    }

    else if(board[0]!=='' && board[0] === board[3] && board[3] === board[6]){
      stopGame(board[0]);
    }

    else if(board[1]!=='' && board[1] === board[4] && board[4] === board[7]){
      stopGame(board[1]);
    }

    else if(board[2]!=='' && board[2] === board[5] && board[5] === board[8]){
      stopGame(board[2]);
    }

    else if(board[0]!=='' && board[0] === board[4] && board[4] === board[8]){
      stopGame(board[0]);
    }

    else if(board[2]!=='' && board[2] === board[4] && board[4] === board[6]){
      stopGame(board[2]);
    }

    else {
      if (turn >= 8){
        console.log('No one won the match, re-start to play again...');
        
        //freeze the board
        setFreeze(freeze => !freeze);

        //show the game message
        titleRef.current.innerHTML = `No one has win the game, restart the game to play again...`;
      }
    }

    setTurn((turn)=>turn+1);

  }

  function stopGame(winner){
    console.log(`Congratulations! '${winner}' is the winner...`);

    //show the game win message
    titleRef.current.innerHTML = `Congratualions! Player '${winner}' win this game...`;

    setFreeze(freeze => !freeze);
  }

  function hanldeBoardAction(e, position){
    //check board freeze status
    console.log(`freeze status: ${freeze}`);
    if(freeze) {
      console.log('Game freezed!');
      return 0;
    }

    //check board position is free
    if(board[position] === ''){
      //if 'x' take action
      if(turn%2 === 0){
        e.target.innerHTML = `<div class=${styles.CrossTaken}></div>`;
        board[position] = 'x';
        console.log(`set  the pos ${position} with value 'X'`);
      }
  
      //if '0' take action
      else if(turn%2 !== 0){
        e.target.innerHTML = `<div class=${styles.ZeroTaken}></div>`;
        board[position] = '0';
        console.log(`set  the pos ${position} with value '0'`);
      }
  
      winMatch();
    }
    else{
      return 0;
    }
  }

  function handleRestart(){
    //remove the freeze
    setFreeze(false);

    //re-set the number of turns
    setTurn(0)

    //change title
    titleRef.current.innerHTML = `Tic Tac Toe Game!`;

    //reset board
    board = ['', '', '', '', '', '', '', '', ''];

    boxPosRef.map((pRef)=>{
      pRef.current.innerHTML = '';
    })
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title} ref={titleRef}>Tic Tac Toe Game!</h1>
      <div className={styles.board}>
        <div className={styles.row}>
          <div className={styles.box} ref={boardPosRef0} onClick={(e)=>hanldeBoardAction(e, 0)}></div>
          <div className={styles.box} ref={boardPosRef1} onClick={(e)=>hanldeBoardAction(e, 1)}></div>
          <div className={styles.box} ref={boardPosRef2} onClick={(e)=>hanldeBoardAction(e, 2)}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.box} ref={boardPosRef3} onClick={(e)=>hanldeBoardAction(e, 3)} ></div>
          <div className={styles.box} ref={boardPosRef4} onClick={(e)=>hanldeBoardAction(e, 4)}></div>
          <div className={styles.box} ref={boardPosRef5} onClick={(e)=>hanldeBoardAction(e, 5)}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.box} ref={boardPosRef6} onClick={(e)=>hanldeBoardAction(e, 6)}></div>
          <div className={styles.box} ref={boardPosRef7} onClick={(e)=>hanldeBoardAction(e, 7)}></div>
          <div className={styles.box} ref={boardPosRef8} onClick={(e)=>hanldeBoardAction(e, 8)}></div>
        </div>
      </div>
      <button className={styles.restartBtn} onClick={()=>handleRestart()}>Restart</button>
    </div>
  )
}

export default TicTacToe;