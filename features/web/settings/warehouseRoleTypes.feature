@DEV-3594
Feature: Test the Warehouse Role Types section

  As a logged-in fulfilld user
  I want to test the warehouse role types section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And I remove all test warehouse role types

  @DEV-3595
  @severity:minor
  Scenario:Verify the visibility of elements in the Warehouse Role Types section.
    Given I open the settings section
    And I search for "Warehouse Role Types" section
    Then I check the page header is "Warehouse Role Types"
    And I check the page sub-header is "View and manage assignable warehouse role types."
    And I check the data table headers are displayed and are correct for warehouse role types

  @DEV-3596
  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "warehouse-role-types" page
    Then I check the page header is "Warehouse Role Types"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @DEV-3597
  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "warehouse-role-types" page
    Then I check the page header is "Warehouse Role Types"
    When I click the page info back button
    Then I check the page header is "Settings"

  @DEV-3598
  @severity:normal
  Scenario: Verify that the "Add New Warehouse Role Type" modal closes when the user clicks the "Cancel" or "Close" button.
    Given I am on the "warehouse-role-types" page
    Then I check the page header is "Warehouse Role Types"
    And I click add new warehouse role type button
    And I click the cancel button
    Then I verify the new warehouse role type modal is closed
    And I click add new warehouse role type button
    And I click the close button
    Then I verify the new warehouse role type modal is closed

  @DEV-3599
  @severity:normal
  Scenario: Verify that the required fields' error messages are displayed in the "Add New Warehouse Role Type" modal.
    Given I am on the "warehouse-role-types" page
    Then I check the page header is "Warehouse Role Types"
    And I click add new warehouse role type button
    And I click the submit button
    Then I check the required error labels are displayed for warehouse role type creation modal

  @DEV-3600
  @severity:critical
  Scenario: Verify that the user can create a new Warehouse Role Type with a complete form and validate the data persistence in the Warehouse Role Types table.
    Given I remove all test warehouse role types
    And I am on the "warehouse-role-types" page
    Then I check the page header is "Warehouse Role Types"
    And I click add new warehouse role type button
    And I fill in the new warehouse role type info
      | code                   | label                                | description                                               | speed | speedUoM | costPerHour | weightLimit | weightUoM |
      | automationRoleTypeCode | Automation warehouse role type label | This is a warehouse role type created by automation suite | 10    | ft/s     | 5           | 4           | TON       |
    And I click the submit button
    # The success message looks different to the other sections
    Then I check the snackbar message is "Warehouse Role Type was successfully created."
    When I filter by column: "Code" on the warehouse role types section
    And I filter by text "automationRoleTypeCode" on the warehouse role types term filter and ensure that a record is displayed
    Then I verify that the previously saved warehouse roles type info is displayed on the table as follows
      | row | code                   | label                                | description                                               | speed | speedUoM | weightLimit | weightUoM | costPerHour | currency |
      | 1   | automationRoleTypeCode | Automation warehouse role type label | This is a warehouse role type created by automation suite | 10    | ft/s     | 4           | TON       | 5           | USD      |
    And I remove all test warehouse role types

  @DEV-3601
  @severity:critical
  Scenario: Verify that the user can create a new Warehouse Role Type with mandatory fields only and validate the data persistence in the Warehouse Role Types table.
    Given I remove all test warehouse role types
    And I am on the "warehouse-role-types" page
    Then I check the page header is "Warehouse Role Types"
    And I click add new warehouse role type button
    And I fill in the new warehouse role type info
      | code                            | label                                | speed | speedUoM | costPerHour | weightLimit | weightUoM |
      | automationWarehouseRoleTypeCode | Automation warehouse role type label | 10    | ft/s     | 5           | 4           | TON       |
    And I click the submit button
    # The success message looks different to the other sections
    Then I check the snackbar message is "Warehouse Role Type was successfully created."
    When I filter by column: "Code" on the warehouse role types section
    And I filter by text "automationWarehouseRoleTypeCode" on the warehouse role types term filter and ensure that a record is displayed
    Then I verify that the previously saved warehouse roles type info is displayed on the table as follows
      | row | code                            | label                                | speed | speedUoM | weightLimit | weightUoM | costPerHour | currency |
      | 1   | automationWarehouseRoleTypeCode | Automation warehouse role type label | 10    | ft/s     | 4           | TON       | 5           | USD      |
    And I remove all test warehouse role types

  @DEV-3602
  @severity:normal
  Scenario: Verify the persistence of data in the edit form after creation.
    Given I remove all test warehouse role types
    And I am on the "warehouse-role-types" page
    Then I check the page header is "Warehouse Role Types"
    And I click add new warehouse role type button
    And I fill in the new warehouse role type info
      | code                   | label                                | description                                               | speed | speedUoM | costPerHour | weightLimit | weightUoM |
      | automationRoleTypeCode | Automation warehouse role type label | This is a warehouse role type created by automation suite | 10    | ft/s     | 5           | 4           | TON       |
    And I click the submit button
    When I filter by column: "Code" on the warehouse role types section
    And I filter by text "automationRoleTypeCode" on the warehouse role types term filter and ensure that a record is displayed
    And I click the edit warehouse role type button
    Then I verify that the previously saved warehouse role type info is displayed on the edit warehouse role type form
      | code                   | label                                | description                                               | speed | speedUoM | costPerHour | currency             | weightLimit | weightUoM |
      | automationRoleTypeCode | Automation warehouse role type label | This is a warehouse role type created by automation suite | 10    | ft/s     | 5           | United States dollar | 4           | TON       |
    And I remove all test warehouse role types

  @DEV-3603
  @severity:critical
  Scenario: Verify that the user can edit a warehouse role type and confirm the updated data in the warehourse role types table.
    Given I remove all test warehouse role types
    And I create a warehouse role type thru grahpql endpoint
    And I am on the "warehouse-role-types" page
    Then I check the page header is "Warehouse Role Types"
    When I filter by column: "Code" on the warehouse role types section
    And I filter by text "AUTOMATION WAREHOUSE ROLE TYPE FOR EDIT" on the warehouse role types term filter and ensure that a record is displayed
    And I click the edit warehouse role type button
    And I fill in the new warehouse role type info
      | code                                   | label                                        | speed | speedUoM | costPerHour | weightLimit | weightUoM |
      | automationWarehouseRoleTypeCodeUpdated | Automation warehouse role type label updated | 5     | ft/min   | 7           | 8           | OZ        |
    And I click the submit button
    Then I check the snackbar message is "Warehouse Role Type was successfully updated."
    When I filter by column: "Code" on the warehouse role types section
    And I filter by text "automationWarehouseRoleTypeCodeUpdated" on the warehouse role types term filter and ensure that a record is displayed
    Then I verify that the previously saved warehouse roles type info is displayed on the table as follows
      | row | code                                   | label                                        | speed | speedUoM | weightLimit | weightUoM | costPerHour | currency |
      | 1   | automationWarehouseRoleTypeCodeUpdated | Automation warehouse role type label updated | 5     | ft/min   | 8           | OZ        | 7           | USD      |
    And I remove all test warehouse role types

  @DEV-3604
  @severity:critical
  Scenario: Verify that the user can delete a warehouse role type and confirm its successful deletion.
    Given I remove all test warehouse role types
    And I create a warehouse role type thru grahpql endpoint
    And I am on the "warehouse-role-types" page
    Then I check the page header is "Warehouse Role Types"
    When I filter by column: "Code" on the warehouse role types section
    And I filter by text "AUTOMATION WAREHOUSE ROLE TYPE FOR EDIT" on the warehouse role types term filter and ensure that a record is displayed
    And I click the edit warehouse role type button
    And I click the delete button
    Then I check the snackbar message is "Warehouse Role Type was deleted."
    When I filter by column: "Code" on the warehouse role types section
    And  I filter by text "AUTOMATION WAREHOUSE ROLE TYPE FOR EDIT" on warehouse role types term filter
    Then I verify "no results" is displayed on the warehouse role types table
    And I remove all test warehouse role types