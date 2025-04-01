import { Peli, PelisCollection } from "./models";

export type Options = {
  action?: "buscar" | "guardar" | "buscarUno";
  id?: number;
  search?: undefined | {
    title?: string;
    tag?: string;
  };
  peli?: Peli;
};

class PelisController {
  model: PelisCollection;
  constructor() {
    this.model = new PelisCollection();
  }
  selector(options) {
    if (options.action === "buscar") {
      return this.get(options)
        .then((resultado) => {
          return resultado;
        })
        .catch((error) => {
          console.log(error, "error al realizar la busqueda");
        });
    } else if (options.action === "buscarUno") {
      return this.getOne(options).then((resultado) => {
        return resultado;
      });
    } else if (options.action === "guardar") {
      return this.add(options.peli).then(() => {
        return "Se Guardo con exito";
      });
    }
  }
  async get(options?: Options) {
    if (options) {
      var result = [];
      if (options.id) {
        const resultado = await this.model.getById(options.id);
        result.push(resultado);
      } else if (options.search) {
        if (options.search.title || options.search.tag) {
          const resultado = await this.model.search(options.search);
          result = resultado;
        }
        else {
          const resultado = await this.model.getAll();
          result = resultado;
        }
      }
      return result;
    } 
  }

  async getOne(options?: Options) {
    const resultado = await this.get(options);
    return resultado[0];
  }

  async add(peli) {
    await this.model.add(peli);
  }
}

export { PelisController };
