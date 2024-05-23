Feature: Test the Bin Sizes section

  As a logged-in fulfilld user
  I want to test the bin sizes section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  Scenario: Verify elements visibility for the bin sizes section
    And I open the settings section
    And I search for "Bin Sizes" section
    Then I check the page header is "Bin Sizes"
    And I check the page sub-header is "View and manage Bin Sizes."
    And I check the data table headers are displayed and are correct for bin sizes

  Scenario: Verify if user clicks the sidebar logo is routed to the operantions page.
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  Scenario: Verify if user clicks the page back button is routed to the settings page.
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    When I click the page info back button
    Then I check the page header is "Settings"

  Scenario: Verify if the user clicks the cancel button then the add new bin size modal is closed
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I click the cancel button
    Then I verify the new bin size modal is closed

  Scenario: Verify if the user clicks the close button then the new bin size modal is closed
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I click the close button
    Then I verify the new bin size modal is closed

  # [BUG]https://fulfilld.atlassian.net/browse/DEV-3437
  Scenario: [BUG]Verify the required fields error messages are displayed in the new bin size modal
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I click the submit button
    Then I just wait "1000"
    Then I check the bin size required error labels are displayed for "dimensions and weights"
    And I fill in the new bin size dimensions and weights info
      | code                  | label          | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height | volumeUoM | volume |
      | automationBinSizeCode | Automation bin | this is a bin size created by automation suite | TON       | 1              | FT           | 12    | 12    | 12     | INQ       | 2      |
    #the selector needs to be modified, Viviana will fix it thru the bug  DEV-3437
    And I click the next button
    Then I just wait "1000"
    And I click the submit button
    Then I check the bin size required error labels are displayed for "product size restrictions"

  #[BUG]https://fulfilld.atlassian.net/browse/DEV-3440
  Scenario: [BUG]Verify the user is able to add a new bin size, and check the data in the bins's table after creation
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I fill in the new bin size dimensions and weights info
      | code                  | label          | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height | volumeUoM | volume |
      | automationBinSizeCode | Automation bin | this is a bin size created by automation suite | TON       | 1              | FT           | 12    | 12    | 12     | INQ       | 2      |
    And I click the next button
    And I fill in the new bin size product size restrictions info
      | productLengthLimit | productWidthLimit | productHeightLimit | productLimitUoM |
      | 10                 | 11                | 12                 | FT              |
    And I click the submit button
    Then I check the snackbar message is "Successfully created Bin Size Automation bin."
    And  I filter by "automationBinSizeCode" on bin sizes term filter
    Then I check the saved bin size info is displayed on the table as follows
      | row | code                  | label          | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height | volumeUoM | productLengthLimit | productWidthLimit | productHeightLimit | maximumProductUoM | createdBy        |
      | 1   | automationBinSizeCode | Automation bin | this is a bin size created by automation suite | TON       | 1              | FT           | 12    | 12    | 12     | INQ       | 10                 | 11                | 12                 | FT                | Fulfilld Support |

  # [BUG]https://fulfilld.atlassian.net/browse/DEV-3208
  Scenario: [BUG]Verify the user is able to delete a bin size, and confirm it was deleted successfully
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    And  I filter by "automationBinSizeCode" on bin sizes term filter
    Then I check the saved bin size info is displayed on the table as follows
      | row | code                  |
      | 1   | automationBinSizeCode |
    And I click edit bin button
    And I click the delete button
    And  I filter by "automationBinSizeCode" on bin sizes term filter
    Then I verify "no results" is displayed on the bins table