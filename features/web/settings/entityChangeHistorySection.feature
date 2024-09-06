Feature: Test the Entity Change History section

  As a logged-in fulfilld user
  I want to test the Entity Change History section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  @severity:minor
  Scenario: Verify elements visibility for the entity Change History section
    Given I open the settings section
    And I search for "Entity Change History" section
    Then I check the page header is "Entity Change History"
    And I check the page sub-header is "View entity change history."
    And I check the data table headers are displayed and are correct for entity change history

  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "entity-history" page
    Then I check the page header is "Entity Change History"
    When I click the page info back button
    Then I check the page header is "Settings"