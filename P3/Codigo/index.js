const file = document.getElementById("file");
const testsFile = document.getElementById("tests");
const button = document.getElementById("start");
const testsButton = document.getElementById("test-start");
const algorithms = document.getElementById("algorithm");
const content = document.getElementById("content");
const resultados = document.getElementById("results");
const testText = document.getElementById("text-test");
let testData;
let punto;
let rawData = `5.1,3.5,1.4,0.2,Iris-setosa
4.9,3.0,1.4,0.2,Iris-setosa
4.7,3.2,1.3,0.2,Iris-setosa
4.6,3.1,1.5,0.2,Iris-setosa
5.0,3.6,1.4,0.2,Iris-setosa
5.4,3.9,1.7,0.4,Iris-setosa
4.6,3.4,1.4,0.3,Iris-setosa
5.0,3.4,1.5,0.2,Iris-setosa
4.4,2.9,1.4,0.2,Iris-setosa
4.9,3.1,1.5,0.1,Iris-setosa
5.4,3.7,1.5,0.2,Iris-setosa
4.8,3.4,1.6,0.2,Iris-setosa
4.8,3.0,1.4,0.1,Iris-setosa
4.3,3.0,1.1,0.1,Iris-setosa
5.8,4.0,1.2,0.2,Iris-setosa
5.7,4.4,1.5,0.4,Iris-setosa
5.4,3.9,1.3,0.4,Iris-setosa
5.1,3.5,1.4,0.3,Iris-setosa
5.7,3.8,1.7,0.3,Iris-setosa
5.1,3.8,1.5,0.3,Iris-setosa
5.4,3.4,1.7,0.2,Iris-setosa
5.1,3.7,1.5,0.4,Iris-setosa
4.6,3.6,1.0,0.2,Iris-setosa
5.1,3.3,1.7,0.5,Iris-setosa
4.8,3.4,1.9,0.2,Iris-setosa
5.0,3.0,1.6,0.2,Iris-setosa
5.0,3.4,1.6,0.4,Iris-setosa
5.2,3.5,1.5,0.2,Iris-setosa
5.2,3.4,1.4,0.2,Iris-setosa
4.7,3.2,1.6,0.2,Iris-setosa
4.8,3.1,1.6,0.2,Iris-setosa
5.4,3.4,1.5,0.4,Iris-setosa
5.2,4.1,1.5,0.1,Iris-setosa
5.5,4.2,1.4,0.2,Iris-setosa
4.9,3.1,1.5,0.1,Iris-setosa
5.0,3.2,1.2,0.2,Iris-setosa
5.5,3.5,1.3,0.2,Iris-setosa
4.9,3.1,1.5,0.1,Iris-setosa
4.4,3.0,1.3,0.2,Iris-setosa
5.1,3.4,1.5,0.2,Iris-setosa
5.0,3.5,1.3,0.3,Iris-setosa
4.5,2.3,1.3,0.3,Iris-setosa
4.4,3.2,1.3,0.2,Iris-setosa
5.0,3.5,1.6,0.6,Iris-setosa
5.1,3.8,1.9,0.4,Iris-setosa
4.8,3.0,1.4,0.3,Iris-setosa
5.1,3.8,1.6,0.2,Iris-setosa
4.6,3.2,1.4,0.2,Iris-setosa
5.3,3.7,1.5,0.2,Iris-setosa
5.0,3.3,1.4,0.2,Iris-setosa
7.0,3.2,4.7,1.4,Iris-versicolor
6.4,3.2,4.5,1.5,Iris-versicolor
6.9,3.1,4.9,1.5,Iris-versicolor
5.5,2.3,4.0,1.3,Iris-versicolor
6.5,2.8,4.6,1.5,Iris-versicolor
5.7,2.8,4.5,1.3,Iris-versicolor
6.3,3.3,4.7,1.6,Iris-versicolor
4.9,2.4,3.3,1.0,Iris-versicolor
6.6,2.9,4.6,1.3,Iris-versicolor
5.2,2.7,3.9,1.4,Iris-versicolor
5.0,2.0,3.5,1.0,Iris-versicolor
5.9,3.0,4.2,1.5,Iris-versicolor
6.0,2.2,4.0,1.0,Iris-versicolor
6.1,2.9,4.7,1.4,Iris-versicolor
5.6,2.9,3.6,1.3,Iris-versicolor
6.7,3.1,4.4,1.4,Iris-versicolor
5.6,3.0,4.5,1.5,Iris-versicolor
5.8,2.7,4.1,1.0,Iris-versicolor
6.2,2.2,4.5,1.5,Iris-versicolor
5.6,2.5,3.9,1.1,Iris-versicolor
5.9,3.2,4.8,1.8,Iris-versicolor
6.1,2.8,4.0,1.3,Iris-versicolor
6.3,2.5,4.9,1.5,Iris-versicolor
6.1,2.8,4.7,1.2,Iris-versicolor
6.4,2.9,4.3,1.3,Iris-versicolor
6.6,3.0,4.4,1.4,Iris-versicolor
6.8,2.8,4.8,1.4,Iris-versicolor
6.7,3.0,5.0,1.7,Iris-versicolor
6.0,2.9,4.5,1.5,Iris-versicolor
5.7,2.6,3.5,1.0,Iris-versicolor
5.5,2.4,3.8,1.1,Iris-versicolor
5.5,2.4,3.7,1.0,Iris-versicolor
5.8,2.7,3.9,1.2,Iris-versicolor
6.0,2.7,5.1,1.6,Iris-versicolor
5.4,3.0,4.5,1.5,Iris-versicolor
6.0,3.4,4.5,1.6,Iris-versicolor
6.7,3.1,4.7,1.5,Iris-versicolor
6.3,2.3,4.4,1.3,Iris-versicolor
5.6,3.0,4.1,1.3,Iris-versicolor
5.5,2.5,4.0,1.3,Iris-versicolor
5.5,2.6,4.4,1.2,Iris-versicolor
6.1,3.0,4.6,1.4,Iris-versicolor
5.8,2.6,4.0,1.2,Iris-versicolor
5.0,2.3,3.3,1.0,Iris-versicolor
5.6,2.7,4.2,1.3,Iris-versicolor
5.7,3.0,4.2,1.2,Iris-versicolor
5.7,2.9,4.2,1.3,Iris-versicolor
6.2,2.9,4.3,1.3,Iris-versicolor
5.1,2.5,3.0,1.1,Iris-versicolor
5.7,2.8,4.1,1.3,Iris-versicolor`;
cleanData(rawData);
// cleanTestData(testData);
//bayes(rawData)
//k_medias(rawData)
//lloyd(rawData)

