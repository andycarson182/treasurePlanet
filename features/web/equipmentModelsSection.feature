Feature: Test the Equipment Model Configuration section

  As a logged-in fulfilld user
  I want to test the equipment model configuration section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  Scenario: Verify elements visibility for the equipment models section
    And I open the settings section
    And I search for "Equipment Model Configuration" section
    Then I check the page header is "Equipment Model Configuration"
    And I check the page sub-header is "View and manage warehouse equipment models."
    And I check the data table headers are displayed and are correct for equipment models

  Scenario: Verify if user clicks the sidebar logo is routed to the operantions page.
    Given I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  Scenario: Verify if user clicks the page back button is routed to the settings page.
    Given I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    When I click the page info back button
    Then I check the page header is "Settings"

  Scenario: Verify if the user clicks the cancel button then the add new equipment model modal is closed
    Given I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    And I click add new model button
    And I click the cancel button
    Then I verify the new equipment model modal is closed

  Scenario: Verify if the user clicks the close button then the new equipment model modal is closed
    Given I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    And I click add new model button
    And I click the close button
    Then I verify the new equipment model modal is closed

  Scenario: Verify the required fields error messages are displayed in the new add equipment models modal
    Given I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    And I click add new model button
    And I click the submit button
    Then I check the required error labels are displayed for equipment models

  @DEV-2947
  #[BUG]https://fulfilld.atlassian.net/browse/DEV-3306
  Scenario: [BUG]Verify the user is able to add a new equipment model, and check the data in the equipment models's table after creation
    Given I am on the "equipment/models" page
    Then I check the page header is "Equipment Model Configuration"
    And I click add new model button
    And I fill in the new equipment model info
      | equipmentType | code                         | label            | description                                         |
      | EPL01         | automationEquipmentModelCode | Automation label | This is a equipment model added by automation suite |
    And I click the submit button
    Then I check the snackbar message is "Successfully added new equipment model: Automation label"
    And  I filter by "automationEquipmentModelCode" on equipment model term filter
    Then I check the saved equipment models info is displayed on the table as follows
      | row | equipmentType | code                         | label            | description                                         |
      | 1   | EPL01         | automationEquipmentModelCode | Automation label | This is a equipment model added by automation suite |

@DEV-2948
#https://fulfilld.atlassian.net/browse/DEV-3306
Scenario: [BUG]Verify the user is able to edit a equipment model, and check the data in the equipment models's table after updates
  Given I am on the "equipment/models" page
  Then I check the page header is "Equipment Model Configuration"
  And  I filter by "automationEquipmentModelCode" on equipment model term filter
  Then I check the saved equipment models info is displayed on the table as follows
    | row | code                         |
    | 1   | automationEquipmentModelCode |
  And I click edit equipment model button
  And I fill in the new equipment model info
    | equipmentType         | code                                | label                     | description                                               |
    | Automation equipment4 | automationEquipmentModelCodeUpdated | Automation label updated | This is an edited equipment model by automation test case |
  And I click the submit button
  Then I check the snackbar message is "Successfully updated equipment model: Automation label updated"
  And  I filter by "automationEquipmentModelCodeUpdated" on equipment model term filter
  Then I check the saved equipment models info is displayed on the table as follows
    | row | equipmentType         | code                                | label                     | description                                               |
    | 1   | Automation equipment4 | automationEquipmentModelCodeUpdated | Automation label updated | This is an edited equipment model by automation test case |

@DEV-2949
#https://fulfilld.atlassian.net/browse/DEV-3306
Scenario: [BUG]Verify the user is able to delete a equipment model, and confirm it was deleted successfully
  Given I am on the "equipment/models" page
  Then I check the page header is "Equipment Model Configuration"
  And  I filter by " automationEquipmentModelCodeUpdated" on equipment model term filter
  Then I check the saved equipment models info is displayed on the table as follows
    | row | code                                |
    | 1   | automationEquipmentModelCodeUpdated |
  And I click edit equipment model button
  And I click the delete button
  Then I check the snackbar message is "Successfully deleted equipment model: Automation label updated"
  And  I filter by "automationEquipmentModelCodeUpdated" on equipment model term filter
  Then I verify "no results" is displayed on the equipment models table