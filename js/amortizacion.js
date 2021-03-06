
const monto = document.getElementById('monto');
const tasa = document.getElementById('tasa');
const tiempo = document.getElementById('tiempo');
const modalidad = document.getElementById('modalidad');
const seguro = document.getElementById('seguro');
const factor = document.getElementById('factor');
const btnCalcular = document.getElementById('btnCalcular');
const llenarTabla = document.querySelector('#lista-tabla tbody');

btnCalcular.addEventListener('click', () => {

    console.log(modalidad.value);

    switch (modalidad.value) {
        case  "1" :
             calcularCuotaAmortizaciĆ³nVencidas(Number(monto.value), Number(tasa.value), Number(tiempo.value), seguro.value);
        break;
        
        case "2" :
        calcularCuotaAnticipadas(Number(monto.value), Number(tasa.value), Number(tiempo.value), seguro.value);
        break;
    
        default:
        break;
    }
   
})

function calcularCuotaAmortizaciĆ³nVencidas(monto, tasa, tiempo, seguro){


    while(llenarTabla.firstChild){
        llenarTabla.removeChild(llenarTabla.firstChild);
    }


    const formatterPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      })


    var tasa = tasa/100;
    var mes = 1 ;

    /*let fechas = [];
    let fechaActual = Date.now();
    let mes_actual = moment(fechaActual);
    mes_actual.add(1, 'month');*/
     
    let pagoInteres = 0, pagoCapital = 0, cuota = 0;

    //=monto* ((TASA*(1+TASA)^tiempo)/(((1+TASA)^tiempo)-1))
    cuota = monto * (tasa * (Math.pow((1 + tasa),tiempo))) / (Math.pow((1+tasa),tiempo)-1);
    
    console.log(cuota);
    
    for(let i = 1; i <= tiempo; i++) {

        pagoInteres = parseFloat(monto*(tasa));
        pagoCapital = parseFloat(cuota - pagoInteres);
        monto = parseFloat(monto-pagoCapital);
        seguro = parseFloat(seguro);
        cuotaSeguro =  parseFloat(cuota + seguro);
        amortizacion = parseFloat(cuota - pagoInteres);
        saldo = parseFloat(amortizacion);
        

  //debugger
        /*//Formato fechas
        fechas[i] = mes_actual.format('DD-MM-YYYY');
        mes_actual.add(1, 'month');*/

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${mes++}</td>
            <td>${formatterPeso.format(monto)}</td>
            <td>${formatterPeso.format(pagoInteres)}</td>
            <td>${formatterPeso.format(cuota.toFixed(2))}</td>
            <td>${formatterPeso.format(seguro)}</td>
            <td>${formatterPeso.format(cuotaSeguro)}</td>
            <td>${formatterPeso.format(amortizacion)}</td>
            <td>${formatterPeso.format(monto)}</td>
        `;
        llenarTabla.appendChild(row)
    }
}

function calcularCuotaAnticipadas(monto, tasa, tiempo, seguro){

    while(llenarTabla.firstChild){
        llenarTabla.removeChild(llenarTabla.firstChild);
    }


    const formatterPeso = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      })


    var tasa = tasa /100;
    var mes = 1 ;

    /*let fechas = [];
    let fechaActual = Date.now();
    let mes_actual = moment(fechaActual);
    mes_actual.add(1, 'month');*/
     
    let pagoInteres = 0, pagoCapital = 0, cuota = 0;

    //=monto* ((TASA*(1+TASA)^tiempo)/(((1+TASA)^tiempo)-1))

    //(MONTO/(1+TASA)*((TASA*(1+TASA)^PLAZO)/((1+TASA)^PLAZO-1)))

    //debugger

    ej = monto/(1+tasa);
    ej2 = tasa * (Math.pow((1+tasa), tiempo));
    ej3 = Math.pow((1 + tasa), tiempo) - 1;

    //(MONTO/(1+TASA)*((TASA*(1+TASA)^PLAZO)/((1+TASA)^PLAZO-1)))
    cuota = (monto / (1 + tasa) * ((tasa * (Math.pow((1+tasa), tiempo))) / ((Math.pow((1+tasa), tiempo)-1))));
    
    console.log(ej);
    console.log(ej2);
    console.log(ej3);
    console.log(cuota);
    
    for(let i = 1; i <= tiempo; i++) {

        pagoInteres = parseFloat(monto*(tasa));
        pagoCapital = parseFloat(cuota - pagoInteres);
        monto = parseFloat(monto-pagoCapital);
        seguro = parseFloat(seguro);
        cuotaSeguro =  parseFloat(cuota + seguro);
        amortizacion = parseFloat(cuota - pagoInteres);
        saldo = parseFloat(amortizacion);
        

  //debugger
        /*//Formato fechas
        fechas[i] = mes_actual.format('DD-MM-YYYY');
        mes_actual.add(1, 'month');*/

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${mes++}</td>
            <td>${formatterPeso.format(monto)}</td>
            <td>${formatterPeso.format(pagoInteres)}</td>
            <td>${formatterPeso.format(cuota.toFixed(2))}</td>
            <td>${formatterPeso.format(seguro)}</td>
            <td>${formatterPeso.format(cuotaSeguro)}</td>
            <td>${formatterPeso.format(amortizacion)}</td>
            <td>${formatterPeso.format(monto)}</td>
        `;
        llenarTabla.appendChild(row)
    }
}


