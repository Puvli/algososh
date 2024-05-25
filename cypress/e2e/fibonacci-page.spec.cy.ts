describe("Проверка доступности кнопки Рассчитать", () => {
  beforeEach(() => {
    cy.visit("fibonacci");
  });

  it("Кнопка должна быть недоступна, если инпут пустой", () => {
    cy.get('[data-testid="button"]').should("be.disabled");

    cy.get('[data-testid="input"]').type(7);
    cy.get('[data-testid="button"]').should("not.be.disabled");

    cy.get('[data-testid="input"]').clear();
    cy.get('[data-testid="button"]').should("be.disabled");
  });

  it('Проверка создания чисел Фибоначчи', () => {
    const numberToGenerate = 5;
    const expectedFibonacciNumbers = ['1', '1', '2', '3', '5'];

    // Ввод числа для генерации и активация генерации чисел Фибоначчи
    cy.get('[data-testid="input"]').type(`${numberToGenerate}`);
    cy.get('[data-testid="button"]').click();

    // Проверка, что числа Фибоначчи генерируются корректно
    cy.get('div[class*="circle_circle"]').should('have.length', numberToGenerate);
    cy.get('div[class*="circle_circle"]').each((item, index) => {
      // Проверка, что текст каждого круга соответствует ожидаемому числу Фибоначчи
      cy.wrap(item).invoke('text').should('equal', expectedFibonacciNumbers[index]);
    });
  });
});
