@DEV-3926
Feature: Test the Rule Sets section

  As a logged-in fulfilld user
  I want to test the Rule Sets section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And I remove all test rule sets

  @DEV-3927
  @severity:minor
  Scenario: Verify the visibility of elements in the rules sets section.
    Given I am on the "/w/781dacb4/slotting/rulesets" page
    Then I check the page header is "Rule Sets"
    And I check the page sub-header is "View, add, and manage Rule Sets."
    And I check the data table headers are displayed and are correct for rule sets

  @DEV-3928
  @severity:minor
  Scenario: Verify that the user is routed to the slotting dashboard page when they are in a slotting warehouse and they click the sidebar logo.
    Given I am on the "/w/781dacb4/slotting/rulesets" page
    Then I check the page header is "Rule Sets"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/dashboard/newest"

  @DEV-3929
  @severity:minor
  Scenario: Verify that the user is routed to the slotting dashboard page when they click the back button.
    Given I am on the "/w/781dacb4/slotting/rulesets" page
    Then I check the page header is "Rule Sets"
    When I click the page info back button
    Then I check the page header is "Slotting Dashboard"

  @DEV-3930
  @severity:normal
  Scenario: Verify that the "create new simulation" modal closes when the user clicks the  "Close" button.
    Given I am on the "/w/781dacb4/slotting/rulesets" page
    Then I check the page header is "Rule Sets"
    And I click create new rule set button
    And I click the close button
    And I click the exit button
    Then I verify the new rule set modal is closed

  @DEV-3932
  @severity:critical
  Scenario:Verify that the user can create a new rule set with a complete form and validate the data persistence in the rule sets table.
    Given I remove all test rule sets
    And  I am on the "/w/781dacb4/slotting/rulesets" page
    Then I check the page header is "Rule Sets"
    And I click create new rule set button
    And I fill in the general rule set info
      | name                | maxMovements | timeFrame         |
      | Automation Rule Set | 10           | Historical Orders |
    And I click the next button
    And I fill in the abc analysis criteria rule set info
      | abcAnalysis      | abcCriteria            | aPercentage | bPercentage | cPercentage |
      | Use ABC Analysis | Sales Order Line Items | 50          | 25          | 25          |
    And I click the next button
    And I fill in the warehouse restrictions rule set info
      | warehouseRestriction       |
      | FIFO Picking               |
      | Prevent Mixed Lots In Bins |
    And I click the next button
    And I fill in the warehouse weights rule set info
      | pickDensity | pickEfficiency | avoidCongestion | favorGroundLevel | putawayDensity | putawayEfficiency |
      | 20          | 20             | 20              | 20               | 20             | 20                |
    And I click the next button
    And I click the next button
    And I click the next button
    And I click the next button
    And I click the next button
    And I click the submit button
    Then I check the snackbar message is "Successfully Created Rule Set Automation Rule Set."
    When I filter by column: "Rule Set" on the rule sets section
    Then I filter by text "Automation Rule Set" on the rule sets term filter and ensure that a record is displayed
    #We need to add a function for handling timezone for the last updated run
    And I verify that the previously saved rule set info is displayed on the table as follows
      | row | ruleSet             | status   | runCount | createdBy    |
      | 1   | Automation Rule Set | Complete | 0        | Support User |
    And I remove all test rule sets

  @DEV-3933
  @severity:normal
  Scenario: Verify the persistence of data on the rule set detail page.
    Given I remove all test rule sets
    And  I am on the "/w/781dacb4/slotting/rulesets" page
    Then I check the page header is "Rule Sets"
    And I click create new rule set button
    And I fill in the general rule set info
      | name                | maxMovements | timeFrame         |
      | Automation Rule Set | 5            | Historical Orders |
    And I click the next button
    And I fill in the abc analysis criteria rule set info
      | abcAnalysis      | abcCriteria          | aPercentage | bPercentage | cPercentage |
      | Use ABC Analysis | Sales Order Quantity | 25          | 15          | 60          |
    And I click the next button
    And I fill in the warehouse restrictions rule set info
      | warehouseRestriction           |
      | Prevent Mixed Products In Bins |
      | Restrict Distance              |
    And I click the next button
    And I fill in the warehouse weights rule set info
      | pickDensity | pickEfficiency | avoidCongestion | favorGroundLevel | putawayDensity | putawayEfficiency |
      | 30          | 30             | 30              | 30               | 30             | 30                |
    And I click the next button
    And I click the next button
    And I click the next button
    And I click the next button
    And I click the next button
    And I click the submit button
    When I filter by column: "Rule Set" on the rule sets section
    Then I filter by text "Automation Rule Set" on the rule sets term filter and ensure that a record is displayed
    And I select the rule set in the position "1"
    #needs to add last updated verification
    Then I verify that the previously saved rule set detail info is displayed on the rule set detail page
      | name                | runCount | createdBy    |
      | Automation Rule Set | 0        | Support User |
    Then I verify that the previously saved rule set general info is displayed on the rule set detail page
      | name                | maxMovements | timeFrame         |
      | Automation Rule Set | 5            | Historical Orders |
    And I verify that the previously saved abc analysis criteria rule set info is displayed on the rule set detail page
      | abcAnalysis      | abcCriteria          | timeFrame         | aPercentage | bPercentage | cPercentage |
      | Use ABC Analysis | Sales Order Quantity | Historical Orders | 25          | 15          | 60          |
    And I verify that the previously saved warehouse restrictions info is displayed on the rule set detail page
      | warehouseRestriction           |
      | Prevent Mixed Products In Bins |
      | Restrict Distance              |
    And I verify that the previously saved warehouse weights rule set info is displayed on the rule set detail page
      | pickDensity | pickEfficiency | avoidCongestion | favorGroundLevel | putawayDensity | putawayEfficiency |
      | 30          | 30             | 30              | 30               | 30             | 30                |
    And I remove all test rule sets

  @DEV-3934
  @severity:critical
  Scenario: Verify that the user can copy a created rule set and confirm the copied data.
    Given I remove all test rule sets
    And  I create a rule set thru grahpql endpoint
    And  I am on the "/w/781dacb4/slotting/rulesets" page
    Then I check the page header is "Rule Sets"
    When I filter by column: "Rule Set" on the rule sets section
    Then I filter by text "Automation Rule Set For Edit" on the rule sets term filter and ensure that a record is displayed
    And I select the rule sets checkbox in the row position "1"
    And I select "Copy Rule Set" action option in rule sets
    Then I verify that the previously saved rule set general info is displayed on the rule set modal
      | name                                 | maxMovements | timeFrame         |
      | Copy of Automation Rule Set For Edit | 10           | Historical Orders |
    And I click the next button
    Then I verify that the previously saved abc analysis criteria rule set info is displayed on the rule set modal
      | abcAnalysis      | abcCriteria            | aPercentage | bPercentage | cPercentage |
      | Use ABC Analysis | Sales Order Line Items | 50          | 25          | 25          |
    And I click the next button
    And I verify that the previously saved warehouse restrictions info is displayed on the rule set modal
      | warehouseRestriction       |
      | FIFO Picking               |
      | Prevent Mixed Lots In Bins |
    And I click the next button
    And I verify that the previously saved warehouse weights rule set info is displayed on the rule set modal
      | pickDensity | pickEfficiency | avoidCongestion | favorGroundLevel | putawayDensity | putawayEfficiency |
      | 20          | 20             | 20              | 20               | 20             | 20                |
    And I click the next button
    And I click the next button
    And I click the next button
    And I click the next button
    And I click the next button
    And I click the submit button
    Then I check the snackbar message is "Successfully Created Rule Set Copy of Automation Rule Set For Edit."
    When I filter by column: "Rule Set" on the rule sets section
    Then I filter by text "Copy of Automation Rule Set For Edit" on the rule sets term filter and ensure that a record is displayed
    #We need to add a function for handling timezone for the last updated run
    And I verify that the previously saved rule set info is displayed on the table as follows
      | row | ruleSet                              | status   | runCount | createdBy    |
      | 1   | Copy of Automation Rule Set For Edit | Complete | 0        | Support User |
    And I remove all test rule sets

  @DEV-3935
  @severity:critical
  Scenario: Verify that the user can delete a rule set and confirm its successful deletion.
    Given I remove all test rule sets
    And  I create a rule set thru grahpql endpoint
    And  I am on the "/w/781dacb4/slotting/rulesets" page
    Then I check the page header is "Rule Sets"
    When I filter by column: "Rule Set" on the rule sets section
    Then I filter by text "Automation Rule Set For Edit" on the rule sets term filter and ensure that a record is displayed
    And I select the rule sets checkbox in the row position "1" for rule sets checkbox
    And I select "Delete Rule Set" action option in rule sets
    #We need to correct the selector attribute, it should be delete instead of submit
    And I click the submit button
    #Correct the message
    Then I check the snackbar message is "Successfully deleted ruleset Automation Rule Set For Edit."
    When I filter by column: "Rule Set" on the rule sets section
    And  I filter by text "Automation Rule Set For Edit" on rule sets term filter
    Then I verify "no results" is displayed on the rule sets table
    And I remove all test rule sets

  @DEV-3936
  @severity:normal
  Scenario: Verify that the user cannot create a rule set with a duplicate name during rule set creation.
    Given I remove all test rule sets
    And I create a rule set thru grahpql endpoint
    And  I am on the "/w/781dacb4/slotting/rulesets" page
    Then I check the page header is "Rule Sets"
    And I click create new rule set button
    And I fill in the general rule set info
      | name                         |
      | Automation Rule Set For Edit |
    And I click the next button
    Then I verify the error message: "A Rule Set with this name already exists." is displayed
    And I remove all test rule sets