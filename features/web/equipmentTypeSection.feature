Feature: Test the Equipment Types section

  As a logged-in fulfilld user
  I want to test the equipment types section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  Scenario: Verify elements visibility for the equipment types section
    And I open the settings section
    And I search for "Equipment Type" section
    Then I check the page header is "Equipment Type"
    And I check the page sub-header is "View and manage your assignable equipment types."
    And I check the data table headers are displayed and are correct for equipment types

  Scenario: Verify if user clicks the sidebar logo is routed to the operantions page.
    Given I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "https://fd.fulfilld.qa/w/ab8d02d6/operations"

  Scenario: Verify if user clicks the page back button is routed to the settings page.
    Given I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    When I click the page info back button
    Then I check the page header is "Settings"

  Scenario: Verify if the user clicks the cancel button then the add new equipment type modal is closed
    Given I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    And I click add new type button
    And I click the cancel button
    Then I verify the new equipment type modal is closed

  Scenario: Verify if the user clicks the close button then the new equipment type modal is closed
    Given I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    And I click add new type button
    And I click the close button
    Then I verify the new equipment type modal is closed

  #BUG:https://fulfilld.atlassian.net/browse/DEV-3298
  Scenario: [BUG]Verify the required fields error messages are displayed in the new add equipment type modal
    Given I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    And I click add new type button
    And I click the submit button
    Then I check the required error labels are displayed for equipment types

  @DEV-2944
  #BUG:https://fulfilld.atlassian.net/browse/DEV-3299
  Scenario: [BUG]Verify the user is able to add a new equipment type, and check the data in the equipment types's table after creation
    Given I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    And I click add new type button
    And I fill in the new equipment type info
      | code                        | label            | description                                        | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | heightMinimum | volumeLimit | volumeUoM | speed | speedUoM | verticalSpeed |
      | automationEquipmentTypeCode | Automation label | this is a equipment type added by automation suite | Dynamic  | 12          | 2           | TON       | 50          | FT        | 2             | 10          | GAL       | 2     | ft/s     | 2             |
    And I click the submit button
    Then I check the snackbar message is "Successfully added new equipment type: Automation label"
    And  I filter by "automationEquipmentTypeCode" on equipment type term filter
    Then I check the saved equipment types info is displayed on the table as follows
      | row | code                        | label            | description                                        | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | volumeLimit | volumeUoM | speed | speedUoM | verticalSpeed | currencyUoM |
      | 1   | automationEquipmentTypeCode | Automation label | this is a equipment type added by automation suite | Dynamic  | 12          | 2           | TON       | 50          | FT        | 10          | GAL       | 2     | ft/s     | 2             | USD         |

  @DEV-2945
  #BUG:https://fulfilld.atlassian.net/browse/DEV-3299
  Scenario: [BUG]Verify the user is able to edit a equipment type, and check the data in the equipment types's table after updates
    Given I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    And  I filter by "automationEquipmentTypeCode" on equipment type term filter
    Then I check the saved equipment types info is displayed on the table as follows
      | row | code                        |
      | 1   | automationEquipmentTypeCode |
    And I click edit equipment type button
    And I fill in the new equipment type info
      | code                               | label                    | description                                              | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | heightMinimum | volumeLimit | volumeUoM | speed | speedUoM | verticalSpeed |
      | automationEquipmentTypeCodeUpdated | Automation label updated | This is an edited equipment type by automation test case | Static   | 10          | 1           | LB        | 40          | YD        | 1             | 5           | CF        | 5     | ft/min   | 5             |
    And I click the submit button
    Then I check the snackbar message is "Successfully updated equipment type: Automation label updated"
    And  I filter by "automationEquipmentTypeCodeUpdated" on equipment type term filter
    Then I check the saved equipment types info is displayed on the table as follows
      | row | code                               | label                    | description                                              | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | volumeLimit | volumeUoM | speed | speedUoM | verticalSpeed | currencyUoM |
      | 1   | automationEquipmentTypeCodeUpdated | Automation label updated | This is an edited equipment type by automation test case | Static   | 10          | 1           | LB        | 40          | YD        | 5           | CF        | 5     | ft/min   | 5             | USD         |

  @DEV-2946
  #BUG:https://fulfilld.atlassian.net/browse/DEV-3299
  Scenario: [BUG]Verify the user is able to delete a equipment type, and confirm it was deleted successfully
    Given I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    And  I filter by " automationEquipmentTypeCodeUpdated" on equipment type term filter
    Then I check the saved equipment types info is displayed on the table as follows
      | row | code                               |
      | 1   | automationEquipmentTypeCodeUpdated |
    And I click edit equipment type button
    And I click the delete button
    Then I check the snackbar message is "Successfully deleted equipment type: Automation label updated"
    And  I filter by "automationEquipmentTypeCodeUpdated" on equipment type term filter
    Then I verify "no results" is displayed on the equipment types table