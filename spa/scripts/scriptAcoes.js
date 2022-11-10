/*Exclui registro da grid
 * Parâmetro Id do registro selecionado
 */
function deleteAeronave(id) {
    let xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            search();
    	}
    }
    xmlhttp.open("DELETE","http://localhost:8080/aeronaves/"+id,true);
    xmlhttp.send();
}

/*Busca informações para edição
 * Parâmetro Id do registro selecionado
 */
function editarAeronave(id) {
    let xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	    let jsonResponse = JSON.parse(xmlhttp.response);

            document.querySelector("#idAeronave").value = jsonResponse.id;
            document.querySelector("#nomeAeronave").value = jsonResponse.nome;
            document.querySelector("#marcaAeronave").value = jsonResponse.marca;
            document.querySelector("#anoAeronave").value = jsonResponse.ano;
            document.querySelector("#descricaoAeronave").value = jsonResponse.descricao;
            document.querySelector("#vendidoAeronave").value = jsonResponse.vendido;
            document.querySelector("#criadoAeronave").value = jsonResponse.created;
    	}
    }
    xmlhttp.open("GET","http://localhost:8080/aeronaves/"+id,true);
    xmlhttp.send();
}

/*Salva opu edita informações de acordo com o que está na tela*/
function salvar() {
    let date = new Date();
    let dataFormatada = date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1) + "-" + date.getDate();

    let xmlhttp;
    let dataAeronave = JSON.stringify({
                "Id": document.querySelector("#idAeronave").value,
                "nome": document.querySelector("#nomeAeronave").value,
                "marca": document.querySelector("#marcaAeronave").value,
                "ano": document.querySelector("#anoAeronave").value,
                "descricao": document.querySelector("#descricaoAeronave").value,
                "vendido": document.querySelector("#vendidoAeronave").value,
                "created": document.querySelector("#idAeronave").value != "0" ? document.querySelector("#criadoAeronave").value : dataFormatada,
                "updated": dataFormatada,
                "id": document.querySelector("#idAeronave").value
            });
    xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	    document.querySelector("#idAeronave").value = "0";
    	    document.querySelector("#nomeAeronave").value = "";
    	    document.querySelector("#marcaAeronave").value = "Embraer";
    	    document.querySelector("#anoAeronave").value = "0";
    	    document.querySelector("#descricaoAeronave").value = "";
    	    document.querySelector("#vendidoAeronave").value = "Vendido";
            search();
    	}
    }
    xmlhttp.open("POST","http://localhost:8080/aeronaves",true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(dataAeronave);
}