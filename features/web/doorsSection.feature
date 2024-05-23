Feature: Test the Doors section

  As a logged-in fulfilld user
  I want to test the doors section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  Scenario: Verify elements visibility for the doors section
    And I open the settings section
    And I search for "Doors" section
    Then I check the page header is "Doors"
    And I check the page sub-header is "View and manage your warehouse doors."
    And I check the data table headers are displayed and are correct for doors

  Scenario: Verify if user clicks the sidebar logo is routed to the operantions page.
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  Scenario: Verify if user clicks the page back button is routed to the settings page.
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    When I click the page info back button
    Then I check the page header is "Settings"

  Scenario: Verify if the user clicks the cancel button the add new door modal is closed
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    And I click add new door button
    And I click the cancel button
    Then I verify the new door modal is closed

  Scenario: Verify if the user clicks the close button the new door modal is closed
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    And I click add new door button
    And I click the close button
    Then I verify the new door modal is closed

  Scenario: Verify the required fields error messages are displayed in the add new door modal
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    And I click add new door button
    And I click the submit button
    Then I check the required error labels are displayed for door creation modal

  @DEV-2941
  # Fill step needs to be refactored
  Scenario: [BUG]Verify the user is able to add a new door, and check the data in the door's table after creation
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    And I click add new door button
    And I fill in the new door info
      | code               | area                | bin             | direction | x | y |
      | automationDoorCode | AREA-FG-IB-STAGE-01 | IB-FG-STG-01-02 | Both      | 5 | 6 |
    And I click the submit button
    And  I filter by "automationDoorCode" on doors term filter
    Then I check the saved door info is displayed on the table as follows
      | row | code               | area                | bin             | direction | x | y |
      | 1   | automationDoorCode | AREA-FG-IB-STAGE-01 | IB-FG-STG-01-02 | both      | 5 | 6 |

  @DEV-2943
  # Fill step needs to be refactored
  Scenario: [BUG]Verify the user is able to delete a door, and confirm it was deleted successfully
    Given I am on the "doors" page
    Then I check the page header is "Doors"
    And  I filter by "automationDoorCode" on doors term filter
    Then I check the saved door info is displayed on the table as follows
      | row | code               |
      | 1   | automationDoorCode |
    And I click edit door button
    And I click the delete button
    And  I filter by "automationDoorCode" on doors term filter
    Then I verify "no results" is displayed on the doors table