button.addEventListener("click", start);
testsButton.addEventListener("click", start);
file.addEventListener("change", (e) => {
    //TODO cambiar el div de resultados a d-none??
    const fileData = e.target.files[0];
    if (fileData.name !== "") {
        const reader = new FileReader();
        reader.onload = (evt) => {
            cleanData(evt.target.result);
        };

        reader.readAsText(fileData);
    }
});

testsFile.addEventListener("change", (e) => {
    const fileData = e.target.files[0];
    if (fileData.name !== "") {
        const reader = new FileReader();
        reader.onload = (evt) => {
            cleanTestData(evt.target.result);
        };

        reader.readAsText(fileData);
    }
});

function cleanData(data) {
    rawData = data.split("\n").map((row) => row.split(","));
    header = rawData.shift();
}

function cleanTestData(data) {
    punto = data.split(",")
    punto = math.matrix(punto.slice(0, -1).map(number => parseFloat(number)))
}

function start() {
    const selectedAlgorithm = algorithms.value
    resultados.innerHTML = ""
    if (selectedAlgorithm === "0") {
        k_medias(rawData)
    }
    else if (selectedAlgorithm === "1") {
        bayes(rawData)
    }
    else {
        lloyd(rawData)
    }
    content.classList.add("d-block")
    resultados.scrollTo(0, resultados.scrollHeight);
}

