Feature: Test the Inventory Section

  As a logged-in fulfilld user
  I want to test the inventory section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  Scenario: Verify elements visibility - Current Inventory to Inventory Counting
    And I open the inventory section
    And I check the page header is "Inventory"
    And I check the data table headers are displayed and are correct for "inventory"
    And I select "Inventory Counting" inventory tab
    And I check the page header is "Inventory"
    And I check the data table headers are displayed and are correct for "inventory counting"
    And I click the inventory conting actions button
    And I check the inventory counting actions menu options

  Scenario: Verify if user clicks the sidebar logo is routed to the operantions page.
    Given I am on the "inventory/bin" page
    And I check the page header is "Inventory"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"
