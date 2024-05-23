Feature: Test the Zones section

  As a logged-in fulfilld user
  I want to test the zones section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And I remove all test zones

  Scenario: Verify elements visibility for the zones section
    And I open the settings section
    And I search for "Zones" section
    Then I check the page header is "Zones"
    And I check the page sub-header is "View and manage warehouse zones."
    And I check the data table headers are displayed and are correct for zones

  Scenario: Verify if user clicks the sidebar logo is routed to the operantions page.
    Given I am on the "zones" page
    Then I check the page header is "Zones"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  Scenario: Verify if user clicks the page back button is routed to the settings page.
    Given I am on the "zones" page
    Then I check the page header is "Zones"
    When I click the page info back button
    Then I check the page header is "Settings"

  Scenario: Verify if the user clicks the cancel button then the add new zone modal is closed
    Given I am on the "zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I click the cancel button
    Then I verify the new zone modal is closed

  Scenario: Verify if the user clicks the close button then the new zone modal is closed
    Given I am on the "zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I click the close button
    Then I verify the new zone modal is closed

  Scenario: Verify the required fields error messages are displayed in the new add zone modal
    Given I am on the "zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I click the submit button
    Then I check the required error labels are displayed for zone creation modal

  @DEV-2953
  Scenario: Verify the user is able to add a new zone, and check the data in the zones's table after creation
    Given I am on the "zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I fill in the new zone info
      | code               | name            | description                              | pickingUoMRestrictions |
      | automationZoneCode | Automation Zone | This is a zone created by automation suite | PAL                    |
    And I click the submit button
    Then I check the snackbar message is "Successfully created zone: Automation Zone"
    And  I filter by "automationZoneCode" on zone term filter
    Then I check the saved zone info is displayed on the table as follows
      | row | code               | name            | description                              | uoMRestriction | uoMRestriction |
      | 1   | automationZoneCode | Automation Zone | This is a zone created by automation suite | Bowling Green  | Pallet         |
    And I remove all test zones

  @DEV-2954
  #[BUG]https://fulfilld.atlassian.net/browse/DEV-3499
  Scenario: [BUG]Verify the user is able to edit a zone, and check the data in the zones's table after updates
    Given  I create a zone thru grahpql endpoint
    And  I am on the "zones" page
    Then I check the page header is "Zones"
    And  I filter by "AUTOMATION ZONE FOR EDIT" on zone term filter
    Then I check the saved zone info is displayed on the table as follows
      | row | code                     |
      | 1   | AUTOMATION ZONE FOR EDIT |
    And I click edit equipment button
    And I fill in the new zone info
      | code                      | name                    | description                                    | pickingUoMRestrictions |
      | automationZoneCodeUpdated | Automation Zone Updated | This is an edited zone by automation test case | Mile                   |
    And I click the submit button
    # https://fulfilld.atlassian.net/browse/DEV-3435
    # Then I check the snackbar message is "Successfully updated zone: Automation Zone"
    And  I filter by "AUTOMATION ZONE CODE UPDATED" on zone term filter
    Then I check the saved zone info is displayed on the table as follows
      | row | code                      | name                    | description                                    | warehouse     | uoMRestriction |
      | 1   | automationZoneCodeUpdated | Automation Zone Updated | This is an edited zone by automation test case | Bowling Green | Mile           |
    And I remove all test zones

  @DEV-2955
  Scenario: Verify the user is able to delete a zone, and confirm it was deleted successfully
    Given  I create a zone thru grahpql endpoint
    And I am on the "zones" page
    Then I check the page header is "Zones"
    And  I filter by "AUTOMATION ZONE FOR EDIT" on zone term filter
    Then I check the saved zone info is displayed on the table as follows
      | row | code                     |
      | 1   | AUTOMATION ZONE FOR EDIT |
    And I click edit equipment button
    And I click the delete button
    Then I check the snackbar message is "Successfully deleted zone: Automation Zone"
    And  I filter by "Automation Zone" on zone term filter
    Then I verify "no results" is displayed on the zones table
    And I remove all test zones