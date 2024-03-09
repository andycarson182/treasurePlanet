Feature: Test the Bin Sizes section

  As a logged-in fulfilld user
  I want to test the bin sizes section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the "https://fd.fulfilld.qa/auth/support/login" page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    
  Scenario: Verify elements visibility for the bin sizes section
    And I open the settings section
    And I search for "Bin Sizes" section
    # https://fulfilld.atlassian.net/browse/DEV-2901 
    #Then I check the page header is "Bin Sizes"
    And I check the page sub-header is "View and manage Bin Sizes."
    And I check the data table headers are displayed and are correct for bin sizes

  Scenario: Verify if user clicks the sidebar logo is routed to the operantions page.
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bin-sizes" page
    #Then I check the page header is "Bin Sizes"
    When I click the sideBar fulfilld logo
    Then I verify the URL is "https://fd.fulfilld.qa/w/ab8d02d6/operations"

  Scenario: Verify if user clicks the page back button is routed to the settings page.
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bin-sizes" page
    # Then I check the page header is "Bin Sizes"
    When I click the page info back button
    Then I check the page header is "Settings"

  Scenario: Verify if the user clicks the cancel button the add new bin size modal is closed
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bin-sizes" page
    #Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I click the cancel button
    Then I verify the new bin size modal is closed

  Scenario: Verify if the user clicks the close button the new bin size modal is closed
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bin-sizes" page
    #  Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I click the close button
    Then I verify the new bin size modal is closed

  Scenario: Verify the required fields error messages are displayed in the new bin size modal
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bin-sizes" page
    #  Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I click the submit button
    Then I check the required error labels are displayed for bin size creation modal

@skip
#https://fulfilld.atlassian.net/browse/DEV-2830
  Scenario: Verify the user is able to add a new bin, and check the data in the bins's table after creation
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bin-sizes" page
    #Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I fill in the new bin size info
      | code                  | label           | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height |
      | automationBinSizeCode | automationLabel | this is a bin size created by automation suite | TON       | 1              | FT           | 12    | 12    | 12     |
    And I click the submit button
    And  I filter by "automationBinSizeCode" on bin sizes term filter
    Then I check the saved bin size info is displayed on the table as follows
      | row | code                  | label           | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height |
      | 1   | automationBinSizeCode | automationLabel | this is a bin size created by automation suite | TON       | 1              | FT           | 12    | 12    | 12     |

  @skip
  #https://fulfilld.atlassian.net/browse/DEV-2830
  Scenario: Verify the user is able to delete a bin, and confirm it was deleted successfully
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/bin-sizes" page
    # Then I check the page header is "Bin Sizes"
    And  I filter by "automationBinSizeCode" on bin sizes term filter
    Then I check the saved bin size info is displayed on the table as follows
      | row | code                  |
      | 1   | automationBinSizeCode |
    And I click edit bin button
    And I click the delete button
    And  I filter by "automationBinSizeCode" on bin sizes term filter
    Then I verify "no results" is displayed on the bins table



