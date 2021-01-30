

function validarProduto(idNome, idCodigo, idQuantidade){
    const nome = document.getElementById(idNome).value
    const codigo = document.getElementById(idCodigo).value
    const quantidade = document.getElementById(idQuantidade).value

    if(nome == ""){
        alert("Preencha o nome do produto!")
        focus(nome)
    }else if(codigo == ""){
        alert("Preencha o código do produto!")
        focus(codigo)
    }else if(quantidade == 0){
        alert("Preencha a quantidade do produto!")
        focus(quantidade)
    }else{
        cadastrarProduto(nome, codigo, quantidade)
        
    }
}

function cadastrarProduto(produto, cod, quant){
    
        let listaProdutos = []
        if(localStorage.getItem('produtos') !== null ){
            listaProdutos = JSON.parse(localStorage.getItem('produtos')); //captura o array de objetos(JSON);
        } 
        
        let novoProd = {
            nome: produto, 
            codigo: cod, 
            quantidade: quant}
        
        var somou = 0
        
        for(var i = 0; i< listaProdutos.length; i++){
            if(listaProdutos[i].codigo == cod){
                if(listaProdutos[i].nome == produto){
                    var recebeValor = Number(listaProdutos[i].quantidade) + Number(quant)
                    listaProdutos[i].quantidade =  recebeValor.toString()
                    var somou = 1
                    break;
                }
            }
                
            }
                
        if(somou == 0){
            listaProdutos.push(novoProd)
        }   
            
        

        
        localStorage.setItem('produtos', JSON.stringify(listaProdutos))
        
        
        alert("Produto salvo com sucesso!")
        
}

function buscarProduto(valorPesquisa){
    var pesquisa = document.getElementById(valorPesquisa).value
    var tabela = document.getElementById('listaProdutos')
    var total = document.getElementById('totalEstoque')
    

    var produtos = JSON.parse(localStorage.getItem('produtos'))

    tabela.innerHTML = ''
    var contador = 0
    for(var i = 0; i < produtos.length; i++){
        if(pesquisa == produtos[i].codigo){
            contador += 1
            

            var nome = produtos[i].nome,
            codigo = produtos[i].codigo,
            quantidade = produtos[i].quantidade;
        
        total.innerHTML = contador
        tabela.innerHTML +=  '<tr id="rowTable'+i+'">'+
                                '<td>'+nome+'</td>'+
                                '<td>'+codigo+'</td>'+
                                '<td>'+quantidade+'</td>'+
                                '<td class="botoes"><button id="excluir" onclick="excluir(\'' + codigo + '\')">Excluir</button></td>'+
                                '<td class="botoes"><button id="alterar" onclick="alterar(\'' + nome + '\')">Alterar</button></td>'+
                            '</tr>';
        }

        if(pesquisa == ''){
            listar()
        }
    }

}

function listar(){
    if(localStorage.getItem('produtos') === null)
        return;

    var produtos = JSON.parse(localStorage.getItem('produtos'))
    var tabela = document.getElementById('listaProdutos')
    var total = document.getElementById('totalEstoque')

    tabela.innerHTML = ''

    for(var i = 0; i < produtos.length; i++){
        var nome = produtos[i].nome,
            codigo = produtos[i].codigo,
            quantidade = produtos[i].quantidade;
        
        total. innerHTML = produtos.length

        tabela.innerHTML +=  '<tr id="rowTable'+i+'">'+
                                '<td>'+nome+'</td>'+
                                '<td>'+codigo+'</td>'+
                                '<td>'+quantidade+'</td>'+
                                '<td class="botoes"><button id="excluir" onclick="excluir(\'' + codigo + '\')">Excluir</button></td>'+
                                '<td class="botoes"><button id="alterar" onclick="alterar(\'' + nome + '\')">Alterar</button></td>'+
                            '</tr>';	

                        }
}

function excluir(cod){
    var produtos = JSON.parse(localStorage.getItem('produtos'))


    for(var i = 0; i < produtos.length; i++){
        if(produtos[i].codigo == cod)
            produtos.splice(i, 1);
            

        localStorage.setItem('produtos', JSON.stringify(produtos));
        listar();
    }
    alert('Produto removido com sucesso!');
    
}

function alterar(nome){
    

    var listaProdutos = JSON.parse(localStorage.getItem('produtos'))
    for(var i = 0; i < listaProdutos.length; i++){
        if(nome == listaProdutos[i].nome){
            
            window.location.href='editar.html?nome='+listaProdutos[i].nome +'&codigo='+listaProdutos[i].codigo +'&quantidade='+listaProdutos[i].quantidade;
        }
    }
}

function pegarProduto(){

    var inputNome = document.getElementById('txtNome')
    var inputQuant = document.getElementById('txtQuantidade')
    var inputCod = document.getElementById('txtCodigo')

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const nome = urlParams.get('nome')
    inputNome.value = nome
    const codigo = urlParams.get('codigo')
    inputCod.value = codigo
    const quantidade = urlParams.get('quantidade')
    inputQuant.value = quantidade
}

function alterarProduto(){
    var inputNome = document.getElementById('txtNome').value
    var inputQuant = document.getElementById('txtQuantidade').value
    var inputCod = document.getElementById('txtCodigo').value

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const nomee = urlParams.get('nome')
    const codigo = urlParams.get('codigo')

    

    var produtos = JSON.parse(localStorage.getItem('produtos'))

    for(var i = 0; i< produtos.length; i++){
        if(nomee == produtos[i].nome){
            if(codigo == produtos[i].codigo){
                produtos[i].nome = inputNome
                produtos[i].codigo = inputCod
                produtos[i].quantidade = inputQuant

                localStorage.setItem('produtos', JSON.stringify(produtos));

                alert("Item alterado com sucesso!")
                window.close("editar.html")
            }
        }
    }
    window.open("estoque.html")
    
    
}