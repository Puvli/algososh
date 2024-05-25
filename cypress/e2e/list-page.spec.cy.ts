import { ElementStates } from "../../src/types/element-states";

describe("Проверка доступности кнопок", () => {
  beforeEach(() => {
    cy.visit("/list");
  });

  it("Проверка доступности кнопок", () => {
    cy.get('[data-testid="addToHead"]').should("be.disabled");
    cy.get('[data-testid="addToTail"]').should("be.disabled");
    cy.get('[data-testid="addByIndex"]').should("be.disabled");
    cy.get('[data-testid="deleteByIndex"]').should("be.disabled");

    cy.get('[data-testid="valueInput"]').type("10");
    cy.get('[data-testid="indexInput"]').type("0");
    cy.get('[data-testid="addByIndex"]').should("not.be.disabled");
    cy.get('[data-testid="valueInput"]').clear();

    cy.get('[data-testid="valueInput"]').type("10");
    cy.get('[data-testid="addToHead"]').should("not.be.disabled");
    cy.get('[data-testid="addToTail"]').should("not.be.disabled");
  });

  it("Проверка корректности дефолтного списка", () => {
    cy.get('[data-testid="list-elements"').children().should("have.length", 4);
  });

  it("Проверка добавления элемента в head", () => {
    const testList = "HEAD";

    cy.get('[data-testid="valueInput"]').type(testList);
    cy.get('[data-testid="addToHead"]').click();

    cy.get('[data-testid="list-elements"]')
      .children()
      .first()
      .find('div[class*="circle_circle"]')
      .first()
      .invoke("text")
      .should("eq", testList);

    cy.get('[data-testid="list-elements"]')
      .children()
      .first()
      .find('div[class*="circle_circle"]')
      .first()
      .invoke("attr", "class")
      .then((className) => {
        expect(className).to.match(/changing/);
      });
    cy.wait(500);

    cy.get('[data-testid="list-elements"]')
      .children()
      .first()
      .find('div[class*="circle_circle"]')
      .invoke("text")
      .should("eq", testList);

    cy.wait(500);
    cy.get('[data-testid="list-elements"]')
      .children()
      .first()
      .find('div[class*="circle_circle"]')
      .invoke("attr", "class")
      .then((className) => {
        expect(className).to.match(/default/);
      });
  });

  it("Проверка добавления элемента в tail", () => {
    const testList = "T";

    cy.get('[data-testid="valueInput"]').type(testList);
    cy.get('[data-testid="addToTail"]').click();

    cy.get('[data-testid="list-elements"]')
      .children()
      .last()
      .find('div[class*="circle_circle"]')
      .first()
      .invoke("text")
      .should("eq", testList);

    cy.get('[data-testid="list-elements"]')
      .children()
      .last()
      .find('div[class*="circle_circle"]')
      .first()
      .invoke("attr", "class")
      .then((className) => {
        expect(className).to.match(/changing/);
      });
    cy.wait(500);

    cy.get('[data-testid="list-elements"]')
      .children()
      .last()
      .find('div[class*="circle_circle"]')
      .invoke("text")
      .should("eq", testList);

    cy.wait(500);
    cy.get('[data-testid="list-elements"]')
      .children()
      .last()
      .find('div[class*="circle_circle"]')
      .invoke("attr", "class")
      .then((className) => {
        expect(className).to.match(/default/);
      });
  });

  it("Проверка добавления элемента по индексу", () => {
    const testList = "AB";
    const testIndex = 1;

    cy.get('[data-testid="valueInput"]').type(testList);
    cy.get('[data-testid="indexInput"]').type(testIndex);
    cy.get('[data-testid="addByIndex"]').click();

    cy.get('[data-testid="list-elements"]')
      .children()
      .first()
      .find('div[class*="circle_circle"]')
      .first()
      .invoke("text")
      .should("eq", testList);

    cy.get('[data-testid="list-elements"]')
      .children()
      .first()
      .find('div[class*="circle_circle"]')
      .first()
      .invoke("attr", "class")
      .then((className) => {
        expect(className).to.match(/changing/);
      });
    cy.wait(1000);

    cy.get('[data-testid="list-elements"]')
      .children()
      .find('div[class*="circle_circle"]')
      .each((item, index) => {
        if (index === testIndex) {
          cy.wrap(item).invoke("text").should("eq", testList);
          cy.wrap(item)
            .invoke("attr", "class")
            .then((className) => {
              expect(className).to.match(/modified/);
            });
        }
      });
    cy.wait(500);

    cy.get('[data-testid="list-elements"]')
      .children()
      .find('div[class*="circle_circle"]')
      .each((item, index) => {
        if (index === testIndex) {
          cy.wrap(item).invoke("text").should("eq", testList);
          cy.wrap(item)
            .invoke("attr", "class")
            .then((className) => {
              expect(className).to.match(/default/);
            });
        }
      });
  });

  it("Проверка удаления элемента из head'a", () => {
    cy.get('[data-testid="deleteFromHead"]').click();

    cy.get('[data-testid="list-elements"]')
      .children()
      .first()
      .find('div[class*="circle_circle"]')
      .first()
      .invoke("text")
      .should("eq", "");

    cy.get('[data-testid="list-elements"]')
      .children()
      .first()
      .find('div[class*="circle_circle"]')
      .last()
      .invoke("attr", "class")
      .then((className) => {
        expect(className).to.match(/changing/);
      });
  });

  it("Проверка удаления элемента из tail'a", () => {
    cy.get('[data-testid="deleteFromTail"]').click();

    cy.get('[data-testid="list-elements"]')
      .children()
      .last()
      .find('div[class*="circle_circle"]')
      .first()
      .invoke("text")
      .should("eq", "");

    cy.get('[data-testid="list-elements"]')
      .children()
      .last()
      .find('div[class*="circle_circle"]')
      .last()
      .invoke("attr", "class")
      .then((className) => {
        expect(className).to.match(/changing/);
      });
  });

  it("Проверка удаления элемента по индексу", () => {
    const testIndex = 2;

    cy.get('[data-testid="indexInput"]').type(testIndex);
    cy.get('[data-testid="deleteByIndex"]').click();
    cy.wait(500);

    cy.get('[data-testid="list-elements"]')
      .children()
      .first()
      .find('div[class*="circle_circle"]')
      .first()
      .invoke("attr", "class")
      .then((className) => {
        expect(className).to.match(/changing/);
      });
    cy.wait(500);

    cy.get('[data-testid="list-elements"]')
      .children()
      .find('div[class*="circle_circle"]')
      .each((item, index) => {
        if (index === testIndex) {
          cy.wrap(item)
            .invoke("attr", "class")
            .then((className) => {
              expect(className).to.match(/default/);
            });
        }
      });

    cy.get('[data-testid="list-elements"]')
      .children()
      .find('div[class*="circle_circle"]')
      .each((item, index) => {
        if (index === testIndex) {
          cy.wrap(item).invoke("text").should("eq", "");
        } else if (index === testIndex + 1) {
          cy.wrap(item)
            .invoke("attr", "class")
            .then((className) => {
              expect(className).to.match(/changing/);
            });
        }
      });
  });
});
