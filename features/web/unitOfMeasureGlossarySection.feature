Feature: Test the Unit Of Measure Glossary section

  As a logged-in fulfilld user
  I want to test the Unit Of Measure Glossary section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  Scenario: Verify elements visibility for the unit of measure glossary section
    And I open the settings section
    And I search for "Unit Of Measure Glossary" section
    Then I check the page header is "Unit of Measure Glossary"
    And I check the page sub-header is "View, add and edit Unit of Measure information."
    And I check the data table headers are displayed and are correct for units of measure glossary

  Scenario: Verify if user clicks the page back button is routed to the settings page.
    Given I am on the "uom-glossary" page
    Then I check the page header is "Unit of Measure Glossary"
    When I click the page info back button
    Then I check the page header is "Settings"