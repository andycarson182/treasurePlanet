Feature: Test the Entity Change History section

  As a logged-in fulfilld user
  I want to test the Entity Change History section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  Scenario: Verify elements visibility for the entity Change History section
    And I open the settings section
    And I search for "Entity Change History" section
    Then I check the page header is "Entity Change History"
    And I check the page sub-header is "View entity change history."
    And I check the data table headers are displayed and are correct for entity change history

  Scenario: Verify if user clicks the page back button is routed to the settings page.
    Given I am on the "entity-history" page
    Then I check the page header is "Entity Change History"
    When I click the page info back button
    Then I check the page header is "Settings"