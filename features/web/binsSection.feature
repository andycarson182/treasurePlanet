Feature: Test the Bins section

  As a logged-in fulfilld user
  I want to test the bins section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the "https://fd.fulfilld.qa/auth/support/login" page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    
  Scenario: Verify elements visibility for the bins section
    And I open the settings section
    And I search for "Bins" section
    Then I check the page header is "Bins"
    And I check the page sub-header is "View and manage warehouse bins."
    And I check the data table headers are displayed and are correct for bins

  Scenario: Verify if user clicks the sidebar logo is routed to the operantions page.
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bins" page
    Then I check the page header is "Bins"
    When I click the sideBar fulfilld logo
    Then I verify the URL is "https://fd.fulfilld.qa/w/ab8d02d6/operations"

  Scenario: Verify if user clicks the page back button is routed to the settings page.
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bins" page
    Then I check the page header is "Bins"
    When I click the page info back button
    Then I check the page header is "Settings"

  Scenario: Verify if the user clicks the cancel button the add new bin modal is closed
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bins" page
    Then I check the page header is "Bins"
    And I click add new bin button
    And I click the cancel button
    Then I verify the new bin modal is closed

  Scenario: Verify if the user clicks the close button the new bin modal is closed
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bins" page
    Then I check the page header is "Bins"
    And I click add new bin button
    And I click the close button
    Then I verify the new bin modal is closed

  @skip
  #https://fulfilld.atlassian.net/browse/DEV-2851
  Scenario: Verify the required fields error messages are displayed in the add new bin modal
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bins" page
    Then I check the page header is "Bins"
    And I click add new bin button
    And I click the submit button
    Then I check the required error labels are displayed for bin creation modal

  Scenario: Verify the user is able to add a new bin, and check the data in the bins's table after creation
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bins" page
    And  I check the page header is "Bins"
    And I click add new bin button
    And I fill in the new bin info
      | binSizeCode | binCode           | areaCode                      | asile          | column         | level | x | y | lastCountDate    |
      | DOCK        | automationBinCode | DIRECT-LOAD: AREA-DIRECT-LOAD | testing column | testing column | 1     | 1 | 1 | 03/04/2024 10:49 |
    And I click the submit button
    And  I filter by "automationBinCode" on bins term filter
    Then I check the saved bin info is displayed on the table as follows
      | row | binCode           | status | removal   | placement | areaCode    | level | x | y | lastCountDate        | hasOpenTasks | containsProducts | binSizeCode | weightCapacity     | depth       | width       | height      |
      | 1   | automationBinCode | Active | Available | Available | DIRECT-LOAD | 1     | 1 | 1 | 03/04/2024 10:49 EST | No           | No               | DOCK        | 999999999999999 LB | 1000000 INH | 1000000 INH | 1000000 INH |

  Scenario: Verify the user is able to delete a bin, and confirm it was deleted successfully
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bins" page
    And  I check the page header is "Bins"
    And  I filter by "automationBinCode" on bins term filter
    Then I check the saved bin info is displayed on the table as follows
      | row | binCode           |
      | 1   | automationBinCode |
    And I click edit bin button
    And I click the delete button
    And  I filter by "automationBinCode" on bins term filter
    Then I verify "no results" is displayed on the bins table