function bayes(data) {
    let muestras = {}
    data.forEach(muestra => {
        const clase = muestra.slice(-1)[0]
        const muestraM = math.matrix([muestra.slice(0, -1).map(number => parseFloat(number))])
        if (clase in muestras) {
            muestras[clase].push(muestraM)
        }
        else {
            muestras = { ...muestras, [clase]: [muestraM] }
        }
    })

    let centros = {}
    //Calcular centros/medias
    for (const [clasesKeys, matrices] of Object.entries(muestras)) {
        let centro;
        matrices.forEach((matriz, index) => {
            if (index === 0) {
                centro = matriz
            }
            else {
                centro = math.add(centro, matriz)
            }
        })
        centro = math.divide(centro, matrices.length)
        centros = { ...centros, [clasesKeys]: centro }
    }

    //Calcular para cada muestra su centro de convergencia
    let matrices_covarianza = []
    for (const [clasesKeys, matrices] of Object.entries(muestras)) {
        let matriz_covarianza;
        matrices.forEach((matriz, index) => {
            let new_matriz = math.subtract(matriz, centros[clasesKeys])
            new_matriz = math.multiply(math.transpose(new_matriz), new_matriz)
            if (index === 0) {
                matriz_covarianza = new_matriz
            }
            else {
                matriz_covarianza = math.add(matriz_covarianza, new_matriz)
            }
        })

        matriz_covarianza = math.multiply(1 / matrices.length, matriz_covarianza)
        matrices_covarianza = { ...matrices_covarianza, [clasesKeys]: matriz_covarianza }

        const table_matriz_covarianza = document.createElement('div')
        table_matriz_covarianza.innerHTML = `<h5>Matriz de covarianza de ${clasesKeys}</h5>`
        let table = "<table>"
        let actualRow = -1;

        matriz_covarianza.forEach((el,[row,col]) => {
            if (row !== actualRow) {
                actualRow = row;
                table+="<tr>";
            }

            table += "<td>" + el + "</td>"

            if (row !== actualRow) {
                actualRow = row;
                table+="</tr>";
            }
        })
        table += "</table>"
        table_matriz_covarianza.innerHTML += table;
        resultados.appendChild(table_matriz_covarianza)
    }



    if (punto) {
        //Con los nuevos centros ver a que clase pertenece
        let minimo_distancia = 10000000
        let clase_pertenece;
        for (const [clasesKeys, centro] of Object.entries(centros)) {
            let resta = math.subtract(punto, centro)
            resta = math.multiply(resta, math.inv(matrices_covarianza[clasesKeys]))
            const distancia = math.multiply(resta, math.transpose(resta))
            console.log(distancia)
            if (math.squeeze(distancia) < minimo_distancia) {
                clase_pertenece = { [clasesKeys]: math.squeeze(distancia) }
                minimo_distancia = math.squeeze(distancia)

            }
        }

        testText.innerText = `La muestra ${punto} pertenece al centro ${Object.keys(clase_pertenece)}`
    }
}




function k_medias(data) {
    const tolerancia_e = 0.01;
    const peso_b = 2;
    const centros = [math.matrix([4.6, 3.0, 4.0, 0.0]), math.matrix([6.8, 3.4, 4.6, 0.7])];
    const centros_anteriores = [...centros]
    const muestras = data.map(muestra => math.matrix(muestra.slice(0, -1).map(number => parseFloat(number))))
    const nombre_clases = ["Iris-setosa", "Iris-versicolor"]
    seguir = true
    let iteraciones = 1
    while (seguir) {
        let grados_pertenencias = []
        for (const muestra of muestras) {
            let distancia_acumulada = 0
            let distancia_punto = 0
            //Sacar las distancias a todos los puntos desde los centros con los dos, distancias al cuadrado
            for (const centro of centros) {
                distancia_punto = 1 / Math.pow(math.distance(muestra, centro), 2);
                distancia_acumulada += Math.pow(distancia_punto, 1 / (peso_b - 1));
            }
            let index = 0
            let peso_pertenencia = {}
            //Sacamos grado de perteniencia que se utiliza para cada muestra
            for (const centro of centros) {
                distancia_punto = 1 / Math.pow(math.distance(muestra, centro), 2);
                let grado_pertenencia = Math.pow(distancia_punto, 1 / (peso_b - 1)) / distancia_acumulada;
                peso_pertenencia = { ...peso_pertenencia, [index]: grado_pertenencia }
                index++
            }
            grados_pertenencias.push(peso_pertenencia)

        }
        // console.log(grados_pertenencias);

        //Sacar los nuevos centros
        let index_centros = 0
        while (index_centros < centros.length) {
            let index_muestras = 0
            let num_centro;
            let den_centro;
            for (const muestra of muestras) {
                const muestra_actual = math.multiply(muestra, Math.pow(grados_pertenencias[index_muestras][index_centros], peso_b))
                if (index_muestras === 0) {
                    num_centro = muestra_actual
                    den_centro = Math.pow(grados_pertenencias[index_muestras][index_centros], peso_b)
                }
                else {
                    num_centro = math.add(num_centro, muestra_actual)
                    den_centro += Math.pow(grados_pertenencias[index_muestras][index_centros], peso_b)
                }
                index_muestras++
            }
            const nuevoCentro = math.divide(num_centro, den_centro)
            centros[index_centros] = nuevoCentro
            index_centros++
        }
        // console.log(centros);

        pintarlloydKmedias(iteraciones, centros, centros_anteriores)


        //Comprobamos si iteramos otra vez
        indice = 0
        seguir = false
        for (const centro of centros) {
            const distancia = math.distance(centro, centros_anteriores[indice])
            centros_anteriores[indice] = centro
            if (distancia >= tolerancia_e) {
                seguir = true
                iteraciones++
                break
            }
            indice++

        }

    }

    if (punto) {
        //Enseñar los puntos dados en testIris a que centro esta mas cercano
        let indice_pertenece;
        let minimo_distancia = 10000000
        centros.forEach((centro, index) => {
            const distancia = math.distance(punto, centro)
            if (distancia < minimo_distancia) {
                indice_pertenece = index
                minimo_distancia = distancia
            }
        })

        testText.innerText = `La muestra ${punto} pertenece a la clase ${nombre_clases[indice_pertenece]} con una distancia de ${minimo_distancia}`

    }




}

