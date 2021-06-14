document.addEventListener('DOMContentLoaded', () =>  {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    let squares = [];
    const width = 4;
    let score=0; //to main score of player
  
    //create the playing board
    function createBoard() {
      for (let i=0; i < width*width; i++) {
        square = document.createElement('div');
        square.innerHTML = '0';
        gridDisplay.appendChild(square);
        squares.push(square);
      }
      generate();
      generate();
    }
    createBoard();

    //generate random number
    function generate(){
        randomNumber= Math.floor(Math.random()*squares.length);
        if(squares[randomNumber].innerHTML==0){
            squares[randomNumber].innerHTML=2; 
            game_over_check();    
        }else generate();
    }

    //to move right
    function right_move(){
      for(let i=0;i<16;i++){
        if(i%4==0){
          let sum_one=squares[i].innerHTML;
          let sum_two=squares[i+1].innerHTML;
          let sum_three=squares[i+2].innerHTML;
          let sum_four=squares[i+3].innerHTML;
          let row= [parseInt(sum_one), parseInt(sum_two), parseInt(sum_three), parseInt(sum_four)];
          
         // console.log(row);
          let filter_row= row.filter(num=>num);
         // console.log(filter_row);

          /*now as we have filtered row, we need to make an arrayof missing values and size(missing)
          will be number of filled-no. of zeroes*/

          let empty_places = 4- filter_row.length;
          let zero= Array(empty_places).fill(0);
          //console.log(zero);
          let newRow=zero.concat(filter_row);
          //console.log(newRow);

          squares[i].innerHTML = newRow[0];
          squares[i +1].innerHTML = newRow[1];
          squares[i +2].innerHTML = newRow[2];
          squares[i +3].innerHTML = newRow[3];
        }

      }
    }  
    //right_move();

    //function to move left
    function left_move(){
      for(let i=0;i<16;i++){
        if(i%4==0){
          let sum_one=squares[i].innerHTML;
          let sum_two=squares[i+1].innerHTML;
          let sum_three=squares[i+2].innerHTML;
          let sum_four=squares[i+3].innerHTML;
          let row= [parseInt(sum_one), parseInt(sum_two), parseInt(sum_three), parseInt(sum_four)];
          
          //console.log(row);
          let filter_row= row.filter(num=>num);
          //console.log(filter_row);

          /*now as we have filtered row, we need to make an arrayof missing values and size(missing)
          will be number of filled-no. of zeroes*/

          let empty_places = 4- filter_row.length;
          let zero= Array(empty_places).fill(0);
          //console.log(zero);
          let newRow=filter_row.concat(zero);
          //console.log(newRow);

          squares[i].innerHTML = newRow[0];
          squares[i +1].innerHTML = newRow[1];
          squares[i +2].innerHTML = newRow[2];
          squares[i +3].innerHTML = newRow[3];
        }

      }
    }  
    //left_move();

    //move down
    function down_move(){
      for(let i=0;i<4;i++){
          let sum_one=squares[i].innerHTML;
          let sum_two=squares[i+width].innerHTML;
          let sum_three=squares[i+width*2].innerHTML;
          let sum_four=squares[i+width*3].innerHTML;

          let col=[parseInt(sum_one), parseInt(sum_two), parseInt(sum_three), parseInt(sum_four)];
          let filter_col= col.filter(num=>num);

          /*now as we have filtered col, we need to make an array of missing values and size(missing)
          will be number of filled-no. of zeroes*/

          let empty_places = 4- filter_col.length;
          let zero= Array(empty_places).fill(0);
          let newCol=zero.concat(filter_col);

          squares[i].innerHTML = newCol[0];
          squares[i + width].innerHTML = newCol[1];
          squares[i + width*2].innerHTML = newCol[2];
          squares[i + width*3].innerHTML = newCol[3];
      }
    }


    //move up
    function up_move(){
      for(let i=0;i<4;i++){
          let sum_one=squares[i].innerHTML;
          let sum_two=squares[i+width].innerHTML;
          let sum_three=squares[i+width*2].innerHTML;
          let sum_four=squares[i+width*3].innerHTML;

          let col=[parseInt(sum_one), parseInt(sum_two), parseInt(sum_three), parseInt(sum_four)];
          let filter_col= col.filter(num=>num);

          /*now as we have filtered col, we need to make an array of missing values and size(missing)
          will be number of filled-no. of zeroes*/

          let empty_places = 4- filter_col.length;
          let zero= Array(empty_places).fill(0);
          let newCol= filter_col.concat(zero);

          squares[i].innerHTML = newCol[0];
          squares[i + width].innerHTML = newCol[1];
          squares[i + width*2].innerHTML = newCol[2];
          squares[i + width*3].innerHTML = newCol[3];
      }
    }

    function combine_row(){
        for(let i=0;i<15;i++){
            if(squares[i].innerHTML==squares[i+1].innerHTML){
              //we need to combine
              let sum= parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML);
              squares[i+1].innerHTML=sum;
              squares[i].innerHTML='0';
              score+=sum;
              scoreDisplay.innerHTML= score;
            }
        }
        win_check();
    }

    function combine_col(){
      for(let i=0;i<12;i++){
          if(squares[i].innerHTML==squares[i+ width].innerHTML){
            //we need to combine
            let sum= parseInt(squares[i].innerHTML)+parseInt(squares[i+ width].innerHTML);
            squares[i+width].innerHTML=sum;
            squares[i].innerHTML='0';
            score+=sum;
            scoreDisplay.innerHTML= score;
          }
      }
      win_check();
  }

    //now we need to assign functions to key nodes
    function control(e){
      if(e.keyCode==39){ //39 is for right key code
        rightKey();
      }
      else if(e.keyCode==37){
        leftKey();
      }
      else if(e.keyCode==38){
        upKey();
      }
      else if(e.keyCode==40){
        downKey();
      }
    }
    document.addEventListener('keyup', control);

    function rightKey(){
      right_move();
      combine_row();
      right_move();
      generate();
    }
    function leftKey(){
      left_move();
      combine_row();
      left_move();
      generate();
    }
    function downKey(){
      down_move();
      combine_col();
      down_move();
      generate();
    }
    function upKey(){
      up_move();
      combine_col();
      up_move();
      generate();
    }

    //now we need to check when a payer wins, that is when tile =2048
    function win_check() {
      for (let i=0; i < squares.length; i++) {
        if (squares[i].innerHTML == 2048) {
          resultDisplay.innerHTML = 'Congrats! You WIN'
          alert("CONGRATULATIONS! YOU WON");
          document.removeEventListener('keyup', control)
          setTimeout(() => clear(), 3000)
        }
      }
    }

    //we also need to check when game is getting over
    function game_over_check(){
      let number_zeroes = 0;
      for (let i=0; i < squares.length; i++) {
        if (squares[i].innerHTML == 0) {
          number_zeroes++;
        }
      }
      if (number_zeroes === 0) {
        resultDisplay.innerHTML = 'You LOSE'
        alert("You LOSE! TRY AGAIN");
        document.removeEventListener('keyup', control)
        setTimeout(() => clear(), 3000)
      }
    }

});