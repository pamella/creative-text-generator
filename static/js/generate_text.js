/* result é a variável contendo a música gerada pelo textgenrnn, 
    não é definida no código por vim pelo django. */

let lyricsArray = []; //Array de versos
let index = 0;

let finalLyrics = []; //Array com a letra que vai sendo construída de acordo com as escolhas

this.lyricsToArray();
this.getArtistsFromUrl();

function getArtistsFromUrl() {
  const urlParams = new URLSearchParams(location.search);
  let artists = []

  let i = 0
  for (const [key, value] of urlParams) {
    artists[i] = value.charAt(0).toUpperCase() + value.slice(1);
    i++;
  }
  document.getElementById("footer-names").innerHTML = `${artists[0]} & ${artists[1]}`;
  document.getElementById("footer-photo-1").style.backgroundImage = `url('/static/img/${artists[0]}.jpg')`;
  document.getElementById("footer-photo-2").style.backgroundImage = `url('/static/img/${artists[1]}.jpg')`;
}

//Função para processar a letra gerada pelo textgenrnn e dividir em um array de versos
function lyricsToArray() {
  //Transformando as aspas novamente em símbolos
  result = result.replaceAll("&#x27;", "'");
  result = result.replaceAll("&quot;", '"');

  //Removendo os símbolos [" e "] do começo e fim da string
  result = result.substring(2, result.length);
  result = result.substring(0, result.length - 2);

  //Transformando as estrofes em um array de versos
  let aux = result.split('", "'); //-----------FALTA: tratar os casos onde é separado com ", ' ou ', "
  let length = aux.length;
  for (let i = 0; i < length; i++) {
    let auxArray = aux[i].split("\n");
    lyricsArray = lyricsArray.concat(auxArray);
  }

  //Removendo do array de versos os elementos que representam quebra dupla de linha
  let indice = lyricsArray.indexOf("");
  while (indice >= 0) {
    lyricsArray.splice(indice, 1);
    indice = lyricsArray.indexOf("");
  }

  //Removendo os versos que são apenas: '('
  let indice2 = lyricsArray.indexOf("(");
  while (indice2 >= 0) {
    lyricsArray.splice(indice2, 1);
    indice2 = lyricsArray.indexOf("(");
  }

  //Removendo os versos que são apenas: ')'
  let indice3 = lyricsArray.indexOf(")");
  while (indice3 >= 0) {
    lyricsArray.splice(indice3, 1);
    indice3 = lyricsArray.indexOf(")");
  }

  //Removendo os parênteses mal colocados dos versos
  lyricsArray.map((verse, i) => {
    let ind = verse.indexOf("(");
    let ind2 = verse.indexOf(")");

    if (ind >= 0 && ind2 == -1) {
      //Remove o (
      lyricsArray[i] = verse.replace(verse.slice(ind, ind + 1), '');
    } else if (ind2 >= 0 && ind == -1) {
      //Remove o )
      lyricsArray[i] = verse.replace(verse.slice(ind2, ind2 + 1), '');
    }
  })

  this.generateInitial();
}

//Função para gerar os 3 primeiros versos que devem aparecer no início
function generateInitial() {
  let optionsArray = [];
  for (let i = index; i < index + 3; i++) {
    optionsArray.push(lyricsArray[i]);
  }
  index = index + 3;
  document.getElementById("option1").textContent = optionsArray[0];
  document.getElementById("option2").textContent = optionsArray[1];
  document.getElementById("option3").textContent = optionsArray[2];
  return optionsArray;
}

//Função para salvar a opção escolhida e exibir novo verso no lugar
function generateVerse(elemID) {
  finalLyrics.push(document.getElementById(elemID).textContent);

  var node = document.createElement("p");
  var textnode = document.createTextNode(
    document.getElementById(elemID).textContent
  );
  node.appendChild(textnode);
  document.getElementById("finalLyrics").appendChild(node);

  document.getElementById(elemID).textContent = lyricsArray[index];
  index = index + 1;
  this.isMusicComplete();

  let box = document.getElementById('finalLyrics');
  box.scrollTop = box.scrollHeight;
}

function isMusicComplete() {
  if ((index - 3) == 20) {
    document.getElementById("pick-verse__container").style.display = "none";
    document.getElementById("end-generate-music-container").style.display = "block";
  }
}

//Evento ativado quando o usuário digitar no input de adicionar verso e clicar em Enter, adicionando o verso do input
const inputVerse = document.getElementById("musicLine");
inputVerse.addEventListener("keyup", function (e) {
  let key = e.which || e.keyCode;
  if (key == 13) {
    // codigo da tecla enter
    finalLyrics.push(inputVerse.value);

    var node = document.createElement("p");
    var textnode = document.createTextNode(inputVerse.value);
    node.appendChild(textnode);
    document.getElementById("finalLyrics").appendChild(node);

    inputVerse.value = "";

    document.getElementById("finalLyrics").scrollTop = document.getElementById("finalLyrics").offsetHeight;
  }
});

const buttonDownload = document.getElementById("button-download");
buttonDownload.addEventListener("click", function(e) {

  let content = "";
  for (var i = 0; i < finalLyrics.length; i++) {
    content += finalLyrics[i] + "\n";
  }

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', 'lyrics');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
})