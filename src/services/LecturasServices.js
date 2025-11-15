const localKey = "lectura_list_data";

const createLectura = (entrada) => {
    let lista = [];
    const data = localStorage.getItem(localKey);
    if(data != null) {
        lista = JSON.parse(data);
    }
    lista = [...lista, entrada];
    localStorage.setItem(localKey, JSON.stringify(lista));
}

const getLecturas = () => {
    const data = localStorage.getItem(localKey);
    if(data != null){
        return JSON.parse(data);
    }
    return []
}

const removeLectura = (index) => {
    const lecturas = getLecturas();
    lecturas.splice(index, 1);
    localStorage.setItem(localKey, JSON.stringify(lecturas));
}


export { createLectura, getLecturas, removeLectura };