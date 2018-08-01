//
// BLACKJACK
//
//

    //#region VARIAVEIS GLOBAIS

let textJS1 = document.getElementById('text1');
let textcontador = document.getElementById('contador');
let bnewgame = document.getElementById('button1');    
let bhit = document.getElementById('button2');    
let bstop = document.getElementById('button3');    

let tipo1 = ['Hearts', 'Clubs','Diamonds','Spades'];
let valores1 = ['Ace','King','Queen','Jack','Ten','Nine',
    'Eight','Seven','Six','Five',
    'Four','Three','Two'];

let start = false,
    ganho = false, 
    perda = false
    baralho = [], 
    playerCards = [], 
    dealerCards = [],
    playerScore = 0,
    dealerScore = 0,
    contadorJogador = 0,
    contadorDealer = 0;

    //#endregion


    //#region FUNÇÕES GLOBAIS


function criabaralho(){
    baralho =[];
    for(let tipoI = 0; tipoI < tipo1.length; tipoI++){
        for(let valoresI = 0; valoresI < valores1.length; valoresI++){
            let carta = {
                tipo: tipo1[tipoI],
                valores: valores1[valoresI]
            };
            baralho.push(carta);
        }
    }
    return baralho;
}

function terProximaCarta(){
    return baralho.shift();
}

function terNomeCarta(cartapara){
    return cartapara.valores + ' of ' + cartapara.tipo;
}

function newgame(){

    start = true;
    ganho = false;
    perda = false;

    baralho = criabaralho();
    baralhar(baralho);
    playerCards = [ terProximaCarta(), terProximaCarta() ];
    dealerCards = [ terProximaCarta(), terProximaCarta() ];

    bnewgame.style.display = 'none';
    bhit.style.display = 'inline-block';
    bstop.style.display = 'inline-block';
    showstatus();

}

function checkForEndGame(){
    atualizaScore();

    if(perda){
        while(dealerScore < playerScore && playerScore <=21 
            && dealerScore <=21){
            dealerCards.push(terProximaCarta());
            atualizaScore();
        }
    }

    if(playerScore > 21){
        ganho = false;
        perda = true;
    }else if(dealerScore > 21 || playerScore == 21){
        ganho = true;
        perda = true;
    }else if (perda){
        if(playerScore > dealerScore){
            ganho = true;
        }else{
            ganho = false;
        }
    }
}

function hitfunc(){
    playerCards.push(terProximaCarta());
    checkForEndGame();
    showstatus();
}

function stopfunc(){
    perda = true;
    checkForEndGame();
    showstatus();
}

function getCardNumericValue(cartapara){
    switch(cartapara.valores){
        case 'Ace':
        return 1;
        case 'Two':
        return 2;
        case 'Three':
        return 3;
        case 'Four':
        return 4;
        case 'Five':
        return 5;
        case 'Six':
        return 6;
        case 'Seven':
        return 7;
        case 'Eight':
        return 8;
        case 'Nine':
        return 9;
        default:
        return 10;
        
    }
}

function getScore(ArrayCarta){
    let score = 0;
    let hasAce = false;
    for(let i = 0; i < ArrayCarta.length; i++){
        let card = ArrayCarta[i];
        score += getCardNumericValue(card);
        if(card.valores == 'Ace'){
            hasAce = true;
        }
    }
    if(hasAce && score + 10 <= 21){
        return score + 10;
    }
    return score;
}

function atualizaScore(){
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function showstatus(){
    if(!start){
        textJS1.innerText = 'Welcome to Blackjack!';
        return;
    }

    let CartasDealer = '';
    for(let i=0; i < dealerCards.length;i++){
        CartasDealer +='\n' + terNomeCarta(dealerCards[i]);
    }
    let CartasJogador = '';
    for(let i=0; i < playerCards.length;i++){
        CartasJogador +='\n' + terNomeCarta(playerCards[i]);
    }

    atualizaScore();
    textJS1.innerText = 'Dealer has: ' +
        CartasDealer + '\n (score: ' + dealerScore + ')\n\n' +

        'Player has:' +
        CartasJogador + '\n (score: ' + playerScore + ')\n\n';

    
    if(perda){
        if(ganho){
            textJS1.innerText += "GANHASTE!";
            contadorJogador++;
            textcontador.innerText = "Dealer: " + contadorDealer + " | Jogador: " + contadorJogador;
        }else{
            textJS1.innerText += "Dealer ganhou, boa sorte para a próxima. :(";
            contadorDealer++;
            textcontador.innerText = "Dealer: " + contadorDealer + " | Jogador: " + contadorJogador;
        }
        bnewgame.style.display = 'inline-block';
        bhit.style.display = 'none';
        bstop.style.display = 'none';

    }
}

function baralhar(baralho){
    for(let i = 0; i < baralho.length; i++){
        let baralhoX = Math.trunc(Math.random() * baralho.length);
        let tmp = baralho[baralhoX];
        baralho[baralhoX] = baralho[i];
        baralho[i] = tmp;
    }
}

    //#endregion

bhit.style.display = 'none';
bstop.style.display = 'none';

