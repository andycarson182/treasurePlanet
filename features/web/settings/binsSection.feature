@DEV-3639
Feature: Test the Bins section

  As a logged-in fulfilld user
  I want to test the bins section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And I remove all test bins data

#   @DEV-3640
#   @severity:minor
#   Scenario: Verify the visibility of elements in the Bins section.
#     Given I open the settings section
#     And I search for "Bins" section
#     Then I check the page header is "Bins"
#     And I check the page sub-header is "View and manage warehouse bins."
#     And I check the data table headers are displayed and are correct for bins

#   @DEV-3641
#   @severity:minor
#   Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
#     Given I am on the "bins" page
#     Then I check the page header is "Bins"
#     When I click the sideBar fulfilld logo
#     Then I verify the URL has "/operations"

#   @DEV-3642
#   @severity:minor
#   Scenario: Verify that the user is routed to the Settings page when they click the back button.
#     Given I am on the "bins" page
#     Then I check the page header is "Bins"
#     When I click the page info back button
#     Then I check the page header is "Settings"

#   @DEV-3645
#   @severity:normal
#   Scenario: Verify that the "Add New Bin" modal closes when the user clicks the "Cancel" or "Close" button.
#     Given I am on the "bins" page
#     Then I check the page header is "Bins"
#     And I select "Add New Bin" action option on bins page
#     And I click the cancel button
#     Then I verify the new bin modal is closed
#     And I select "Add New Bin" action option on bins page
#     And I click the close button
#     Then I verify the new bin modal is closed

#   @DEV-3646
#   @severity:normal
#   Scenario: Verify the required fields error messages are displayed in the add new bin modal
#     Given I am on the "bins" page
#     Then I check the page header is "Bins"
#     And I select "Add New Bin" action option on bins page
#     And I click the submit button
#     Then I check the required error labels are displayed for bin creation modal

    @DEV-2935
    @severity:critical
    Scenario:Verify that the user can create a new Bin with a complete form and validate the data persistence in the Bins table.
      Given I remove all test bins data
      And I am on the "bins" page
      And  I check the page header is "Bins"
      And I select "Add New Bin" action option on bins page
      And I fill in the new bin info
        | binSizeCode | binCode             | areaCode                      | aisle | column | level | x | y | lastCountDate |
        | DOCK        | Automation Bin Code | DIRECT-LOAD: AREA-DIRECT-LOAD | 1     | 1      | 1     | 1 | 1 | 10/10/2024        |
      And I click the submit button
      Then I check the snackbar message is "Successfully added new bin: AUTOMATION BIN CODE"
      When I filter by column: "Code" on the bins section
      And I filter by text "AUTOMATION BIN CODE" on the bins term filter and ensure that a record is displayed
      Then I verify that the previously saved bin info is displayed on the table as follows
        | row | binCode             | status | removal   | placement | areaCode    | level | x | y | lastCountDate | hasOpenTasks | containsProducts | binSizeCode | weightCapacity | depth                | width                | height               |
        | 1   | AUTOMATION BIN CODE | Active | Available | Available | DIRECT-LOAD | 1     | 1 | 1 | 10/10/2024        | No           | No               | DOCK        | 999999999 LB   | 83333333.24999999 FT | 83333333.24999999 FT | 83333333.24999999 FT |
  And I remove all test bins data

#   @DEV-3647
#   @severity:critical
#   #https://fulfilld.atlassian.net/browse/DEV-4288
#   Scenario: [BUG:DEV-4288]Verify user can create a new bin with mandatory fields only, and check the data in the bins's table after creation
#     Given I remove all test bins data
#     And I am on the "bins" page
#     And  I check the page header is "Bins"
#     And I select "Add New Bin" action option on bins page
#     And I fill in the new bin info
#       | binSizeCode | binCode             | areaCode                      |
#       | DOCK        | Automation Bin Code | DIRECT-LOAD: AREA-DIRECT-LOAD |
#     And I click the submit button
#     Then I check the snackbar message is "Successfully added new bin: AUTOMATION BIN CODE"
#     When I filter by column: "Code" on the bins section
#     And I filter by text "AUTOMATION BIN CODE" on the bins term filter and ensure that a record is displayed
#     Then I verify that the previously saved bin info is displayed on the table as follows
#       | row | binCode             | status | removal   | placement | areaCode    | level | x | y | lastCountDate        | hasOpenTasks | containsProducts | binSizeCode | weightCapacity | depth                | width                | height               |
#       | 1   | AUTOMATION BIN CODE | Active | Available | Available | DIRECT-LOAD | 1     | 1 | 1 | 01/01/2024 23:21 CST | No           | No               | DOCK        | 999999999 LB   | 83333333.24999999 FT | 83333333.24999999 FT | 83333333.24999999 FT |
#     And I remove all test bins data

