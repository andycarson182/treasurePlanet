Feature: Test the Areas section

  As a logged-in fulfilld user
  I want to test the areas section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And  I remove all test areas

  Scenario: Verify elements visibility for the areas section
    And I open the settings section
    And I search for "Areas" section
    Then I check the page header is "Areas"
    And I check the page sub-header is "View and manage warehouse areas."
    And I check the data table headers are displayed and are correct for areas

  Scenario: Verify if user clicks the sidebar logo is routed to the operantions page.
    Given I am on the "areas" page
    Then I check the page header is "Areas"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  Scenario: Verify if user clicks the page back button is routed to the settings page.
    Given I am on the "areas" page
    Then I check the page header is "Areas"
    When I click the page info back button
    Then I check the page header is "Settings"

  Scenario: Verify if the user clicks the cancel button then the add new area modal is closed
    Given I am on the "areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I click the cancel button
    Then I verify the new area modal is closed

  Scenario: Verify if the user clicks the close button then the new area modal is closed
    Given I am on the "areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I click the close button
    Then I verify the new area modal is closed

  Scenario: Verify the required fields error messages are displayed in the new area modal
    Given I am on the "areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I click the submit button
    Then I check the required error labels are displayed for area creation modal

  @DEV-2932
  Scenario: Verify the user is able to add a new area, and check the data in the area's table after creation
    Given I am on the "areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I fill in the new area info
      | code               | name            | status   | targetTemperature | description                                 |
      | automationAreaCode | Automation Area | Inactive | 40                | This is an area created by automation suite |
    And I click the submit button
    Then I check the snackbar message is "Successfully created area: Automation Area"
    And  I filter by "automationAreaCode" on areas term filter
    Then I check the saved area info is displayed on the table as follows
      | row | code               | name            | description                                 | issueNewStock | receiveNewStock | targetTemperature |
      | 1   | automationAreaCode | Automation Area | This is an area created by automation suite | False         | False           | 40 °F             |
    And I remove all test areas

  @DEV-2933
  Scenario: Verify the user is able to edit an area, and check the data in the area's table after updates
    Given I create an area thru grahpql endpoint
    And I am on the "areas" page
    Then I check the page header is "Areas"
    And  I filter by "AUTOMATION AREA FOR EDIT" on areas term filter
    Then I check the saved bin info is displayed on the table as follows
      | row | code                     |
      | 1   | AUTOMATION AREA FOR EDIT |
    And I click edit bin button
    And I fill in the new area info
      | code                      | name    | status | targetTemperature | issueNewStock | receiveNewStock | description                                 |
      | automationAreaCodeUpdated | Area 51 | Active | 20                | True          | True            | This is an area updated by automation suite |
    And I click the submit button
    Then I check the snackbar message is "Successfully updated area: Area 51"
    And  I filter by "automationAreaCodeUpdated" on areas term filter
    Then I check the saved area info is displayed on the table as follows
      | row | code                      | name    | description                                 | issueNewStock | receiveNewStock | targetTemperature |
      | 1   | automationAreaCodeUpdated | Area 51 | This is an area updated by automation suite | True          | True            | 20 °F             |
    And I remove all test areas

@DEV-2934
Scenario: Verify the user is able to delete an area, and confirm it was deleted successfully
  Given I create an area thru grahpql endpoint
  And I am on the "areas" page
  And  I filter by "AUTOMATION AREA FOR EDIT" on areas term filter
  Then I check the saved bin info is displayed on the table as follows
    | row | code                     |
    | 1   | AUTOMATION AREA FOR EDIT |
  And I click edit area button
  And I click the delete button
  Then I check the snackbar message is "Successfully deleted area: Automation Area"
  And  I filter by "automationAreaCode" on areas term filter
  Then I verify "no results" is displayed on the areas table