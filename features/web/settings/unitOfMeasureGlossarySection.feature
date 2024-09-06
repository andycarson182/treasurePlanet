@DEV-3707
Feature: Test the Unit Of Measure Glossary section

  As a logged-in fulfilld user
  I want to test the Unit Of Measure Glossary section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  @DEV-3708
  @severity:minor
  Scenario: Verify the visibility of elements in the Unit Of Measure Glossary section.
    Given I open the settings section
    And I search for "Unit Of Measure Glossary" section
    Then I check the page header is "Unit of Measure Glossary"
    And I check the page sub-header is "View, add and edit Unit of Measure information."
    And I check the data table headers are displayed and are correct for units of measure glossary

  @DEV-3709
  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "uom-glossary" page
    Then I check the page header is "Unit of Measure Glossary"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @DEV-3710
  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "uom-glossary" page
    Then I check the page header is "Unit of Measure Glossary"
    When I click the page info back button
    Then I check the page header is "Settings"

  @DEV-3711
  @severity:normal
  Scenario: Verify the search term functionality
    Given I am on the "uom-glossary" page
    Then I check the page header is "Unit of Measure Glossary"
    When I filter by column: "UoM Code" on the unit of measure glossary section
    Then I filter by text "ASY" on the unit of measure glossary term filter and ensure that a record is displayed
