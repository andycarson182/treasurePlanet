Feature: Test the Doors section

  As a logged-in fulfilld user
  I want to test the doors section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And I remove all test doors data

  @severity:minor
  Scenario: Verify elements visibility for the doors section
    Given I open the settings section
    And I search for "Doors" section
    Then I check the page header is "Doors"
    And I check the page sub-header is "View and manage your warehouse doors."
    And I check the data table headers are displayed and are correct for doors

  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    When I click the page info back button
    Then I check the page header is "Settings"

  @severity:normal
  Scenario: Verify if the user clicks the cancel or close button then the add new door modal is closed
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    And I click add new door button
    And I click the cancel button
    Then I verify the new door modal is closed
    And I click add new door button
    And I click the close button
    Then I verify the new door modal is closed

  @severity:normal
  Scenario: Verify the required fields error messages are displayed in the add new door modal
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    And I click add new door button
    And I click the submit button
    Then I check the required error labels are displayed for door creation modal

  @DEV-2941
  @severity:critical
  # Fill step needs to be refactored
  Scenario: [BUG]Verify the user is able to add a new door, and check the data in the door's table after creation
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    And I click add new door button
    And I fill in the new door info
      | code               | area                | bin             | direction | x | y |
      | automationDoorCode | AREA-FG-IB-STAGE-01 | IB-FG-STG-01-02 | Both      | 5 | 6 |
    And I click the submit button
    When I filter by column: "Code" on the doors section
    And I filter by text "automationDoorCode" on doors term filter
    Then I verify that the previously saved door info is displayed on the table as follows
      | row | code               | area                | bin             | direction | x | y |
      | 1   | automationDoorCode | AREA-FG-IB-STAGE-01 | IB-FG-STG-01-02 | both      | 5 | 6 |

  @severity:critical
  Scenario: Verify that the user can edit a Door and confirm the updated data in the Doors table.
    Given I remove all test doors data
    And I create a door thru grahpql endpoint
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    When I filter by column: "Code" on the doors section
    And I filter by text "AUTOMATION DOOR FOR EDIT" on the doors term filter and ensure that a record is displayed
    And I click the edit button
    #Code refactor for adding area and bin
    And I fill in the new door info
      | code                             | direction | x | y |
      | AUTOMATION DOOR FOR EDIT UPDATED | Inbound   | 5 | 6 |
    And I click the submit button
    Then I check the snackbar message is "Successfully updated door: AUTOMATION DOOR FOR EDIT UPDATED"
    When I filter by column: "Code" on the doors section
    And I filter by text "AUTOMATION DOOR FOR EDIT UPDATED" on the doors term filter and ensure that a record is displayed
    Then I verify that the previously saved door info is displayed on the table as follows
      | row | code                             | area        | bin         | direction | x | y |
      | 1   | AUTOMATION DOOR FOR EDIT UPDATED | DIRECT-LOAD | DIRECT-LOAD | Inbound   | 5 | 6 |
    And I remove all test areas

  @DEV-2943
  @severity:critical
  Scenario: Verify the user is able to delete a door, and confirm it was deleted successfully
    Given I remove all test doors data
    And I create a door thru grahpql endpoint
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    When I filter by column: "Code" on the doors section
    And I filter by text "AUTOMATION DOOR FOR EDIT" on the doors term filter and ensure that a record is displayed
    And I click the edit button
    And I click the delete button
    Then I check the snackbar message is "Successfully deleted door: AUTOMATION DOOR FOR EDIT"
    When I filter by column: "Code" on the doors section
    And  I filter by text "AUTOMATION DOOR FOR EDIT" on doors term filter
    Then I verify "no results" is displayed on the doors table
    And I remove all test doors data


