Feature: Test the Equipment Model Configuration section

  As a logged-in fulfilld user
  I want to test the equipment model configuration section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And I remove all test equipment models data

  @severity:minor
  Scenario: Verify the visibility of elements in the Equipment Models section.
    Given I open the settings section
    And I search for "Equipment Model Configuration" section
    Then I check the page header is "Equipment Model Configuration"
    And I check the page sub-header is "View and manage warehouse equipment models."
    And I check the data table headers are displayed and are correct for equipment models

  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    When I click the page info back button
    Then I check the page header is "Settings"

  @severity:normal
  Scenario: Verify that the "Add New Equipment Model" modal closes when the user clicks the "Cancel" or "Close" button.
    Given I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    And I click add new model button
    And I click the cancel button
    Then I verify the new equipment model modal is closed
    And I click add new model button
    And I click the close button
    Then I verify the new equipment model modal is closed

  @severity:normal
  Scenario: Verify that the required fields' error messages are displayed in the "Add New Equipment Model" modal.
    Given I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    And I click add new model button
    And I click the submit button
    Then I check the required error labels are displayed for equipment models

  @DEV-2947
  @severity:critical
  Scenario:  Verify that the user can create a new Equipment Model with a complete form and validate the data persistence in the Equipment Models table.
    Given I remove all test equipment models data
    And I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    And I click add new model button
    And I fill in the new equipment model info
      | equipmentType | code                         | label                            | description                                         |
      | FL02          | automationEquipmentModelCode | Automation equipment model label | This is a equipment model added by automation suite |
    And I click the submit button
    Then I check the snackbar message is "Successfully added new equipment model: Automation equipment model label"
    When I filter by column: "Code" on the equipment models section
    And I filter by text "automationEquipmentModelCode" on the equipment model term filter and ensure that a record is displayed
    Then I verify that the previously saved equipment models info is displayed on the table as follows
      | row | equipmentType | code                         | label                            | description                                         |
      | 1   | FL02          | automationEquipmentModelCode | Automation equipment model label | This is a equipment model added by automation suite |
    And I remove all test equipment models data

  @severity:critical
  Scenario: Verify that the user can create a new Equipment Model with mandatory fields only and validate the data persistence in the Equipment Models table.
    Given I remove all test equipment models data
    And I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    And I click add new model button
    And I fill in the new equipment model info
      | equipmentType | code                         | label                            |
      | FL02          | automationEquipmentModelCode | Automation equipment model label |
    And I click the submit button
    Then I check the snackbar message is "Successfully added new equipment model: Automation equipment model label"
    When I filter by column: "Code" on the equipment models section
    And I filter by text "automationEquipmentModelCode" on the equipment model term filter and ensure that a record is displayed
    Then I verify that the previously saved equipment models info is displayed on the table as follows
      | row | equipmentType | code                         | label                            |
      | 1   | FL02          | automationEquipmentModelCode | Automation equipment model label |
    And I remove all test equipment models data

  @severity:normal
  Scenario: Verify the persistence of data in the edit form after creation.
    Given I remove all test equipment models data
    And I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    And I click add new model button
    And I fill in the new equipment model info
      | equipmentType | code                         | label                            | description                                         |
      | FL02          | automationEquipmentModelCode | Automation equipment model label | This is a equipment model added by automation suite |
    And I click the submit button
    When I filter by column: "Code" on the equipment models section
    And I filter by text "automationEquipmentModelCode" on the equipment model term filter and ensure that a record is displayed
    And I click the edit button
    Then I verify that the previously saved equipment model info is displayed on the edit equipment model form
      | equipmentType | code                         | label                            | description                                         |
      | FL02          | automationEquipmentModelCode | Automation equipment model label | This is a equipment model added by automation suite |
    And I remove all test equipment models data

  @DEV-2948
  @severity:critical
  Scenario: Verify the user is able to edit a equipment model, and check the data in the equipment models's table after updates
    Given I remove all test equipment models data
    And I create an equipment model thru grahpql endpoint
    And I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    When I filter by column: "Code" on the equipment models section
    And I filter by text "AUTOMATION EQUIPMENT MODEL FOR EDIT" on the equipment model term filter and ensure that a record is displayed
    And I click the edit button
    And I fill in the new equipment model info
      | equipmentType | code                                    | label                                    | description                                               |
      | MPC01         | Automation Equipment Model Code Updated | Automation equipment model label updated | This is an edited equipment model by automation test case |
    And I click the submit button
    Then I check the snackbar message is "Successfully updated equipment model: Automation equipment model label updated"
    When I filter by column: "Code" on the equipment models section
    And  I filter by text "Automation Equipment Model Code Updated" on equipment model term filter
    Then I verify that the previously saved equipment models info is displayed on the table as follows
      | row | equipmentType | code                                    | label                                    | description                                               |
      | 1   | MPC01         | AUTOMATION EQUIPMENT MODEL CODE UPDATED | Automation equipment model label updated | This is an edited equipment model by automation test case |
    And I remove all test equipment models data

  @DEV-2949
  Scenario: Verify the user is able to delete a equipment model, and confirm it was deleted successfully
    Given I remove all test equipment models data
    And I create an equipment model thru grahpql endpoint
    And I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    When I filter by column: "Code" on the equipment models section
    And I filter by text "AUTOMATION EQUIPMENT MODEL FOR EDIT" on the equipment model term filter and ensure that a record is displayed
    And I click the edit button
    And I click the delete button
    Then I check the snackbar message is "Successfully deleted equipment model: Automation equipment model label"
    When I filter by column: "Code" on the equipment models section
    And  I filter by text "automationEquipmentModelCodeUpdated" on equipment model term filter
    Then I verify "no results" is displayed on the equipment models table
    And I create an equipment model thru grahpql endpoint

  @severity:critical
  Scenario: Verify that the user is not able to duplicate an equipment model code during equipment model creation.
    Given I remove all test equipment models data
    And I create an equipment model thru grahpql endpoint
    And I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    And I click add new model button
    And I fill in the new equipment model info
      | equipmentType | code                                | label                                    |
      | FL02          | AUTOMATION EQUIPMENT MODEL FOR EDIT | Automation equipment model label updated |
    And I click the submit button
    Then I check the snackbar error message is "EquipmentModel not unique by code"

  @severity:critical
  Scenario: Verify that the user is not able to duplicate an equipment label during equipment creation.
    Given I remove all test equipment models data
    And I create an equipment model thru grahpql endpoint
    And I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    And I click add new model button
    And I fill in the new equipment model info
      | equipmentType | code                                    | label                            |
      | FL02          | AUTOMATION EQUIPMENT MODEL CODE UPDATED | Automation equipment model label |
    And I click the submit button
    Then I check the snackbar error message is "EquipmentModel not unique by label"