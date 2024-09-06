@DEV-3712
Feature: Test the Lots section

  As a logged-in fulfilld user
  I want to test the Lots section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  # @DEV-3713
  # @severity:minor
  # Scenario: Verify the visibility of elements in the Lots section.
  #   Given I open the settings section
  #   And I search for "Lots" section
  #   Then I check the page header is "Lots"
  #   And I check the page sub-header is "View and manage your warehouse lots."
  #   And I check the data table headers are displayed and are correct for lots

  # @DEV-3714
  # @severity:minor
  # Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
  #   Given I am on the "lots" page
  #   Then I check the page header is "Lots"
  #   When I click the sideBar fulfilld logo
  #   Then I verify the URL has "/operations"

  # @DEV-3715
  # @severity:minor
  # Scenario: Verify that the user is routed to the Settings page when they click the back button.
  #   Given I am on the "lots" page
  #   Then I check the page header is "Lots"
  #   When I click the page info back button
  #   Then I check the page header is "Settings"

  @DEV-3716
  @severity:normal
  Scenario: Verify the search term functionality
    Given I am on the "lots" page
    Then I check the page header is "Lots"
    When I filter by column: "Lot Code" on the lots section
    Then I filter by text "0000000016" on the lots term filter and ensure that a record is displayed