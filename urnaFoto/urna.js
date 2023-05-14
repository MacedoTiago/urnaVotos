/*no ETAPAS ARRAW
    ESTA TUDO NO 
    PLURAL [ NUMEROS, ETAPAS]
    */

let seuVotoPara = document.querySelector('.d_cima_esquerda_1 span');
let cargo = document.querySelector('.d_cima_esquerda_2 span'); //COLOCAR O PONTO PARA TRAZER UMA CLASS
let descricao = document.querySelector('.d_cima_esquerda_4');
let aviso = document.querySelector('.d_baixo');
let lateralFoto = document.querySelector('.d_cima_direita');
let numerosVoto = document.querySelector('.d_cima_esquerda_3'); 
// VARIAVEIS ACIMA PARA CONTROLAR TUDO QUE TEM NA TELA DE FOTAÇÃO

//VARIAVEIS ABAIXO DE CONTROLE DE AMBIENTES PARA TRABALHAR
let etapaAtual = 0;
let preencheNumero ='';//para preenchimento dos votos
let vBranco = true;


//FUNCAO ESPECIFICA PARA COMEÇO DE ETAPAS DE FERIFICACAO DE CAMDIDATOS
// 1- ELA VAI LIMPAR A TELA
function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    preencheNumero =''
    vBranco = false;
    //VARIAVEL E LOOP PARA MONTAR CINCO QUADRADOS DE NUMEROS
    let numeroHtml = '';

    for(let i=0; i<etapa.numeros;i++){
        if(i===0){
           numeroHtml += ' <div class="numeros_votos pisca"></div>';
        }else
           numeroHtml +='<div class="numeros_votos"></div>';
    }
        

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateralFoto.innerHTML = '';
    numerosVoto.innerHTML = numeroHtml;
};

 ////  CODIGO GPT

 function atualizaInterface(){

    let etapa = etapas[etapaAtual];
    let candidatoAtual = etapa.candidatos.filter((item)=>{
        if (item.numero === preencheNumero ) {
            return true;
        } else {
            return false;
        }
    });
    if (candidatoAtual.length > 0) {
        candidatoAtual = candidatoAtual[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidatoAtual.nome}<br/>Partido: ${candidatoAtual.partido}<br/>Vice: ${candidatoAtual.vice}`;

        let fotosHtml = '';
         for(let i in candidatoAtual.fotos){
            fotosHtml += `<div class="d_cima_direita"><img src="${candidatoAtual.fotos[i].url}" alt="${candidatoAtual.fotos[i].legenda}"><p>${candidatoAtual.fotos[i].legenda}</p class="stilo--foto"></div>`;
        }
          lateralFoto.innerHTML = fotosHtml;
     }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
     }     
};

function clicou(n){

        let numeroPisca = document.querySelector('.numeros_votos.pisca');

        numeroPisca.innerHTML = n;
        preencheNumero = `${preencheNumero}${n}`;
        
        numeroPisca.classList.remove('pisca'); //REMOVE A ANIMÇAÕ PISCA DO NUMERO ATUAL
        if(numeroPisca.nextElementSibling !== null){
            numeroPisca.nextElementSibling.classList.add('pisca') //PASSA A ANIMAÇÃO PISCA PARA O PROXIMO NUMERO A SER DIGITADO
        } else{
            atualizaInterface();
        }
       
    
}

function branco(){
    if(preencheNumero ===''){
        vBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numerosVoto.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    }else{
        alert('ATENÇÃO Para VOTAR EM BRANCO não pode ter digitado nenhum numero aperte corrige para voltar');
    }
};

function corrige(){
    comecarEtapa();
};

function confirma(){
    let etapa = etapas[etapaAtual];

    let vConfirma = false;

    if(vBranco === true){
        vConfirma = true;
    }else if(preencheNumero.length === etapa.numeros){
        vConfirma = true;
    }
    if(vConfirma){
        etapaAtual++
        if(etapas[etapaAtual] !== undefined ){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
        }
    }
};



comecarEtapa();