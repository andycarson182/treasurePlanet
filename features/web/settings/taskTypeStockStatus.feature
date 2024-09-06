@DEV-3831
Feature: Test the Task Type Stock Status section

  As a logged-in fulfilld user
  I want to test the Task Type Stock Status section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  @DEV-3832
  @severity:minor
  Scenario: Verify the visibility of elements in the  Task Type Stock Status section.
    Given I open the settings section
    And I search for "Task Types allowed for Stock Status" section
    Then I check the page header is "Task Types allowed for Stock Status"
    And I check the page sub-header is "View and manage which Task Types can be created and completed for each Stock Status."
    # And I check the data table headers are displayed and are correct for task type stock status needs to figure it out it columns came from a data file

  @DEV-3833
  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "task-type-stock-status" page
    Then I check the page header is "Task Types allowed for Stock Status"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @DEV-3834
  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "task-type-stock-status" page
    Then I check the page header is "Task Types allowed for Stock Status"
    When I click the page info back button
    Then I check the page header is "Settings"

  @DEV-3835
  @severity:normal
#  https://fulfilld.atlassian.net/browse/DEV-4300
  Scenario: [BUG:DEV-4300]Verify the search term functionality
    Given I am on the "task-type-stock-status" page
    Then I check the page header is "Task Types allowed for Stock Status"
    When I filter by column: "Code" on the task type stock status section
    Then I filter by text "TSK-03" on the task type stock status term filter and ensure that a record is displayed