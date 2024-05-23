Feature: Test the Lots section

  As a logged-in fulfilld user
  I want to test the Lots section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  # Scenario: Verify elements visibility for the lots section
  #   And I open the settings section
  #   And I search for "Lots" section
  #   Then I check the page header is "Lots"
  #   And I check the page sub-header is "View and manage your warehouse lots."
  #   And I check the data table headers are displayed and are correct for lots

  # Scenario: Verify if user clicks the page back button is routed to the settings page.
  #   Given I am on the "lots" page
  #   Then I check the page header is "Lots"
  #   When I click the page info back button
  #   Then I check the page header is "Settings"