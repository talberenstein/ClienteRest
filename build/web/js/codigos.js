(function(document, JSON){
	'use strict';

	function $(id){
		return document.getElementById(id);
	}

	var btnGetArticle = $('btnGetArticle'),
		btnAddArticle = $('btnAddArticle'),
		formulario	  = $('frmCrear');

	btnGetArticle.addEventListener('click', getAll, false);
	btnAddArticle.addEventListener('click', addArticle, false);
	formulario.addEventListener('submit', function(e){
		e.preventDefault();
	}, false);

	function addArticle(){
		var url = 'articulos',
			method = 'post',
			data = {titulo: $('titulo_articulo').value,
					contenido: $('contenido_articulo').value,
					autor: "Cliente"},
			callback = function(datos){
				muestraArticulo(JSON.parse(datos));
			};
		ajax(url, method, JSON.stringify(data), callback);
	}

	function getAll(){
		var url = 'articulos',
		method = 'get',
		data = null,
		articuloId = $('articuloId').value,
		callback = function(data){
			if(articuloId !== ''){
				muestraArticulo(JSON.parse(data));
			} else {
				muestraArticulo(JSON.parse(data));
			}
		};
	if(articuloId.length > 0){
		url = url + '/' +articuloId;
	}
	ajax(url, method, data, callback);
	}

	function muestraArticulo(data){
		var articulo = data,
			vista 	 = $('vista'),
			template = $('template'),
			clon	 = template.content.cloneNode(true),
			id 		 = clon.querySelector('.articuloId'),
			titulo 	 = clon.querySelector('.titulo'),
			contenido= clon.querySelector('.contenido'),
			autor	 = clon.querySelector('.autor'),
			creado	 = clon.querySelector('.creado');

		vista.innerHTML = '';

	id.value				= articulo.id;
	titulo.textContent		= articulo.titulo;
	contenido.textContent	= articulo.contenido;
	autor.value				= articulo.autor;
	creado.value			= articulo.creado;

	vista.appendChild(clon);

	}

	function mostrarArticulos(data){
		var i = 0, max = data.length,
		vista		= $('vista'),
		template	= $('template'),
		fragmento	= document.createDocumentFragment(),
		articulo 	= {}, clon, id, titulo, contenido, autor, creado;

		vista.innerHTML = '';

		for(; i < max; i = i+1){
			articulo = data[i];
			clon	 = template.content.cloneNode(true);
			id 		 = clon.querySelector('.articuloId');
			titulo 	 = clon.querySelector('.titulo');
			contenido= clon.querySelector('.contenido');
			autor	 = clon.querySelector('.autor');
			creado	 = clon.querySelector('.creado');

			id.value			= articulo.id;
			titulo.textContent	= articulo.titulo;
			contenido.textContent = articulo.contenido;
			autor.value			= articulo.autor;

			fragmento.appendChild(clon);
		}
		vista.appendChild(fragmento);
	}

	function ajax(url, method, data, callback){
		var xhr = new XMLHttpRequest(),
			uri = '/MiBlog/api/' + url;
		xhr.open(method, url, true);
		xhr.addEventListener('load', function(){
			callback(this.responseText);
		}, false);
		xhr.addEventListener('error', function(error){
			console.log(error);
		}, false);
		if(method === 'get'){
			xhr.send();
		} else if(method === 'post'){
			xhr.setRequestHeader('Content-Type', 'application/json; charset="utf-8"');
			xhr.send(data);
		}
	}

})(document,JSON);