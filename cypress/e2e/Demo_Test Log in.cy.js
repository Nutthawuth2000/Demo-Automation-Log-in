const Practice_login =
  "https://practicetestautomation.com/practice-test-login/";
const Username = "student";
const Password = "Password123";

describe("Demo_TestLogin", () => {
  it("Login Success - Happy Flows", () => {
    cy.visit(Practice_login);
    Login();
  });
  it("Logout Success - Happy Flow ", () => {
    cy.visit(Practice_login);
    Login();
    Logout();
  });
  it.only("Login Incorrect Username ", () => {
    cy.visit(Practice_login);
    Login_incorrect_username();
  });
  it.only("Login Incorrect Password ", () => {
    cy.visit(Practice_login);
    Login_incorrect_password();
  });
});

function Login() {
  cy.get("#username").type(Username).should("have.value", Username);
  cy.get("#password").type(Password).should("have.value", Password);
  cy.get("#submit").click();
  cy.location("pathname", { timeout: 10000 }).should(
    "include",
    "/logged-in-successfully/"
  );
  cy.get(".post-title").should("contain.text", "Logged In Successfully");
  cy.get("strong").should(
    "contain.text",
    "Congratulations student. You successfully logged in!"
  );
}
function Logout() {
  cy.get(".wp-block-button__link").should("contain.text", "Log out").click();
  cy.location("pathname", { timeout: 10000 }).should(
    "include",
    "/practice-test-login/"
  );
  cy.get("h2").should("contain.text", "Test login");
}

function Login_incorrect_username() {
  //Username invalid
  cy.get("#username")
    .type("incorrectUser")
    .should("have.value", "incorrectUser");
  cy.get("#password").type(Password).should("have.value", Password);
  cy.get("#submit").click();
  cy.get("#error").should("contain.text", "Your username is invalid!");
  cy.location("pathname", { timeout: 10000 }).should(
    "include",
    "/practice-test-login/"
  );
}

function Login_incorrect_password() {
  cy.get("#username").type(Username).should("have.value", Username);
  cy.get("#password")
    .type("incorrectPassword")
    .should("have.value", "incorrectPassword");
  cy.get("#submit").click();
  cy.get("#error").should("contain.text", "Your password is invalid!");
  cy.location("pathname", { timeout: 10000 }).should(
    "include",
    "/practice-test-login/"
  );
}
