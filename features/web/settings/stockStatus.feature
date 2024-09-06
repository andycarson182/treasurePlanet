@DEV-3825
Feature: Test the Stock Status section

  As a logged-in fulfilld user
  I want to test the Stock Status section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  @DEV-3826
  @severity:minor
  Scenario:Verify the visibility of elements in the Stock Status section.
    Given I open the settings section
    And I search for "Stock Status" section
    Then I check the page header is "Stock Status - Stock Type and HU User Status"
    And I check the page sub-header is "View and manage your Fulfilld Stock Status."
    And I check the data table headers are displayed and are correct for stock status

  @DEV--3827
  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "stock-status" page
    Then I check the page header is "Stock Status - Stock Type and HU User Status"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @DEV-3828
  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "stock-status" page
    Then I check the page header is "Stock Status - Stock Type and HU User Status"
    When I click the page info back button
    Then I check the page header is "Settings"

  @DEV-3829
  @severity:normal
  Scenario: Verify the search term functionality
    Given I am on the "stock-status" page
    Then I check the page header is "Stock Status - Stock Type and HU User Status"
    When I filter by column: "Code" on the stock status section
    Then I filter by text "04" on the stock status term filter and ensure that a record is displayed

  @DEV-3830
  @severity:minor
  Scenario: Verify that the user is routed to the task type stock status page when they click the view task mapping button.
    Given I am on the "stock-status" page
    Then I check the page header is "Stock Status - Stock Type and HU User Status"
    And I click the view task mapping button
    Then I check the page header is "Task Types allowed for Stock Status"

