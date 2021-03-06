/*
    0 Obter usuário
    1 Obter o número de telefone de um usuário a partir de seu ID
    2 Obter o endereço do usuário pelo ID
*/
// importamos um módulo interno do node.js
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  // quando erro    -> reject(ERRO)
  // quando success -> resolve
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      // return reject(new Error("Deu ruim de verdade"));

      return resolve({
        id: 1,
        nome: "Fernando",
        dataNascimento: new Date()
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: "87879898",
        ddd: 11
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "Largo Redentor",
      numero: 46
    });
  }, 2000);
}

// 1 adicionar a palavra asynbc -> automaticamente ela retornará uma Promize
main();
async function main() {
  try {
    console.time("medida-promise");
    const usuario = await obterUsuario();
    // const telefone = await obterTelefone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id);
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ]);

    const endereco = resultado[1];
    const telefone = resultado[0];

    console.log(`
      Nome: ${usuario.nome}
      Telefone: (${telefone.ddd}) ${telefone.telefone}
      Endereço: ${endereco.rua}, ${endereco.numero}
    `);
    console.timeEnd("medida-promise");
  } catch (error) {
    console.log("Erro", error);
  }
}
