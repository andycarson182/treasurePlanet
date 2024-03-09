Feature: Test the zones section

  As a logged-in fulfilld user
  I want to test the zones section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the "https://fd.fulfilld.qa/auth/support/login" page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"


  Scenario: Verify elements visibility for the zones section
    And I open the settings section
    And I search for "Zones" section
    Then I check the page header is "Zones"
    And I check the page sub-header is "View and manage warehouse zones."
    And I check the data table headers are displayed and are correct for zones

  Scenario: Verify if user clicks the sidebar logo is routed to the operantions page.
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/zones" page
    Then I check the page header is "Zones"
    When I click the sideBar fulfilld logo
    Then I verify the URL is "https://fd.fulfilld.qa/w/ab8d02d6/operations"

  Scenario: Verify if user clicks the page back button is routed to the settings page.
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/zones" page
    Then I check the page header is "Zones"
    When I click the page info back button
    Then I check the page header is "Settings"

  Scenario: Verify if the user clicks the cancel button the add new zones modal is closed
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I click the cancel button
    Then I verify the new zone modal is closed

  Scenario: Verify if the user clicks the close button the new zone modal is closed
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I click the close button
    Then I verify the new zone modal is closed

  @skip
  #https://fulfilld.atlassian.net/browse/DEV-2893
  Scenario: Verify the required fields error messages are displayed in the new add zone modal
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I click the submit button
    Then I check the required error labels are displayed for zone creation modal

  Scenario: Verify the user is able to add a new zone, and check the data in the zones's table after creation
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I fill in the new zone info
      | code               | name           | description                              | pickingUoMRestrictions |
      | automationZoneCode | AutomationZone | this is a zone added by automation suite | PAL                    |
    And I click the submit button
    And  I filter by "automationZoneCode" on zone term filter
    Then I check the saved zone info is displayed on the table as follows
      | row | code               | name           | description                              | warehouse                            | uoMRestriction |
      | 1   | automationZoneCode | AutomationZone | this is a zone added by automation suite | 6c56e47a-f7fb-4bbf-9d48-cdd249f857e1 | Pallet         |

  Scenario: Verify the user is able to delete a zone, and confirm it was deleted successfully
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/zones" page
    Then I check the page header is "Zones"
    And  I filter by "automationZoneCode" on zone term filter
    Then I check the saved zone info is displayed on the table as follows
      | row | code               |
      | 1   | automationZoneCode |
    And I click edit equipment button
    And I click the delete button
    And  I filter by "automationZoneCode" on zone term filter
    Then I verify "no results" is displayed on the zones table