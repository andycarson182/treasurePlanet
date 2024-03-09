Feature: Test the areas section

  As a logged-in fulfilld user
  I want to test the areas section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the "https://fd.fulfilld.qa/auth/support/login" page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  Scenario: Verify elements visibility for the areas section
    And I open the settings section
    And I search for "Areas" section
    Then I check the page header is "Areas"
    And I check the page sub-header is "View and manage warehouse areas."
    And I check the data table headers are displayed and are correct for areas

  Scenario: Verify if user clicks the sidebar logo is routed to the operantions page.
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/areas" page
    Then I check the page header is "Areas"
    When I click the sideBar fulfilld logo
    Then I verify the URL is "https://fd.fulfilld.qa/w/ab8d02d6/operations"

  Scenario: Verify if user clicks the page back button is routed to the settings page.
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/areas" page
    Then I check the page header is "Areas"
    When I click the page info back button
    Then I check the page header is "Settings"

  Scenario: Verify if the user clicks the cancel button the add new area modal is closed
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I click the cancel button
    Then I verify the new area modal is closed

  Scenario: Verify if the user clicks the close button the new area modal is closed
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I click the close button
    Then I verify the new area modal is closed

  Scenario: Verify the required fields error messages are displayed in the new area modal
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I click the submit button
    Then I check the required error labels are displayed for area creation modal

  @skip
  # https://fulfilld.atlassian.net/browse/DEV-2830
  Scenario: Verify the user is able to add a new area, and check the data in the area's table after creation
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I fill in the new area info
      | code               | name       | storageLocation | status   | targetTemperature | issueNewStock | receiveNewStock | description                                |
      | automationAreaCode | Automation | 1710: 171A      | Inactive | 40 °F             | enabled       | enabled         | This is a team created by automation suite |
    And I click the submit button
    And  I filter by "automationAreaCode" on areas term filter
    Then I check the saved area info is displayed on the table as follows
      | row | code               | name       | storageLocation | description                                | issueNewStock | issueNewStock | receiveNewStock | status  | targetTemperature |
      | 1   | automationAreaCode | Automation | 1710: 171A      | This is a team created by automation suite | Inactive      | Inactive      | 40 °F           | enabled | enabled           |

  @skip
  # https://fulfilld.atlassian.net/browse/DEV-2830
  Scenario: Verify the user is able to delete an area, and confirm it was deleted successfully
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/areas" page
    Then I check the page header is "Areas"
    And  I filter by "automationAreaCode" on areas term filter
    Then I check the saved area info is displayed on the table as follows
      | row | code               |
      | 1   | automationAreaCode |
    And I click edit area button
    And I click the delete button
    And  I filter by "automationAreaCode" on areas term filter
    Then I verify "no results" is displayed on the areas table



