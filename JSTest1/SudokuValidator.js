let validationTemplate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
/*let validBoard = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
   ];

let invalidBoard = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2], 
    [6, 7, 2, 1, 9, 0, 3, 4, 8],
    [1, 0, 0, 3, 4, 2, 5, 6, 0],
    [8, 5, 9, 7, 6, 1, 0, 2, 0],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 0, 1, 5, 3, 7, 2, 1, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 0, 0, 4, 8, 1, 1, 7, 9]
   ];*/

function buttonClick() {
    let resultText;
    let provideedSolution = document.getElementById("solution").value;
    try {
        let currentBoard = JSON.parse(provideedSolution);

        // *** Виклик функції validSolution() ***
        resultText = validSolution(currentBoard)?"— Валідний розв'язок":"— Невалідний розв'язок";

        let table = document.getElementById("sudoku");
        for (let i = 0; i < currentBoard.length; i++) {
            for (let j = 0; j < currentBoard.length; j++) {
                table.rows[i].children[j].innerText = currentBoard[i][j];
            }
        }
    }
    catch {
        resultText = "— Неправильний формат даних";
    }
 
    document.getElementById("result").innerText = resultText;
}

function validSolution(board){
    // Перевірка строк
    for (let i = 0; i < board.length; i++) {
        let template = [...validationTemplate];
        for (let j = 0; j < board.length; j++) {
            let index = template.indexOf(board[i][j]);
            if(index>-1)template.splice(index, 1);
        }
        if(template.length) return false;
    }

    // Перевірка стовпців
    for (let i = 0; i < board.length; i++) {
        let template = [...validationTemplate];
        for (let j = 0; j < board.length; j++) {
            let index = template.indexOf(board[j][i]);
            if(index>-1)template.splice(index, 1);
        }
        if(template.length) return false;
    }

    // Перевірка квадратів
    for (let row = 0; row < board.length; row += 3)
    {
        for (let col = 0; col < 9; col += 3)
        {
            let template = [...validationTemplate];
            for (let i = 0; i < 3; i++)
            {
                for (let j = 0; j < 3; j++)
                {
                    let index = template.indexOf(board[row+i][col+j]);
                    if(index>-1)template.splice(index, 1);
                }
            }
            if(template.length) return false;
        }
    }

    return true;
}