let compra = {
    banana: "80.25",
    manzana: "13.99",
    peras: "12.55",
    duraznos: "23.60",
    leche: "31.34",
    yogur: "22.36"
  };
  
  console.log( "el total es " +totalCompra(compra));
  
  function totalCompra(carrito) {
    let suma = 0;
    for (let valor in carrito) {
      suma += Number.parseFloat(carrito[valor]);
    }
    return suma;
  }
  