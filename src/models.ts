import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(__dirname + "/pelis.json").then((data: Peli[]) => {
      return data;
    });
  }
  add(peli: Peli): Promise<boolean> {
    return this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        return this.getAll().then((peliculasarray) => {
          peliculasarray.push(peli);
          return jsonfile
            .writeFile(__dirname + "/pelis.json", peliculasarray)
            .then(() =>{
              return true
            })
            .catch((error) => {
              return false;
            });
        });
      }
    });
  }

  getById(id: number): Promise<Peli | undefined> {
    return this.getAll().then((peliculas) => {
      if (!Array.isArray(peliculas)) {
        console.error("Error", peliculas);
        return undefined;
      }
      return peliculas.find((p) => p.id === id);
    });
  }
  async search(options: SearchOptions): Promise<Peli[]> {
    return await this.getAll().then((peliculas) => {
      if (options.title && options.tag) {
        const resultado = peliculas.filter((p) => {
          return (
            p.title.includes(options.title) && p.tags.includes(options.tag)
          );
        });
        return resultado;
      } else if (options.title) {
        const resultado = peliculas.filter((p) => {
          return p.title.includes(options.title);
        });
        return resultado;
      } else if (options.tag) {
        const resultado = peliculas.filter((p) => {
          return p.tags.includes(options.tag);
        });
        return resultado;
      }
      return peliculas;
    });
  }
}
export { PelisCollection, Peli };
