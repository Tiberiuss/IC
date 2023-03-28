const file = document.getElementById("file")
const button = document.getElementById("start")
let rawData;
let header;

button.addEventListener("click", start)
file.addEventListener('change', (e) => {
  const fileData = e.target.files[0];
  if (fileData.name !== '') {
    const reader = new FileReader();
    reader.onload = (evt) => {
      rawData = evt.target.result.split('\n').map((row) => row.split(','));
      header = rawData.shift()
    }

    reader.readAsText(fileData);
  };
})

function parseData(rows,features) {
  let data = {}
  rows.forEach((row, idx) => {
    row.forEach((col, colIdx) => {
      if (colIdx === row.length - 1) {
        return;
      }
      //col = soleado  atributo = features[colIdx]
      if (data[features[colIdx]] && data[features[colIdx]][col]) {
        data[features[colIdx]][col]["a"] += 1

      } else {
        data[features[colIdx]] = {
          [col]: {
            a: 1,
            p: 0,
            n: 0
          },
          ...data[features[colIdx]]
        }
      }
      if (row[row.length - 1].trim() == 'si') {
        data[features[colIdx]][col]["p"]++;
      } else if (row[row.length - 1].trim() == 'no') {
        data[features[colIdx]][col]["n"]++;
      }
    })
  })
  return data;
}

function getBaseLog(x, y) {
  if (y === 0) return 0;
  return Math.log(y) / Math.log(x); // TODO existe Math.log2 :/
}

function merito(atributo, N) {
  let merito = 0.0
  for (let key in atributo) {
    merito += atributo[key].a / N * infor(atributo[key].p / N, atributo[key].n / N);
  }
  return merito;
}

function infor(p, n) {
  return -p * getBaseLog(2, p) - n * getBaseLog(2, n);
}

function start() {
  document.querySelector("#salida").innerHTML = JSON.stringify(rawData)
  console.log(id3(rawData,header));
}

function id3(data,features) {
  // Si de la etiqueta solo queda un posible valor
  let uniqueClass = [...new Set(data.map((row, index) => row[data[index].length - 1].trim()))]
  if (uniqueClass.length === 1) {
    return {
      value: uniqueClass[0]
    }
  }

  // No quedan mas atributos por los que separar
  // TODO coger el que sale mas veces?
  if (features.length===0) {
    return {
      value: data[0]
    }
  }


  // Separar por el atributo con menor merito (menor información)
  let parsedData = parseData(data,features)
  let minimo = 5000;
  let bestFeature;
  for (const atribute in parsedData) {
    let m = merito(parsedData[atribute], data.length)
    if (m < minimo) {
      minimo = m;
      bestFeature = atribute
    }
  }
  let bestFeatureIndex = features.indexOf(bestFeature)
  const featureValues = [...new Set(data.map((row) => row[bestFeatureIndex]))];
  const children = featureValues.map((value) => {
    let subset = data.filter((row) => row[bestFeatureIndex] === value);
    subset = subset.map(row => row.filter((col,index) => index !== bestFeatureIndex)) // Eliminar la columna con el atributo seleccionado
    subset = [...new Set(subset.map(row => JSON.stringify(row)))].map(row => JSON.parse(row)); // Y borrar las filas que no sean unicas
    const remainingFeatures = features.filter((featureIndex) => featureIndex !== bestFeature);
    return {
      ...id3(subset, remainingFeatures),
      from: value
    }
  });

  return {
    value: bestFeature,
    children
  }

  // TODO para cada valor una rama y repetir id3
  // TODO Estructura del arbol?
  // TODO recorrer el arbol, es decir, predecir un ejemplo
}


/*
TODO reglas
R1: tiempoSoleado && humedadSI = SI

TODO revisar codigo
TODO hacer arbolito (svg o canvas)
TODO generalizar para mas clases ademas de solo si y no
*/


/*


{
  etiqueta: Tiempo
  ramas: [
    {
      valor: soleado,
      etiqueta: Humedad
      ramas: [
        {valor:high,etiqueta: yes}
        {valor:low,etiqueta: no}
      ]
    }
  ]
},
{
  valor: Overcast,
  etiqueta: yes
}

class TreeNode {
  const etiqueta = "Humedad"
  const padre = {Tiempo: "soleado"}
  const ramas = []
}



 */

// data = {
//     "tiempoE": {
//         soleado: {a: 2,p:1, n:1},
//         lluvioso: {a: 2,p:1, n:1},
//         nublado: {a: 2,p:1, n:1},
//         N: 6
//     }
// }