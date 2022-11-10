search();

/*Realiza a atualização de todos os campos da tela*/
function search(){
    searchAeronaves();
    searchMarcaBoeing();
    searchMarcaEmbraer();
    searchMarcaAirbus();
    searchWeek();
    searchSold();
    searchDecade();
}

/*Carrega as informações da grid de aeronaves*/
function searchAeronaves() {
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let jsonResponse = JSON.parse(xmlhttp.response);
            montaGrid(jsonResponse);
    	}
    }
    xmlhttp.open("GET","http://localhost:8080/aeronaves",true);
    xmlhttp.send();
}

/*Carrega o contador da marca Boeing*/
function searchMarcaBoeing(){
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let marcaBoeing = document.querySelector("#marcaBoeing");
            marcaBoeing.innerHTML = "Boeing: " + xmlhttp.response;
    	}
    }
    xmlhttp.open("GET","http://localhost:8080/aeronaves/findByMarca/Boeing",true);
    xmlhttp.send();
}

/*Carrega o contador da marca Embraer*/
function searchMarcaEmbraer(){
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let marcaEmbraer = document.querySelector("#marcaEmbraer");
            marcaEmbraer.innerHTML = "Embraer: " + xmlhttp.response;
    	}
    }
    xmlhttp.open("GET","http://localhost:8080/aeronaves/findByMarca/Embraer",true);
    xmlhttp.send();
}

/*Carrega o contador da marca Airbus*/
function searchMarcaAirbus(){
    var xmlhttp;
    xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let marcaAirbus = document.querySelector("#marcaAirbus");
            marcaAirbus.innerHTML = "Airbus: " + xmlhttp.response;
    	}
    }
    xmlhttp.open("GET","http://localhost:8080/aeronaves/findByMarca/Airbus",true);
    xmlhttp.send();
}

/*Carrega o contador dos registros criados na semana*/
function searchWeek(){
    let xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let week = document.querySelector("#week");
            week.innerHTML = "Aeronaves cadastradas na semana: " + xmlhttp.response;
    	}
    }
    xmlhttp.open("GET","http://localhost:8080/aeronaves/week",true);
    xmlhttp.send();
}

/*Carrega o contador dos aviões vendidos*/
function searchSold(){
    let xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let sold = document.querySelector("#sold");
            sold.innerHTML = "Aeronaves vendidas: " + xmlhttp.response;
    	}
    }
    xmlhttp.open("GET","http://localhost:8080/aeronaves/sold",true);
    xmlhttp.send();
}

/*Carrega contadores das décadas*/
function searchDecade() {
    let xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let decade = document.querySelector("#decade");
            let jsonResponse = JSON.parse(xmlhttp.response);
            decade.innerHTML = "";
            jsonResponse.forEach((repo) => {
                decade.innerHTML += "<div class='div-rowAeronave'>" +
                                            "<div>"+repo.decada+":</div>" +
                                            "<div>"+repo.quantidade+"</div>" +
                                        "</div>";
            });
    	}
    }
    xmlhttp.open("GET","http://localhost:8080/aeronaves/decade",true);
    xmlhttp.send();
}

/*Realiza o filtro dos registros por marca e nome*/
function filtro() {
    if (document.querySelector("#filtroAeronave").value == "") {
        search();
        return true;
    }
    let xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	    let jsonResponse = JSON.parse(xmlhttp.response);
    	    montaGrid(jsonResponse);
    	}
    }

    xmlhttp.open("GET","http://localhost:8080/aeronaves/findByFilter/"+document.querySelector("#filtroAeronave").value,true);
    xmlhttp.send();
}

/*Responsável por montar a grid com os valores recebidos
 * Parâmetro Json de retorno da base
 */
function montaGrid(jsonResponse) {
    let aeronaves = document.querySelector("#aeronavesGrid");

    aeronaves.innerHTML = "" +
                    "<div class='div-rowAeronave'>" +
                        "<div class='div-columnId'>Id</div>" +
                        "<div class='div-columnText'>Nome</div>" +
                        "<div class='div-columnText'>Marca</div>" +
                        "<div class='div-columnNumber'>Ano</div>" +
                        "<div class='div-columnBool'>Vendido</div>"
                    "</div>";
    jsonResponse.forEach((repo) => {
        var checkedRadio = repo.vendido ? "checked" : ""
        aeronaves.innerHTML += ""+
        "<div class='div-rowAeronave'>" +
            "<div class='div-columnId'>"+repo.id+"</div>" +
            "<div class='div-columnText'>"+repo.nome+"</div>" +
            "<div class='div-columnText'>"+repo.marca+"</div>" +
            "<div class='div-columnNumber'>"+repo.ano+"</div>" +
            "<div class='div-columnBool'><input type='radio' id='aeronave' name='aeronave"+repo.id+"' disabled=true "+checkedRadio+" value="+repo.id+"></div>" +
            "<div class='div-columnButton'><button id='buttonDelete' onclick='deleteAeronave("+repo.id+")'>Excluir</button></div>" +
            "<div class='div-columnButton'><button id='buttonEdit' onclick='editarAeronave("+repo.id+")'>Editar</button></div>" +
        "</div>";
    });
}