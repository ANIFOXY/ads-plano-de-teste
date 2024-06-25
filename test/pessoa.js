const { describe, expect, it } = require('@jest/globals');
const ServicoExercicio = require("../src/services/pessoa");

describe('Testes do primeiro exercício', () => {

   const servico = new ServicoExercicio()

   // Executado antes de TODOS os testes
   beforeAll(async () => {
      console.info('Iniciando TDD com jest!');
   });

   // Executado após TODOS os testes
   afterAll(() => {
      console.info('Encerrados os testes');
   });

   it('Should add a name', () => {
      const qtde = servico.PegarTodos().length
      servico.Adicionar("Joao")
      const qtdeAfter = servico.PegarTodos().length
      
      expect(qtdeAfter).toBe(qtde + 1);
   })

})
