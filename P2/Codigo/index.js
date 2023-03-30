const file = document.getElementById("file");
const button = document.getElementById("start");
let rawData = `TiempoExterior,Temperatura,Humedad,Viento,Jugar
soleado,caluroso,alta,falso,no
soleado,caluroso,alta,verdad,no
nublado,caluroso,alta,falso,si
lluvioso,templado,alta,falso,si
lluvioso,frio,normal,falso,si
lluvioso,frio,normal,verdad,no
nublado,frio,normal,verdad,si
soleado,templado,alta,falso,no
soleado,frio,normal,falso,si
lluvioso,templado,normal,falso,si
soleado,templado,normal,verdad,si
nublado,templado,alta,verdad,si
nublado,caluroso,normal,falso,si
lluvioso,templado,alta,verdad,no`;
let header;
let maximo = 0;
cleanData(rawData);
start();

function cleanData(data) {
  rawData = data.split("\n").map((row) => row.split(","));
  header = rawData.shift();
}

button.addEventListener("click", start);
file.addEventListener("change", (e) => {
  const fileData = e.target.files[0];
  if (fileData.name !== "") {
    const reader = new FileReader();
    reader.onload = (evt) => {
      cleanData(evt.target.result);
    };

    reader.readAsText(fileData);
  }
});

function parseData(rows, features) {
  let data = {};
  rows.forEach((row, idx) => {
    row.forEach((col, colIdx) => {
      if (colIdx === row.length - 1) {
        return;
      }
      //col = soleado  atributo = features[colIdx]
      if (data[features[colIdx]] && data[features[colIdx]][col]) {
        data[features[colIdx]][col]["a"] += 1;
      } else {
        data[features[colIdx]] = {
          [col]: {
            a: 1,
            clases: {},
          },
          ...data[features[colIdx]],
        };
      }
      if (!data[features[colIdx]][col]["clases"][row[row.length - 1].trim()]) {
        data[features[colIdx]][col]["clases"][row[row.length - 1].trim()] = 0;
      }
      data[features[colIdx]][col]["clases"][row[row.length - 1].trim()]++;
    });
  });
  return data;
}

function getBaseLog(x, y) {
  if (y === 0) return 0;
  return Math.log(y) / Math.log(x); // TODO existe Math.log2 :/
}

function merito(atributo, N) {
  let merito = 0.0;
  for (let key in atributo) {
    merito += (atributo[key].a / N) * infor(atributo[key], N);
  }
  return merito;
}

function infor(attribute, N) {
  let sum = 0;
  for (const result in attribute["clases"]) {
    sum -=
      (attribute["clases"][result] / N) *
      getBaseLog(2, attribute["clases"][result] / N);
  }
  return sum;
}

