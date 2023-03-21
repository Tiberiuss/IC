const file = document.getElementById("file")
const button = document.getElementById("start")
let rawData;
let header;
let muestras;

button.addEventListener("click", start)
file.addEventListener('change', (e) => {
    const fileData = e.target.files[0];
    if (fileData.name !== '') {
        const reader = new FileReader();
        reader.onload = (evt) => {
            rawData = evt.target.result.split('\n').map((row) => row.split(','));
            header = rawData.shift()
            muestras = rawData.length-2;
        }

        reader.readAsText(fileData);
    };
})

function parseData(rows) {
  let data = {}
  rows.forEach((row, idx) => {
    row.forEach((col, colIdx) => {
        if (colIdx === row.length - 1) {
            return;
        }
        //col = soleado  atributo = header[colIdx]
        if (data[header[colIdx]] && data[header[colIdx]][col]) {
            data[header[colIdx]][col]["a"] += 1

        } else {
            data[header[colIdx]] = {
                [col]: {
                    a: 1,
                    p: 0,
                    n: 0
                },
                ...data[header[colIdx]]
            }
        }
        if (row[row.length - 1].trim() == 'si') {
            data[header[colIdx]][col]["p"]++;
        } else if (row[row.length - 1].trim() == 'no') {
            data[header[colIdx]][col]["n"]++;
        }
    })
})
return data;
}

function getBaseLog(x, y) {
  if(y === 0 ) return 0;
  return Math.log(y) / Math.log(x);
}

function merito(atributo,N) {
    let merito = 0.0
    for (let key in atributo) {
        merito += atributo[key].a/N * infor(atributo[key].p/N,atributo[key].n/N);
    }
    return merito;
}

function infor(p,n) {
  return -p * getBaseLog(2,p) - n * getBaseLog(2,n);
}

function start() {
  document.querySelector("#salida").innerHTML = JSON.stringify(rawData)
  let cont = 4;
  while (cont > 0) {
    let data = parseData(rawData)
    let minimo = 1;
    let atributo;
    for (const atribute in data) {
      let m = merito(data[atribute],muestras)
      if (m < minimo) {
        minimo = m;
        atributo = atribute
      }
    }
    console.log(atributo,minimo);
    for (let index = 0; index < data.length; index++) {
      rawData[index].splice(0,1);
    }
    console.log(rawData);
    cont--;
  }
}

// data = {
//     "tiempoE": {
//         soleado: {a: 2,p:1, n:1},
//         lluvioso: {a: 2,p:1, n:1},
//         nublado: {a: 2,p:1, n:1},
//         N: 6
//     }
// }