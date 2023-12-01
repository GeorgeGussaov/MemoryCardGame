let rcCnt = document.getElementById('rows&colsCnt');
rcCnt.oninput = function(){
    if(rcCnt.value % 2 != 0 || rcCnt.value > 6) 
    {
        alert('Впишите или 2 или 4 или 6, пожалуйста!')
        rcCnt.value = '';
    }
}
let label = document.querySelector('label');
let createBtn = document.getElementById('createButton');

let emoMas = new Array('🍇','🍈','🍉','🍊','🍌','🍋','🥭','🍎','🍍','🍏','🍐','🍑','🍒','🍓','🥝','🍅','🥦','🥜');
let tdMas = new Array();
let rightCardsMas = new Array();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);    //взято с интернета :)
}

function wrongCard(card){
    return card.classList.add('inverted');  //пришлось делать функцию чтобы работать с таймером
}



createBtn.onclick = function()
{

    rcCnt.style.display = 'none';
    createBtn.style.display = 'none';
    let cellCnt = rcCnt.value * rcCnt.value;
    let cardNumber = 0;
    let table = document.createElement('table');
    label.append(table);
    for(let i = 0; i < rcCnt.value; i++)
    {
        let tr = document.createElement('tr');
        table.append(tr);
        for(let j = 0; j < rcCnt.value; j++)
        {
            let td = document.createElement('td');
            td.textContent = 's';
            td.value = cardNumber;
            td.classList.add('inverted');
            tdMas.push(td);
            
            tr.append(td);
            cardNumber++;
        }
    }


    let num = 0;
    while(true)
    {
        let rndInd1 = getRandomInt(cellCnt);
        if(rcCnt.value == 6 && num == 18) break;
        if(rcCnt.value == 4 && num == 8) break;
        if(rcCnt.value == 2 && num == 2) break;
        if(tdMas[rndInd1].textContent == 's') 
        {
            tdMas[rndInd1].textContent = emoMas[num];
            rightCardsMas.push(rndInd1);
            while(true)
            {
                let rndInd2 = getRandomInt(cellCnt);
                if(tdMas[rndInd2].textContent == 's') 
                {
                    tdMas[rndInd2].textContent = emoMas[num];
                    rightCardsMas.push(rndInd2);
                    num++;
                    break;
                }
            }
        }
        
    }


    let invertedCnt = 0;
    let previousCard;
    let rightCardsCnt = 0;
    for(let card of tdMas)
    {
    
        card.onclick = function(){
            
            card.classList.remove('inverted');
            invertedCnt++;

            if(invertedCnt == 1){
                card.classList.remove('inverted');
                previousCard = card;
            }

            else if(invertedCnt > 1){
                if(tdMas[card.value].textContent == tdMas[previousCard.value].textContent && card.value != previousCard.value)
                {
                    rightCardsCnt++;
                    card.classList.add('rightCard');
                    previousCard.classList.add('rightCard');
                    invertedCnt = 0;
                }
                else if(tdMas[card.value].textContent != tdMas[previousCard.value].textContent && card.value != previousCard.value){
                    
                    setTimeout(wrongCard, 500, card);
                    setTimeout(wrongCard, 500, previousCard);
                    invertedCnt = 0;
                }
                else if(card.value == previousCard.value){
                    invertedCnt--;
                }
            }
            if(rcCnt.value == 6 && rightCardsCnt == 18) alert('Победа!');
            if(rcCnt.value == 4 && rightCardsCnt == 8) alert('Победа!');
            if(rcCnt.value == 2 && rightCardsCnt == 2) alert('Победа!');
        }

    }
}



