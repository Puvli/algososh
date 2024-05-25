describe("Проверка роутинга", () => {
  before(() => {
    cy.visit("");
  });

  it("Главная страница", () => {
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("Строка", function () {
    cy.visit("recursion");
    cy.contains("Строка");
  });

  it("Последовательность Фибоначчи", () => {
    cy.visit("fibonacci");
    cy.contains("Последовательность Фибоначчи");
  });

  it("Сортировка массива", () => {
    cy.visit("sorting");
    cy.contains("Сортировка массива");
  });

  it("Стек", () => {
    cy.visit("stack");
    cy.contains("Стек");
  });

  it("Очередь", () => {
    cy.visit("queue");
    cy.contains("Очередь");
  });

  it("Связный список", () => {
    cy.visit("list");
    cy.contains("Связный список");
  });
});