function start() {
  // TODO revisar Juego3.txt no genera arbol bien
  const resultado = id3(rawData, header);
  console.log(resultado);
  let svg = document.querySelector("#representation");
  svg.parentNode.replaceChild(svg.cloneNode(false), svg);
  maximo = maxNodes(resultado);
  let nodeWidth = 100;
  pintar(
    resultado,
    (maximo * nodeWidth) / 2,
    100,
    0,
    maximo * nodeWidth,
    null,
    null
  );
  svg = document.querySelector("#representation");
  let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", 0);
  text.setAttribute("y", 50);
  text.setAttribute("fill", "black");
  text.appendChild(document.createTextNode(header[header.length - 1]));
  text.setAttribute("alignment-baseline", "middle");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("style", "fill: blue; stroke: black;");

  svg.append(text);
  const bbox = svg.getBBox();
  // Set the viewport with these bounds
  svg.setAttribute(
    "viewBox",
    `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
  );
}

function pintar(data, x, y, start, end, parentX, parentY) {
  console.log(start, end);
  const svg = document.querySelector("#representation");
  let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", x);
  circle.setAttribute("cy", y);
  circle.setAttribute("r", 50);
  circle.setAttribute("fill", "green");
  let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", start);
  rect.setAttribute("y", y);
  rect.setAttribute("width", end - start);
  rect.setAttribute("height", 100);
  rect.setAttribute("fill", "none");
  rect.setAttribute("stroke", "black");
  let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("fill", "white");
  text.appendChild(document.createTextNode(data.value));
  text.setAttribute("alignment-baseline", "middle");
  text.setAttribute("text-anchor", "middle");
  let line = document.createElementNS("http://www.w3.org/2000/svg", "path");
  if (parentX && parentY)
    line.setAttribute("d", `M${parentX} ${parentY} L${x} ${y} Z`);
  line.setAttribute("stroke", "black");
  let fromRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  fromRect.setAttribute("x", (parentX + x) / 2 - 40);
  fromRect.setAttribute("y", (parentY + y) / 2 - 10);
  fromRect.setAttribute("width", 100);
  fromRect.setAttribute("height", 20);
  fromRect.setAttribute("fill", "white");
  //fromRect.setAttribute("stroke","black")
  let from = document.createElementNS("http://www.w3.org/2000/svg", "text");
  from.setAttribute("x", (parentX + x) / 2);
  from.setAttribute("y", (parentY + y) / 2);
  from.setAttribute("fill", "black");
  from.appendChild(document.createTextNode(data.from));
  from.setAttribute("alignment-baseline", "middle");
  from.setAttribute("text-anchor", "middle");

  if (data.from) svg.prepend(fromRect);
  if (parentX && parentY) svg.prepend(line);
  svg.append(circle);
  //svg.append(rect)
  svg.append(text);
  if (data.from) svg.append(from);

  if (data.children) {
    let space = (end - start) / data.children.length;
    let s = start;
    let e = s + space;
    for (const children in data.children) {
      pintar(data.children[children], (e + s) / 2, y + 150, s, e, x, y);
      s += space;
      e = s + space;
    }
  }
}

function maxNodes(data) {
  const cola = [data];
  let nivel = 0;
  let nodeCount = 1;
  let maxNodes = 0;
  while (true) {
    nodeCount = cola.length;
    if (nodeCount === 0) {
      break;
    }

    while (nodeCount !== 0) {
      nodoActual = cola.shift();
      maxNodes = Math.max(maxNodes, nodoActual.children?.length ?? 0);
      for (const children in nodoActual.children) {
        cola.push(nodoActual.children[children]);
      }
      nodeCount--;
    }
    nivel++;
  }

  return Math.pow(maxNodes, nivel - 1);
}

function id3(data, features) {
  // Si de la etiqueta solo queda un posible valor
  let uniqueClass = [
    ...new Set(data.map((row, index) => row[data[index].length - 1].trim())),
  ];
  if (uniqueClass.length === 1) {
    return {
      value: uniqueClass[0],
    };
  }

  // No quedan mas atributos por los que separar
  // TODO coger el que sale mas veces?
  if (features.length - 1 === 0) {
    return {
      value: data[0],
    };
  }

  // Separar por el atributo con menor merito (menor información)
  let parsedData = parseData(data, features);
  let minimo = 5000;
  let bestFeature;
  for (const atribute in parsedData) {
    let m = merito(parsedData[atribute], data.length);
    if (m < minimo) {
      minimo = m;
      bestFeature = atribute;
    }
  }
  let bestFeatureIndex = features.indexOf(bestFeature);
  const featureValues = [...new Set(data.map((row) => row[bestFeatureIndex]))];
  const children = featureValues.map((value) => {
    let subset = data.filter((row) => row[bestFeatureIndex] === value);
    subset = subset.map((row) =>
      row.filter((col, index) => index !== bestFeatureIndex)
    ); // Eliminar la columna con el atributo seleccionado
    subset = [...new Set(subset.map((row) => JSON.stringify(row)))].map((row) =>
      JSON.parse(row)
    ); // Y borrar las filas que no sean unicas
    const remainingFeatures = features.filter(
      (featureIndex) => featureIndex !== bestFeature
    );
    return {
      ...id3(subset, remainingFeatures),
      from: value,
    };
  });

  return {
    value: bestFeature,
    children,
  };

  // TODO para cada valor una rama y repetir id3
  // TODO Estructura del arbol?
  // TODO recorrer el arbol, es decir, predecir un ejemplo
}

/*
TODO reglas
R1: tiempoSoleado && humedadSI = SI

TODO revisar codigo
TODO hacer arbolito (svg o canvas) ✅
TODO generalizar para mas clases ademas de solo si y no ✅
*/

/*{
  etiqueta: Tiempo
  children: [
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
*/
