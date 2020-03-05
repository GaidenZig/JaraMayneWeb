// document.addEventListener('DOMContentLoaded',()=>{
//     const imgLightbox = document.querySelectorAll('.materialboxed');//obteniendo los elementos de la pagina
//     M.Materialbox.init(imgLightbox,{
//         inDuration: 500,
//         outDuration:500
//     });
// })+

function cemento(id) {
    let valorSaco=3490;
    cantidad = document.getElementById("cantidad" + id).value
    calculofinal=cantidad * valorSaco;
    final=(calculofinal * 1.2) * 1.19;
    document.getElementById('precio' + id).innerHTML = Math.round(final).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    mostrarbtn(id)
}
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {
        preventScrolling: true,
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal2');
    var instances = M.Modal.init(elems, {
        preventScrolling: true,
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');

    var instances = M.FormSelect.init(elems);

});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
});

// Or with jQuery

$(document).ready(function () {
    $('.collapsible').collapsible();
});



let ciudadvalor;
let material;
let numero;
let cantidad;

function calculo(ciudadvalor, material, numero, cantidad) {
    calculofinal = 0;
    let calculo = (ciudadvalor + material) * 1.2;
    calculofinal = calculo * cantidad;
    final = calculofinal*1.19;

    document.getElementById('precio' + numero).innerHTML = Math.round(final).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    console.log(calculofinal)
    return calculo
}

function precalculo(unitario, id) {
    ciudadprecio = document.getElementById("selectordeciudad" + id).value
    cantidad = document.getElementById("cantidad" + id).value
    console.log('preciociudad: ', ciudadprecio, 'cantidad:', cantidad, 'unitario: ', unitario, 'ID: ', id)
    calculo(parseInt(ciudadprecio), unitario, id, parseInt(cantidad))

    mostrarbtn(id)

    
}

function mostrarbtn(id) {
    precio = document.getElementById('precio' + id)
    if (precio != null) {
        
        if ( parseInt(precio.innerHTML)>0){
            document.getElementById("divpro" + id).style.visibility = "visible";
            let validador=setInterval(() => {
                numero = document.getElementById('numero'+id).value
                console.log(numero.length)  
                if(numero.length <8 || numero.length>8){
                    document.getElementById("btn"+id).disabled=true;
                }else{
                    document.getElementById("btn"+id).disabled=false;
                }
            }, 100);
        }else{
            document.getElementById("divpro" + id).style.visibility = "hidden";
        }        
    }
}

function salvardatosmensaje(unitario, id) {
    numero = document.getElementById('numero' + id).value;
    ciudadprecio = document.getElementById("selectordeciudad" + id).value;
    nombreciudad = document.getElementById("selectordeciudad" + id).options[document.getElementById("selectordeciudad" + id).selectedIndex].text;
    cantidad = document.getElementById("cantidad" + id).value;
    nombreelemento = $('#nombre'+id).text();

    if(id==3){
        ciudadprecio = 0;
        nombreciudad = 'No hay despachos asociados para cemento';
        nombreelemento = $('#nombre'+id).text();
    }
    
    total = (((parseInt(ciudadprecio) + unitario) * 1.2)*cantidad)*1.19;


    resetingInterval(unitario, id, numero, ciudadprecio, cantidad, Math.round(total), nombreciudad, nombreelemento)
}

function resetingInterval(unitario, id, numero, ciudadprecio, cantidad, total, nombreciudad, nombreelemento) {
    M.toast({
        html:'Se envió la petición, nos contactaremos con usted',
        dislayLength:800
    }) 
    console.log("Numero: "+"+569"+numero+' '+" Total: "+total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")+' Ciudad: '+nombreciudad+''+' Material: '+nombreelemento+' '+' Cantidad m3: '+cantidad); 
    Email.send({
        SecureToken:'9d2673c7-ddff-4c1c-8da6-5d9c8e41f903',        
        To : 'aridosjaramayne@gmail.com',
        From : "programersfortheattack@gmail.com",
        Subject : "Despachos",
        Body :  "<b>Numero     :</b> "+"+569"+numero+'<br>'+
                "<b>Total      :</b> "+"$"+total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")+'<br>'+
                '<b>Ciudad     :</b> '+nombreciudad+'<br>'+
                '<b>Material   :</b> '+nombreelemento+'<br>'+
                '<b>Cantidad m<sup>3</sup>:</b> '+cantidad
    }).then(
      message => {          
        var elem = document.getElementById('imagen'+id);
        var instance = M.Modal.getInstance(elem);
        instance.close();
      }      
    );
}


