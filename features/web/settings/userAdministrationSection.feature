@DEV-3799
Feature: Test the User Administration section

  As a logged-in fulfilld user
  I want to test the User Administration section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  @DEV-3800
  @severity:minor
  Scenario: Verify the visibility of elements in the user administration section.
    Given I open the settings section
    And I search for "User Administration" section
    Then I check the page header is "User Administration"
    And I check the page sub-header is "View and manage users."
    And I check the data table headers are displayed and are correct for user administration

  @DEV-3801
  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "user-admin" page
    Then I check the page header is "User Administration"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @DEV-3802
  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "user-admin" page
    Then I check the page header is "User Administration"
    When I click the page info back button
    Then I check the page header is "Settings"

  @DEV-3803
  @severity:normal
  Scenario: Verify that the "Add New User" modal closes when the user clicks the "Cancel" or "Close" button.
    Given I am on the "user-admin" page
    Then I check the page header is "User Administration"
    And I click add user button
    And I click the cancel button
    Then I verify the new user modal is closed
    And I click add user button
    And I click the close button
    Then I verify the new user modal is closed

  @DEV-3804
  @severity:normal
  Scenario: Verify that the required fields' error messages are displayed in the "Add New User" modal.
    Given I am on the "user-admin" page
    Then I check the page header is "User Administration"
    And I click add user button
    And I click the submit button
    Then I check the required error labels are displayed for user creation modal

  @DEV-3805
  @severity:minor
  Scenario: Verify that the "User Active" checkbox is checked by default for new users.
    And I am on the "user-admin" page
    Then I check the page header is "User Administration"
    And I click add user button
    Then I verify that the previously saved user info is displayed on the edit user form
      | userActive |
      | true       |

  @DEV-3806
  @severity:critical
  Scenario: Verify that the user can create a new User with a complete form and validate the data persistence in the Users table.
    Given I remove all test users
    Given I am on the "user-admin" page
    Then I check the page header is "User Administration"
    And I click add user button
    And I fill in the new user info
      | firstName | lastName | email                | phone      | userAssignmentGroups |
      | Walter    | White    | heisengberg@test.com | 8345984398 | Fulfilld Support     |
    And I click the submit button
    Then I check the snackbar message is "Successfully created new user: Walter White"
    When I filter by column: "Email" on the user administration section
    And I filter by text "heisengberg@test.com" on the user administration term filter and ensure that a record is displayed
    Then I verify that the previously saved user info is displayed on the table as follows
      | row | firstName | lastName | email                | phone      | userGroup        | userStatus |
      | 1   | Walter    | White    | heisengberg@test.com | 8345984398 | Fulfilld Support | Active     |
    And I remove all test users

  @DEV-3807
  @severity:critical
  Scenario: Verify that the user can create a new User with mandatory fields only and validate the data persistence in the Users table.
    Given I remove all test users
    Given I am on the "user-admin" page
    Then I check the page header is "User Administration"
    And I click add user button
    And I fill in the new user info
      | firstName | lastName | email                |
      | Walter    | White    | heisengberg@test.com |
    And I click the submit button
    Then I check the snackbar message is "Successfully created new user: Walter White"
    When I filter by column: "Email" on the user administration section
    And I filter by text "heisengberg@test.com" on the user administration term filter and ensure that a record is displayed
    Then I verify that the previously saved user info is displayed on the table as follows
      | row | firstName | lastName | email                | userStatus |
      | 1   | Walter    | White    | heisengberg@test.com | Active     |
    And I remove all test users

  @DEV-3808
  @severity:normal
  Scenario: Verify the persistence of data in the edit form after creation.
    Given I remove all test users
    And I am on the "user-admin" page
    Then I check the page header is "User Administration"
    And I click add user button
    And I fill in the new user info
      | firstName | lastName | email                | phone      | userAssignmentGroups |
      | Walter    | White    | heisengberg@test.com | 8345984398 | Fulfilld Support     |
    And I click the submit button
    When I filter by column: "Email" on the user administration section
    And I filter by text "heisengberg@test.com" on the user administration term filter and ensure that a record is displayed
    And I click the edit button
    Then I verify that the previously saved user info is displayed on the edit user form
      | firstName | lastName | email                | phone      | userAssignmentGroups | userActive |
      | Walter    | White    | heisengberg@test.com | 8345984398 | Fulfilld Support     | true       |
    And I remove all test users

  @DEV-3809
  @severity:critical
  Scenario:Verify that the user can edit a user and confirm the updated data in the users table.
    Given I remove all test users
    And I create a user thru grahpql endpoint
    And I am on the "user-admin" page
    Then I check the page header is "User Administration"
    When I filter by column: "Email" on the user administration section
    And I filter by text "heisengberg@test.com" on the user administration term filter and ensure that a record is displayed
    And I click the edit button
    And I fill in the new user info
      | firstName | lastName | phone      | userAssignmentGroups | userActive |
      | Daniel    | Larusso  | 4564356453 | WMS Operator         | false      |
    And I click the submit button
    Then I check the snackbar message is "Successfully updated user: Daniel Larusso"
    And I filter by text "heisengberg@test.com" on the user administration term filter and ensure that a record is displayed
    Then I verify that the previously saved user info is displayed on the table as follows
      | row | firstName | lastName | email                | phone      | userGroup    | userStatus |
      | 1   | Daniel    | Larusso  | heisengberg@test.com | 4564356453 | WMS Operator | Inactive   |
    And I remove all test users

  @DEV-3810
  @severity:normal
  Scenario: Verify that the user cannot create a user with a duplicate email during user creation.
    Given I remove all test users
    And I create a user thru grahpql endpoint
    And I am on the "user-admin" page
    Then I check the page header is "User Administration"
    And I click add user button
    And I fill in the new user info
      | firstName | lastName | email                |
      | Jesse     | Pinkman  | heisengberg@test.com |
    And I click the submit button
    Then I check the snackbar error message is "User email already exists"
    And I remove all test users

  @DEV-3811
  @severity:normal
  Scenario:Verify that the email address of an existing user cannot be edited.
    Given I remove all test users
    And I create a user thru grahpql endpoint
    And I am on the "user-admin" page
    Then I check the page header is "User Administration"
    When I filter by column: "Email" on the user administration section
    And I filter by text "heisengberg@test.com" on the user administration term filter and ensure that a record is displayed
    And I click the edit button
    Then I verify the user email field is disabled
    And I remove all test users
