@DEV-3649
Feature: Test the Bin Sizes section

  As a logged-in fulfilld user
  I want to test the bin sizes section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And I remove all test bin sizes data

  @DEV-3650
  @severity:minor
  Scenario: Verify the visibility of elements in the Bin Sizes section.
    Given I open the settings section
    And I search for "Bin Sizes" section
    Then I check the page header is "Bin Sizes"
    And I check the page sub-header is "View and manage Bin Sizes."
    And I check the data table headers are displayed and are correct for bin sizes

  @DEV-3651
  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @DEV-3652
  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    When I click the page info back button
    Then I check the page header is "Settings"

  @DEV-3653
  @severity:normal
  Scenario: Verify that the "Add New Bin Sizes" modal closes when the user clicks the "Cancel" or "Close" button.
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I click the cancel button
    Then I verify the new bin size modal is closed
    And I click add new bin size button
    And I click the close button
    Then I verify the new bin size modal is closed

  @DEV-3654
  @severity:normal
  Scenario: Verify that the required fields' error messages are displayed in the "Add New Bin Size" modal.
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I click the next button
    Then I check the bin size required error labels are displayed for "dimensions and weights"

  @DEV-3655
  @severity:critical
  Scenario: Verify that the user can create a new Bin Size with a complete form and validate the data persistence in the Bin Sizes table.
    Given  I remove all test bin sizes data
    And I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I fill in the new bin size dimensions and weights info
      | code                  | label                     | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height | volumeUoM | volume |
      | automationBinSizeCode | Automation bin size label | This is a bin size created by automation suite | TON       | 1              | FT           | 12    | 12    | 12     | INQ       | 2      |
    And I click the next button
    And I fill in the new bin size product size restrictions info
      | productSizeRestriction        | productLengthLimit | productWidthLimit | productHeightLimit | productLimitUoM |
      | Set Product Size Restrictions | 10                 | 11                | 12                 | FT              |
    And I click the submit button
    Then I check the snackbar message is "Successfully created Bin Size: Automation bin size label."
    When I filter by column: "Code" on the bin sizes section
    And I filter by text "automationBinSizeCode" on the bin sizes term filter and ensure that a record is displayed
    Then I verify that the previously saved bin size info is displayed on the table as follows
      | row | code                  | label                     | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height | volumeUoM | productLengthLimit | productWidthLimit | productHeightLimit | maximumProductUoM | createdBy    |
      | 1   | automationBinSizeCode | Automation bin size label | This is a bin size created by automation suite | TON       | 1              | FT           | 12    | 12    | 12     | INQ       | 10                 | 11                | 12                 | FT                | Support User |
    And  I remove all test bin sizes data

  @DEV-3656
  @severity:critical
  Scenario: Verify that the user can create a new Bin Size with mandatory fields only and validate the data persistence in the Bin Sizes table.
    Given  I remove all test bin sizes data
    And I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I fill in the new bin size dimensions and weights info
      | code                  | label                     | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height | volumeUoM | volume |
      | automationBinSizeCode | Automation bin size label | This is a bin size created by automation suite | TON       | 1              | FT           | 12    | 12    | 12     | INQ       | 2      |
    And I click the next button
    And I click the submit button
    Then I check the snackbar message is "Successfully created Bin Size: Automation bin size label."
    When I filter by column: "Code" on the bin sizes section
    And I filter by text "automationBinSizeCode" on the bin sizes term filter and ensure that a record is displayed
    Then I verify that the previously saved bin size info is displayed on the table as follows
      | row | code                  | label                     | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height | volumeUoM | createdBy    |
      | 1   | automationBinSizeCode | Automation bin size label | This is a bin size created by automation suite | TON       | 1              | FT           | 12    | 12    | 12     | INQ       | Support User |
    And  I remove all test bin sizes data

  @DEV-3657
  @severity:normal
  Scenario: Verify the persistence of data in the edit form after creation.
    Given I remove all test bin sizes data
    And I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I fill in the new bin size dimensions and weights info
      | code                  | label                     | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height | volumeUoM | volume |
      | automationBinSizeCode | Automation bin size label | This is a bin size created by automation suite | TON       | 1              | FT           | 12    | 12    | 12     | INQ       | 2      |
    And I click the next button
    And I fill in the new bin size product size restrictions info
      | productSizeRestriction        | productLengthLimit | productWidthLimit | productHeightLimit | productLimitUoM |
      | Set Product Size Restrictions | 10                 | 11                | 12                 | FT              |
    And I click the submit button
    When I filter by column: "Code" on the bin sizes section
    And I filter by text "automationBinSizeCode" on the bin sizes term filter and ensure that a record is displayed
    And I click the edit button
    Then I verify that the previously saved bin size info is displayed on the edit bin size form for demensions and weights
      | code                  | label                     | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height | volumeUoM | volume |
      | automationBinSizeCode | Automation bin size label | This is a bin size created by automation suite | TON       | 1              | FT           | 12    | 12    | 12     | INQ       | 2      |
    And I click the next button
    Then I verify that the previously saved bin size info is displayed on the edit bin size form for product size restrictions
      | productSizeRestriction        | productLengthLimit | productWidthLimit | productHeightLimit | productLimitUoM |
      | Set Product Size Restrictions | 10                 | 11                | 12                 | FT              |
    And  I remove all test bin sizes data

  @DEV-3658
  @severity:critical
  Scenario: Verify that the user can edit a Bin Size and confirm the updated data in the Bin Sizes table.
    Given I remove all test bin sizes data
    And I create a bin size thru grahpql endpoint
    And I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    When I filter by column: "Code" on the bin sizes section
    And I filter by text "AUTOMATION BIN SIZE FOR EDIT" on the bin sizes term filter and ensure that a record is displayed
    And I click the edit button
    And I fill in the new bin size dimensions and weights info
      | code                                 | label                             | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height | volumeUoM | volume |
      | AUTOMATION BIN SIZE FOR EDIT UPDATED | Automation bin size label updated | This is a bin size updated by automation suite | PLBS      | 11             | YD           | 17    | 18    | 19     | CF        | 4      |
    And I click the next button
    And I fill in the new bin size product size restrictions info
      | productLengthLimit | productWidthLimit | productHeightLimit | productLimitUoM |
      | 12                 | 13                | 14                 | YD              |
    And I click the submit button
    Then I check the snackbar message is "Successfully updated Bin Size: Automation bin size label updated."
    When I filter by column: "Code" on the bin sizes section
    And I filter by text "AUTOMATION BIN SIZE FOR EDIT UPDATED" on the bin sizes term filter and ensure that a record is displayed
    Then I verify that the previously saved bin size info is displayed on the table as follows
      | row | code                                 | label                             | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height | volumeUoM | productLengthLimit | productWidthLimit | productHeightLimit | maximumProductUoM | createdBy    |
      | 1   | AUTOMATION BIN SIZE FOR EDIT UPDATED | Automation bin size label updated | This is a bin size updated by automation suite | PLBS      | 11             | YD           | 17    | 18    | 19     | CF        | 12                 | 13                | 14                 | YD                | Fulfilld Bot |
    And I remove all test bin sizes data

  @DEV-3659
  @severity:critical
  Scenario: Verify that the user can delete a Bin Size and confirm its successful deletion.
    Given  I remove all test bin sizes data
    And I create a bin size thru grahpql endpoint
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    When I filter by column: "Code" on the bin sizes section
    And I filter by text "AUTOMATION BIN SIZE FOR EDIT" on the bin sizes term filter and ensure that a record is displayed
    And I click the delete button
    And I click the submit button
    Then I check the snackbar message is "Successfully deleted Bin Size: Automation bin size label."
    When I filter by column: "Code" on the bin sizes section
    And  I filter by text "AUTOMATION BIN SIZE FOR EDIT" on bin sizes term filter
    Then I verify "no results" is displayed on the bins table
    And I remove all test bin sizes data

  @DEV-3681
  @severity:normal
  Scenario: Verify that the user cannot create a bin size with a duplicate bin size code during bin size creation.
    Given I remove all test bin sizes data
    And I create a bin size thru grahpql endpoint
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I fill in the new bin size dimensions and weights info
      | code                         | label                     | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height | volumeUoM | volume |
      | AUTOMATION BIN SIZE FOR EDIT | Automation bin size label | This is a bin size created by automation suite | TON       | 1              | FT           | 12    | 12    | 12     | INQ       | 2      |
    And I click the next button
    And I click the submit button
    Then I check the snackbar error message is "Error creating Bin Size: BinSize not unique by warehouseId,code"
    And I remove all test bin sizes data

  @DEV-3681
  @severity:normal
  #https://fulfilld.atlassian.net/browse/DEV-3789
  Scenario: [BUG:3789]Verify that the user cannot create a bin size with with a duplicate bin size label during bin size creation.
    Given I remove all test bin sizes data
    And I create a bin size thru grahpql endpoint
    Given I am on the "bin-sizes" page
    Then I check the page header is "Bin Sizes"
    And I click add new bin size button
    And I fill in the new bin size dimensions and weights info
      | code                                 | label                     | description                                    | weightUoM | weightCapacity | dimensionUoM | depth | width | height | volumeUoM | volume |
      | AUTOMATION BIN SIZE FOR EDIT UPDATED | Automation bin size label | This is a bin size created by automation suite | TON       | 1              | FT           | 12    | 12    | 12     | INQ       | 2      |
    And I click the next button
    And I click the submit button
    Then I check the snackbar error message is "Error creating Bin Size: BinSize not unique by warehouseId,label"
    And I remove all test bin sizes data