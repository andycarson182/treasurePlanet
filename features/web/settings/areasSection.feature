@DEV-3664
Feature: Test the Areas section

  As a logged-in fulfilld user
  I want to test the areas section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And  I remove all test areas

  @DEV-3665
  @severity:minor
  Scenario: Verify the visibility of elements in the Areas section.
    Given I open the settings section
    And I search for "Areas" section
    Then I check the page header is "Areas"
    And I check the page sub-header is "View and manage warehouse areas."
    And I check the data table headers are displayed and are correct for areas

  @DEV-3666
  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "areas" page
    Then I check the page header is "Areas"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @DEV-3667
  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "areas" page
    Then I check the page header is "Areas"
    When I click the page info back button
    Then I check the page header is "Settings"

  @DEV-3668
  @severity:normal
  Scenario: Verify that the "Add New Area" modal closes when the user clicks the "Cancel" or "Close" button.
    Given I am on the "areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I click the cancel button
    Then I verify the new area modal is closed
    And I click add new area button
    And I click the close button
    Then I verify the new area modal is closed

  @DEV-3669
  @severity:normal
  Scenario: Verify that the edit area modal closes when the user clicks the "Cancel" or "Close" button.
    Given I remove all test areas
    And I create an area thru grahpql endpoint with the area code: "AUTOMATION AREA FOR EDIT"
    And I am on the "areas" page
    Then I check the page header is "Areas"
    When I filter by column: "Code" on the areas section
    And I filter by text "AUTOMATION AREA FOR EDIT" on the areas term filter and ensure that a record is displayed
    Then I verify that the previously saved area info is displayed on the table as follows
      | row | code                     |
      | 1   | AUTOMATION AREA FOR EDIT |
    And I click the edit button
    And I click the cancel button
    Then I verify the edit area modal is closed
    And I click the edit button
    And I click the close button
    Then I verify the edit area modal is closed
    And I remove all test areas

  @DEV-3670
  @severity:normal
  Scenario: Verify that the required fields' error messages are displayed in the "Add New Area" modal.
    Given I am on the "areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I click the submit button
    Then I check the required error labels are displayed for area creation modal

  @DEV-2932
  @severity:critical
  Scenario: Verify that the user can create a new Area with a complete form and validate the data persistence in the Areas table.
    Given I remove all test areas
    And I am on the "areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I fill in the new area info
      | code               | name            | status   | targetTemperature | description                                 |
      | automationAreaCode | Automation Area | Inactive | 40                | This is an area created by automation suite |
    And I click the submit button
    Then I check the snackbar message is "Successfully created area: Automation Area"
    When I filter by column: "Code" on the areas section
    And I filter by text "automationAreaCode" on the areas term filter and ensure that a record is displayed
    Then I verify that the previously saved area info is displayed on the table as follows
      | row | code               | name            | description                                 | issueNewStock | receiveNewStock | status   | targetTemperature |
      | 1   | automationAreaCode | Automation Area | This is an area created by automation suite | False         | False           | Inactive | 40 °F             |
    And I remove all test areas

  @DEV-3671
  @severity:critical
  Scenario: Verify that the user can create a new Area with mandatory fields only and validate the data persistence in the Areas table.
    Given I remove all test areas
    And I am on the "areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I fill in the new area info
      | code               | name            | status   |
      | automationAreaCode | Automation Area | Inactive |
    And I click the submit button
    Then I check the snackbar message is "Successfully created area: Automation Area"
    When I filter by column: "Code" on the areas section
    And I filter by text "automationAreaCode" on the areas term filter and ensure that a record is displayed
    Then I verify that the previously saved area info is displayed on the table as follows
      | row | code               | name            | description | status   | issueNewStock | receiveNewStock | targetTemperature |
      | 1   | automationAreaCode | Automation Area |             | Inactive | False         | False           |                   |
    And I remove all test areas

  @DEV-3672
  @severity:normal
  Scenario: Verify the persistence of data in the edit form after creation.
    Given I remove all test areas
    And I am on the "areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I fill in the new area info
      | code               | name            | status   | targetTemperature | issueNewStock | description                                 |
      | automationAreaCode | Automation Area | Inactive | 40                | true          | This is an area created by automation suite |
    And I click the submit button
    When I filter by column: "Code" on the areas section
    And I filter by text "automationAreaCode" on the areas term filter and ensure that a record is displayed
    And I click the edit button
    Then I verify that the previously saved area info is displayed on the edit area form
      | code               | name            | description                                 | issueNewStock | receiveNewStock | status   | targetTemperature |
      | automationAreaCode | Automation Area | This is an area created by automation suite | true          | false           | inactive | 40                |
    And I remove all test areas

  @DEV-2933
  @severity:critical
  Scenario: Verify that the user can edit an Area and confirm the updated data in the Areas table.
    Given I remove all test areas
    And I create an area thru grahpql endpoint with the area code: "AUTOMATION AREA FOR EDIT"
    And I am on the "areas" page
    Then I check the page header is "Areas"
    When I filter by column: "Code" on the areas section
    And I filter by text "AUTOMATION AREA FOR EDIT" on the areas term filter and ensure that a record is displayed
    And I click the edit button
    And I fill in the new area info
      | code                      | name    | status | targetTemperature | issueNewStock | receiveNewStock | description                                 |
      | automationAreaCodeUpdated | Area 51 | Active | 20                | true          | true            | This is an area updated by automation suite |
    And I click the submit button
    Then I check the snackbar message is "Successfully updated area: Area 51"
    When I filter by column: "Code" on the areas section
    And I filter by text "automationAreaCodeUpdated" on the areas term filter and ensure that a record is displayed
    Then I verify that the previously saved area info is displayed on the table as follows
      | row | code                      | name    | description                                 | issueNewStock | receiveNewStock | status | targetTemperature |
      | 1   | automationAreaCodeUpdated | Area 51 | This is an area updated by automation suite | True          | True            | Active | 20 °F             |
    And I remove all test areas

  @DEV-2934
  @severity:critical
  #https://fulfilld.atlassian.net/browse/DEV-4135
  Scenario: [BUG:DEV-4135]Verify the user is able to delete an area, and confirm it was deleted successfully
    Given I remove all test areas
    And I create an area thru grahpql endpoint with the area code: "AUTOMATION AREA FOR EDIT"
    And I am on the "areas" page
    When I filter by column: "Code" on the areas section
    And I filter by text "AUTOMATION AREA FOR EDIT" on the areas term filter and ensure that a record is displayed
    And I click the edit button
    And I click the delete button
    Then I check the snackbar message is "Successfully deleted area: Automation Area"
    When I filter by column: "Code" on the areas section
    And  I filter by text "automationAreaCode" on areas term filter
    Then I verify "no results" is displayed on the areas table

  @DEV-3681
  @severity:normal
  Scenario: Verify that the user cannot create an area with a duplicate area code during area creation.
    Given I remove all test areas
    And I create an area thru grahpql endpoint with the area code: "AUTOMATION AREA FOR EDIT"
    Given I am on the "areas" page
    Then I check the page header is "Areas"
    And I click add new area button
    And I fill in the new area info
      | code                     | name            | status   |
      | AUTOMATION AREA FOR EDIT | Automation Area | Inactive |
    And I click the submit button
    #Consider a better snackbar error message like "Area not unique by code,warehouseId"
    Then I check the snackbar error message is "An entity already exists with these parameters"
    And I remove all test areas