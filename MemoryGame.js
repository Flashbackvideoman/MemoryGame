/* Memory Game
    by Norm Strassner
    05/26/2020
*/

let lastCell = null;
let firstCell = null;
let timeOut = null;
let gameOver = false;

function pageInit() {
    generateCellText();
    clearCells();
    $('.cell').on('click', function (e) {
        checkCell(e.target);
    });
}

function newGame() {
    gameOver = false;
    $('.cell').off('click');
    $(".cell").attr('perm', "false");
    lastCell = null;
    firstCell = null;
    pageInit();
}

function checkCell(ele) {
    if( gameOver ) {
        return;
    }
    if (firstCell && lastCell ) {
        lastCell = null;
        firstCell = null;
        clearCells();
    }
    if (!firstCell) {
        if ($(ele).attr('perm') === true) {
            clearCells();
            return;
        }
        firstCell = ele;
        $(firstCell).css('background-color', 'white');
        $(firstCell).find('.square').show();
    } else
    if (!lastCell) {
        if ($(ele).attr('perm') === true) {
            clearCells();
            return;
        }
        lastCell = ele;
        $(lastCell).css('background-color', 'white');
        $(lastCell).find('.square').show();

        if (firstCell.innerText === lastCell.innerText) {
            $(firstCell).attr('perm', true);
            $(lastCell).attr('perm', true);
        }
        timeOut = setTimeout(function () {
            clearTimeout(timeOut);
            clearCells();
            if( !checkRemainingPairs() ) {
                gameOver = true;
                clearCells();
            }
        }, 500);
    }
}

function clearCells() {
    $('.cell').each(function (i, v) {
        if ($(v).attr('perm') === "false") {
            $(v).css('background-color', 'blue').find('.square').hide().find('span').hide();
        } else {
            $(v).css('background-color', 'green');
            $(v).off('click');
        }
    });
    if( gameOver ) {
        alert("Done!\nThere are no more pairs to find.\nClick on New Game");
    }
}

function generateCellText() {
    let boxes = $('.cell');
    $(boxes).each(function (i, b) {
        b.innerHTML = '<span class="square">' + getRandomInt(8) + '</span>';
        $(b).attr('perm', "false");
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function checkRemainingPairs() {
    let s = $('.cell[perm="false"]').text();
    let arr = s.split("");
    for(var i  = 0; i < arr.length; i++) {
        for( var j = 0; j < arr.length; j++) {
            if( j !== i && arr[j] === arr[i]) {
                return true;
            }
        }
    }
    return false;
}
