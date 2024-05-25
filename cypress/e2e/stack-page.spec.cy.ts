import { ElementStates } from "../../src/types/element-states";
const result = ["A"];
const expectedLength = result.length;

describe("Проверка доступности кнопки Рассчитать", () => {
  beforeEach(() => {
    cy.visit("stack");
  });

  it("Кнопка должна быть недоступна, если инпут пустой", () => {
    cy.get('[data-testid="add"]').should("be.disabled");
    cy.get('[data-testid="delete"]').should("be.disabled");
    cy.get('[data-testid="clear"]').should("be.disabled");

    cy.get('[data-testid="input"]').type(10);
    cy.get('[data-testid="add"]').should("not.be.disabled");

    cy.get('[data-testid="input"]').clear();
    cy.get('[data-testid="add"]').should("be.disabled");
  });

  it("Проверка анимации добавления", () => {
    cy.get('[data-testid="input"]').type("A");
    cy.get('[data-testid="add"]').click();

    // Проверка наличия ожидаемого количества элементов
    cy.get('[data-testid="stack-elements"]')
      .children()
      .should("have.length", expectedLength);

    cy.get('[data-testid="stack-elements"]')
      .children()
      .each(($el, index) => {
        cy.wrap($el)
          .find('div[class*="circle_circle"]')
          .invoke("text")
          .should("eq", result[index]);

        // Проверка начального состояния анимации (changing)
        cy.wrap($el)
          .find('div[class*="circle_circle"]')
          .invoke("attr", "class")
          .then((className) => {
            expect(className).to.match(/changing/);
          });
      });

    cy.wait(expectedLength * 500);

    // Проверка, что после анимации класс элемента становится `default`
    cy.get('[data-testid="stack-elements"]')
      .children()
      .each(($el, index) => {
        cy.wrap($el)
          .find('div[class*="circle_circle"]')
          .invoke("text")
          .should("eq", result[index]);

        // Проверка конечного состояния элемента (стандартное)
        cy.wrap($el)
          .find('div[class*="circle_circle"]')
          .invoke("attr", "class")
          .then((className) => {
            expect(className).to.match(/default/);
          });
      });
  });

  it("Проверка удаления элемента из стека", () => {
    cy.get('[data-testid="input"]').type("7");
    cy.get('[data-testid="add"]').click(); // Добавляем элемент
    cy.wait(500);

    // Выполняем удаление элемента
    cy.get('[data-testid="delete"]').click();
    cy.wait(500);

    // Проверяем, что стек пуст после удаления элемента
    cy.get('[data-testid="stack-elements"]')
      .children()
      .should("have.length", 0);
  });

  it("Проверка очистки стека", function () {
    // Добавление нескольких элементов в стек для проверки очистки
    const elementsToAdd = ["1", "2", "C"];
    elementsToAdd.forEach((item) => {
      cy.get('[data-testid="input"]').type(item);
      cy.get('[data-testid="add"]').click();
      cy.wait(1000);
    });

    // После добавления элементов нажимаем на кнопку "Очистить"
    cy.get('[data-testid="clear"]').click();
    cy.wait(500);

    // Проверяем, что после очистки в стеке не осталось элементов
    cy.get('[data-testid="stack-elements"]')
      .children()
      .should("have.length", 0);
  });
});
