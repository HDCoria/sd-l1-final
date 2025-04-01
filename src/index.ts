import minimist from "minimist";
import { Options, PelisController } from "./controllers";

function parseaParams(argv): Options {
  const resultado = minimist(argv);
  return {
    action: resultado.action,
    id: resultado.id,
    search: {
      title: resultado.title,
      tag: resultado.tag,
    },
    peli: {
      id: resultado.id,
      title: resultado.title,
      tags: resultado.tags,
    },
  };
}

function main() {
  const controlador = new PelisController();
  const params = parseaParams(process.argv.slice(2));
  console.log(params);
  controlador.selector(params).then((resultado) => {
    console.log(resultado);
  });
}

main();
