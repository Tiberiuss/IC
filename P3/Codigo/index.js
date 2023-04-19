

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
bayes(rawData)
//k_medias(rawData)
//lloyd(rawData)

function cleanData(data) {
    rawData = data.split("\n").map((row) => row.split(","));
    header = rawData.shift();
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
    console.log(muestras);

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
    const centros_convergencias = []
    for (const [clasesKeys, matrices] of Object.entries(muestras)) {
        let centro_convergencia;
        matrices.forEach((matriz, index) => {
            //TODO no le importa el orden de los multiplos, entonces siempre saca el mismo resultado no se que podriamos hacer 
            //A lo mejor con evaluate respeta el orden
            //let new_matriz = math.subtract(matriz,centro) falta la resta
            new_matriz = math.multiply(math.transpose(matriz), matriz)
            //console.log([math.transpose(matriz)], [matriz]);
            if (index === 0) {
                centro_convergencia = new_matriz
            }
            else {
                centro_convergencia = math.add(centro_convergencia, new_matriz)
            }
        })

        centro_convergencia = math.multiply(1 / matrices.length, centro_convergencia)
        centros_convergencias.push({ [clasesKeys]: centro_convergencia })
    }

    //Con los nuevos centros ver a que clase pertenece
    let punto = '6.9,3.1,4.9,1.5,Iris-versicolor'.split(",")
    punto = math.matrix(punto.slice(0, -1).map(number => parseFloat(number)))
    let minimo_distancia = 10000000
    let clase_pertenece;
    for (const [clasesKeys, centro] of Object.entries(centros)) {
        const resta = math.subtract(punto, centro)
        const distancia = math.multiply(resta, math.transpose(resta))
        clase_pertenece = math.squeeze(distancia) < minimo_distancia ? { [clasesKeys]: distancia } : clase_pertenece
    }

    console.log(`La muestra ${punto} pertenece al centro ${Object.keys(clase_pertenece)}`)
}




function k_medias(data) {
    const tolerancia_e = 0.01;
    const peso_b = 2;
    const centros = [math.matrix([4.6, 3.0, 4.0, 0.0]), math.matrix([6.8, 3.4, 4.6, 0.7])];
    const centros_anteriores = centros.map(centro => centro)
    const muestras = data.map(muestra => math.matrix(muestra.slice(0, -1).map(number => parseFloat(number))))
    let grados_pertenencias = []
    for (const muestra of muestras) {
        let distancia_acumulada = 0
        let distancia_punto = 0
        for (const centro of centros) {
            distancia_punto = 1 / Math.pow(math.distance(muestra, centro), 2);
            distancia_acumulada += Math.pow(distancia_punto, 1 / (peso_b - 1));
        }
        const grado_pertenencia = Math.pow(distancia_punto, 1 / (peso_b - 1));
        grado_pertenencia.push(grado_pertenencia)

    }

    //Sacar los nuevos centros


    //Sacar las distancias a todos los puntos desde los centros con los dos, distancias al cuadrado

    //Sacamos grado de pertenicente que se utiliza para cada muestra

    //Recalculamos centros


}

function lloyd(data) {
    const tolerancia_e = 1 / 1000000
    const k_max = 10
    const lambda = 0.1

    const muestras = data.map(muestra => math.matrix(muestra.slice(0, -1).map(number => parseFloat(number))))


    const centros = [math.matrix([4.6, 3.0, 4.0, 0.0]), math.matrix([6.8, 3.4, 4.6, 0.7])];
    const centros_anteriores = [...centros];

    let i = 0
    let seguir = true
    while (i < k_max && seguir) {
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

        //Si los centros cumplen el criterio de convergencia no seguimos
        indice = 0
        seguir = false
        for (const centro of centros) {
            const distancia = math.distance(centro, centros_anteriores[indice])
            centros_anteriores[indice] = centro
            if (distancia >= tolerancia_e) {
                seguir = true
                break
            }
            indice++

        }
        i++


    }
    //Mostrar los centros

    console.log("Los centros resultantes son:");
    centros.forEach((centro, index) => {
        console.log(`El centro ${index} esta en ${centro}`);
    })


    //Enseñar los puntos dados en testIris a que centro esta mas cercano
    let punto = '5.1,3.5,1.4,0.2,Iris-setosa'.split(",")
    punto = math.matrix(punto.slice(0, -1).map(number => parseFloat(number)))
    let indice_pertenece;
    let minimo_distancia = 10000000
    centros.forEach((centro, index) => {
        const distancia = math.distance(punto, centro)
        if (distancia < minimo_distancia) {
            indice_pertenece = index
            minimo_distancia = distancia
        }
    })
    console.log(`La muestra ${punto} pertenece al centro ${indice_pertenece}`)
}
