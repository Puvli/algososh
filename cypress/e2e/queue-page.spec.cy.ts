describe("Проверка доступности кнопок", () => {
  beforeEach(() => {
    cy.visit("/queue");
  });

  it("Кнопка должна быть недоступна, если инпут пустой", () => {
    cy.get('[data-testid="add"]').should("be.disabled");
    cy.get('[data-testid="delete"]').should("be.disabled");
    cy.get('[data-testid="clear"]').should("be.disabled");

    cy.get('[data-testid="input"]').type("10");
    cy.get('[data-testid="add"]').should("not.be.disabled");

    cy.get('[data-testid="input"]').clear();
    cy.get('[data-testid="add"]').should("be.disabled");
    cy.get('[data-testid="delete"]').should("be.disabled");
    cy.get('[data-testid="clear"]').should("be.disabled");
  });

  it("Проверка анимации добавления и кнопки добавления", () => {

    const test = "A";
    const result = ["A", "", "", "", "", "", ""];
    const testLength = result.length;

    cy.get('[data-testid="input"]').type(test);
    cy.get('[data-testid="add"]').click(); 
    cy.get('[data-testid="queue-elements"]')
      .children()
      .should("have.length", testLength);
    cy.get('[data-testid="queue-elements"]')
      .children()
      .each((item, index) => {
        cy.wrap(item)
          .find('div[class*="circle_circle"]')
          .invoke("text")
          .should("eq", result[index]);

        const toMatch = index === 0 ? /changing/ : /default/;
        cy.wrap(item)
          .find('div[class*="circle_circle"]')
          .invoke("attr", "class")
          .then((className) => {
            expect(className).to.match(toMatch);
          });
      });
    cy.wait(500);

    cy.get('[data-testid="queue-elements"]')
      .children()
      .each((item, index) => {
        cy.wrap(item)
          .find('div[class*="circle_circle"]')
          .invoke("text")
          .should("eq", result[index]);

        cy.wrap(item)
          .find('div[class*="circle_circle"]')
          .invoke("attr", "class")
          .then((className) => {
            expect(className).to.match(/default/);
          });
      });
  });

  it("Проверка анимации удаления и кнопки удаления", () => {

    const test = "A";
    const result = ["", "", "", "", "", "", ""];
    const testLength = result.length;

    cy.get('[data-testid="input"]').type(test);
    cy.get('[data-testid="add"]').click();
    cy.get('[data-testid="queue-elements"]')
      .children()
      .should("have.length", testLength);
    cy.wait(500);

    cy.get('[data-testid="delete"]').click();
    cy.get('[data-testid="queue-elements"]')
      .children()
      .each((item, index) => {
        cy.wrap(item)
          .find('div[class*="circle_circle"]')
          .invoke("text")
          .should("eq", result[index]);

        cy.wrap(item)
          .find('div[class*="circle_circle"]')
          .invoke("attr", "class")
          .then((className) => {
            expect(className).to.match(/default/);
          });
      });
    cy.get('[data-testid="queue-elements"]')
      .children()
      .should("have.length", testLength);
  });

  it("Проверка анимации очистки и кнопки очищения очереди", () => {
    
    const input = ["A", "B", "", "", "", "", ""];
    const result = ["", "", "", "", "", "", ""];
    const testLength = result.length;

    cy.get('[data-testid="input"]').type(input[0]);
    cy.get('[data-testid="add"]').click();
    cy.get('[data-testid="queue-elements"]')
      .children()
      .should("have.length", testLength);
    cy.wait(1000);

    cy.get('[data-testid="input"]').type(input[1]);
    cy.get('[data-testid="add"]').click();
    cy.get('[data-testid="queue-elements"]')
      .children()
      .should("have.length", testLength);
    cy.wait(1000);

    cy.get('[data-testid="clear"]').click();
    cy.get('[data-testid="queue-elements"]')
      .children()
      .each((item, index) => {
        cy.wrap(item)
          .find('div[class*="circle_circle"]')
          .invoke("text")
          .should("eq", result[index]);

        cy.wrap(item)
          .find('div[class*="circle_circle"]')
          .invoke("attr", "class")
          .then((className) => {
            expect(className).to.match(/default/);
          });
      });
    cy.get('[data-testid="queue-elements"]')
      .children()
      .should("have.length", testLength);
  });
});