function lloyd(data) {
    const tolerancia_e = 1 / 1000000
    const k_max = 10
    const lambda = 0.1

    const muestras = data.map(muestra => math.matrix(muestra.slice(0, -1).map(number => parseFloat(number))))
    const nombre_clases = ["Iris-setosa", "Iris-versicolor"]

    const centros = [math.matrix([4.6, 3.0, 4.0, 0.0]), math.matrix([6.8, 3.4, 4.6, 0.7])];
    const centros_anteriores = [...centros];

    let iteraciones = 1
    let seguir = true
    while (iteraciones < k_max && seguir) {
        let indice_elegido;
        //Calcular que centro cambiar para cada muestra
        for (const muestra of muestras) {
            let minimo_distancia = 1000000
            centros.forEach((centro, index) => {
                const distancia = math.distance(centro, muestra)
                if (distancia < minimo_distancia) {
                    indice_elegido = index
                    minimo_distancia = distancia
                }
            })
            //Cambiar el centro elegido
            let centro_elegido = centros[indice_elegido]
            centro_elegido = math.add(centro_elegido, math.multiply(lambda, math.subtract(muestra, centro_elegido)))
            centros[indice_elegido] = centro_elegido
        }

        pintarlloydKmedias(iteraciones, centros, centros_anteriores)

        //Si los centros cumplen el criterio de convergencia no seguimos
        indice = 0
        seguir = false
        for (const centro of centros) {
            const distancia = math.distance(centro, centros_anteriores[indice])
            centros_anteriores[indice] = centro
            if (distancia >= tolerancia_e) {
                seguir = true
                iteraciones++
                break
            }
            indice++

        }


    }
    //Mostrar los centros

    console.log("Los centros resultantes son:");
    centros.forEach((centro, index) => {
        console.log(`El centro ${index} esta en ${centro}`);
    })

    if (punto) {
        //Enseñar los puntos dados en testIris a que centro esta mas cercano
        let indice_pertenece;
        let minimo_distancia = 10000000
        centros.forEach((centro, index) => {
            const distancia = math.distance(punto, centro)
            if (distancia < minimo_distancia) {
                indice_pertenece = index
                minimo_distancia = distancia
            }
        })

        testText.innerText = `La muestra ${punto} esta más cercano al centro de ${nombre_clases[indice_pertenece]} con una distancia de ${minimo_distancia}`
    }

}

function pintarlloydKmedias(iteraciones, centros, centros_anteriores) {

    const iteracion = document.createElement('div')
    iteracion.innerHTML = `<h3>Iteracion ${iteraciones}</h3>

    <h5>Centro Iris-setosa</h5>
    <p>Centro anterior(Vt-1): ${centros_anteriores[0]}</p>
    <p>Nuevo centro(Vt): ${centros[0]}</p>

    <h5>Centro Iris-versicola</h5>
    <p>Centro anterior(Vt-1): ${centros_anteriores[1]}</p>
    <p>Nuevo centro(Vt): ${centros[1]}</p>
    `
    resultados.appendChild(iteracion)

}