#   @DEV-3648
#   @severity:normal
#   Scenario:Verify the persistence of data in the edit form after creation.
#     Given I remove all test bins data
#     And I am on the "bins" page
#     And  I check the page header is "Bins"
#     And I select "Add New Bin" action option on bins page
#     And I fill in the new bin info
#       | binSizeCode | binCode             | areaCode                      | aisle | column | level | x | y | lastCountDate |
#       | DOCK        | Automation Bin Code | DIRECT-LOAD: AREA-DIRECT-LOAD | 1     | 1      | 1     | 1 | 1 | today         |
#     And I click the submit button
#     When I filter by column: "Code" on the bins section
#     And I filter by text "AUTOMATION BIN CODE" on the bins term filter and ensure that a record is displayed
#     And I click the edit button
#     Then I verify that the previously saved bin info is displayed on the edit bin form
#       | binSizeCode | binSizeLabel | weightCapacity | depth                | width                | height               | binCode             | areaCode                      | aisle | column | level | x | y | lastCountDate |
#       | DOCK        | DOCK_DOOR    | 999999999 LB   | 83333333.24999999 FT | 83333333.24999999 FT | 83333333.24999999 FT | AUTOMATION BIN CODE | DIRECT-LOAD: AREA-DIRECT-LOAD | 1     | 1      | 1     | 1 | 1 | today         |
#     And I remove all test bins data

#   @DEV-2936
#   @severity:critical
#   Scenario: Verify that the user can edit a Bin and confirm the updated data in the Bins table.
#     Given I remove all test bins data
#     And I create a bin thru grahpql endpoin with the bin code: "AUTOMATION BIN CODE FOR EDIT"
#     And I am on the "bins" page
#     And  I check the page header is "Bins"
#     When I filter by column: "Code" on the bins section
#     And I filter by text "AUTOMATION BIN CODE FOR EDIT" on the bins term filter and ensure that a record is displayed
#     And I click the edit button
#     #needs to add aisle and column
#     And I fill in the new bin info
#       | binSizeCode | binCode                     | areaCode        | aisle | column | level | x | y | lastCountDate |
#       | PAL         | Automation Bin Code Updated | FG-1: AREA-FG-1 | 1    | 12      | 2     | 2 | 2 | today         |
#     And I click the submit button
#     Then I check the snackbar message is "Successfully updated bin: AUTOMATION BIN CODE UPDATED"
#     When I filter by column: "Code" on the bins section
#     And I filter by text "AUTOMATION BIN CODE UPDATED" on the bins term filter and ensure that a record is displayed
#     Then I verify that the previously saved bin info is displayed on the table as follows
#       | row | binCode                     | status | removal   | placement | areaCode | level | x | y | lastCountDate | hasOpenTasks | containsProducts | binSizeCode | weightCapacity | depth                | width                | height               |
#       | 1   | AUTOMATION BIN CODE UPDATED | Active | Available | Available | FG-1     | 2     | 2 | 2 | today         | No           | No               | PAL         | 5000 LB        | 7.999999999999998 FT | 4.166666666666666 FT | 3.999999999999999 FT |
#     And I remove all test bins data

# @DEV-2937
# @severity:critical
# Scenario: Verify that the user can delete a Bin and confirm its successful deletion.
#   Given I remove all test bins data
#   And I create a bin thru grahpql endpoin with the bin code: "AUTOMATION BIN CODE FOR EDIT"
#   Given I am on the "bins" page
#   And  I check the page header is "Bins"
#   When I filter by column: "Code" on the bins section
#   And I filter by text "AUTOMATION BIN CODE FOR EDIT" on the bins term filter and ensure that a record is displayed
#   And I click the edit button
#   And I click the delete button
#   Then I check the snackbar message is "Successfully deleted bin: AUTOMATION BIN CODE FOR EDIT"
#   When I filter by column: "Code" on the bins section
#   And  I filter by text "AUTOMATION BIN CODE FOR EDIT" on bins term filter
#   Then I verify "no results" is displayed on the bins table