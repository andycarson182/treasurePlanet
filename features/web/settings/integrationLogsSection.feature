Feature: Test the Integration Logs section

  As a logged-in fulfilld user
  I want to test the Integration Logs section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  @severity:minor
  Scenario: Verify elements visibility for the integration logs section
    Given I open the settings section
    And I search for "Integration Logs" section
    Then I check the page header is "Integration Logs"
    And I check the page sub-header is "View the logs from all of the integrations within this warehouse."
    And I check the data table headers are displayed and are correct for integration logs

  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "integration-logs" page
    Then I check the page header is "Integration Logs"
    When I click the page info back button
    Then I check the page header is "Settings"