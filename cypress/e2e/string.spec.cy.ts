describe('Проверка доступности кнопки "Развернуть"', () => {
  beforeEach(() => {
    cy.visit("recursion");
  });

  it("Кнопка должна быть недоступна, если инпут пустой", () => {
    cy.get('[data-testid="button"]').as("btn").should("be.disabled");

    cy.get('[data-testid="input"]').type("Тестовая строка");
    cy.get('[data-testid="button"]').should("not.be.disabled");

    cy.get('[data-testid="input"]').clear();
    cy.get('[data-testid="button"]').should("be.disabled");
  });

  it("successfully reverses the string with correct animations", () => {
    const testString = "test";
    const reversedString = "tset";

    // Ввод тестовой строки и активация разворота строки
    cy.get('[data-testid="input"]').type(testString);
    cy.get('[data-testid="button"]').click();

    cy.get('[data-testid="result"]')
      .children()
      .each(($item, index) => {
        // Проверяем, что текст каждого символа соответствует введенной строке
        cy.wrap($item).invoke("text").should("eq", testString[index]);
        // Проверяем начальное состояние анимации
        cy.wrap($item)
          .find('div[class*="circle_circle"]')
          .invoke("attr", "class")
          .should("contain", "default");
      });

    const animationDelay = 500;

    // Ожидание завершения анимации
    cy.wait(animationDelay);

    cy.get('[data-testid="result"]')
      .children()
      .each(($item, index) => {
        // Проверяем, что текст каждого символа соответствует перевернутой строке
        cy.wrap($item).invoke("text").should("eq", reversedString[index]);
        // Проверяем конечное состояние анимации (должно быть изменено или модифицировано)
        cy.wrap($item)
          .find('div[class*="circle_circle"]')
          .invoke("attr", "class")
          .should("contain", "modified");
      });
  });
});
