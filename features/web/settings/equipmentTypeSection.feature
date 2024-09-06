@DEV-3628
Feature: Test the Equipment Types section

  As a logged-in fulfilld user
  I want to test the equipment types section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And I remove all test equipment types data

  @DEV-3629
  @severity:minor
  Scenario: Verify the visibility of elements in the Equipment Type section.
    Given I open the settings section
    And I search for "Equipment Type" section
    Then I check the page header is "Equipment Type"
    And I check the page sub-header is "View and manage your assignable equipment types."
    And I check the data table headers are displayed and are correct for equipment types

  @DEV-3630
  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @DEV-3631
  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    When I click the page info back button
    Then I check the page header is "Settings"

  @DEV-3634
  @severity:normal
  Scenario: Verify that the "Add New Equipment Type" modal closes when the user clicks the "Cancel" or "Close" button.
    Given I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    And I click add new type button
    And I click the cancel button
    Then I verify the new equipment type modal is closed
    And I click add new type button
    And I click the close button
    Then I verify the new equipment type modal is closed

  @DEV-3635
  @severity:normal
  Scenario: Verify that the required fields' error messages are displayed in the "Add New Equipment Type" modal.
    Given I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    And I click add new type button
    And I click the submit button
    Then I check the required error labels are displayed for equipment types

  @DEV-2944
  @severity:critical
  Scenario: Verify that the user can create a new Equipment Type with a complete form and validate the data persistence in the Equipment Types table.
    Given I remove all test equipment types data
    And  I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    And I click add new type button
    And I fill in the new equipment type info
      | code                        | label                           | description                                        | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | heightMinimum | volumeLimit | volumeUoM | averageOperatingSpeed | speedUoM | verticalSpeed |
      | automationEquipmentTypeCode | Automation equipment type label | This is a equipment type added by automation suite | Dynamic  | 12          | 2           | TON       | 50          | FT        | 2             | 10          | GAL       | 2                     | ft/s     | 2             |
    And I click the submit button
    Then I check the snackbar message is "Successfully added new equipment type: Automation equipment type label"
    When I filter by column: "Code" on the equipment types section
    And I filter by text "automationEquipmentTypeCode" on the equipment types term filter and ensure that a record is displayed
    Then I verify that the previously saved equipment types info is displayed on the table as follows
      | row | code                        | label                           | description                                        | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | volumeLimit | volumeUoM | averageOperatingSpeed | speedUoM | verticalSpeed | currencyUoM |
      | 1   | automationEquipmentTypeCode | Automation equipment type label | This is a equipment type added by automation suite | Dynamic  | 12          | 2           | TON       | 50          | FT        | 10          | GAL       | 2                     | ft/s     | 2             | USD         |
    And I remove all test equipment types data

  @DEV-3636
  @severity:critical
  Scenario: Verify that the user can create a new Equipment Type with mandatory fields only and validate the data persistence in the Equipment Types table.
    Given I remove all test equipment types data
    And  I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    And I click add new type button
    And I fill in the new equipment type info
      | code                        | label                           | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | heightMinimum | volumeLimit | volumeUoM | averageOperatingSpeed | speedUoM | verticalSpeed |
      | automationEquipmentTypeCode | Automation equipment type label | Dynamic  | 12          | 2           | TON       | 50          | FT        | 2             | 10          | GAL       | 2                     | ft/s     | 2             |
    And I click the submit button
    Then I check the snackbar message is "Successfully added new equipment type: Automation equipment type label"
      When I filter by column: "Code" on the equipment types section
    And I filter by text "automationEquipmentTypeCode" on the equipment types term filter and ensure that a record is displayed
    Then I verify that the previously saved equipment types info is displayed on the table as follows
      | row | code                        | label                           | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | volumeLimit | volumeUoM | averageOperatingSpeed | speedUoM | verticalSpeed | currencyUoM |
      | 1   | automationEquipmentTypeCode | Automation equipment type label | Dynamic  | 12          | 2           | TON       | 50          | FT        | 10          | GAL       | 2                     | ft/s     | 2             | USD         |
    And I remove all test equipment types data

  @DEV-3637
  @severity:normal
  Scenario: Verify the persistence of data in the edit form after creation.
    Given I remove all test equipment types data
    And I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    And I click add new type button
    And I fill in the new equipment type info
      | code                        | label                           | description                                        | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | heightMinimum | volumeLimit | volumeUoM | averageOperatingSpeed | speedUoM | verticalSpeed |
      | automationEquipmentTypeCode | Automation equipment type label | This is a equipment type added by automation suite | Dynamic  | 12          | 2           | TON       | 50          | FT        | 2             | 10          | GAL       | 2                     | ft/s     | 2             |
    And I click the submit button
      When I filter by column: "Code" on the equipment types section
    And I filter by text "automationEquipmentTypeCode" on the equipment types term filter and ensure that a record is displayed
    And I click the edit button
    Then I verify that the previously saved equipment type info is displayed on the edit equipment type form
      | code                        | label                           | description                                        | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | heightMinimum | volumeLimit | volumeUoM | averageOperatingSpeed | speedUoM | verticalSpeed |
      | automationEquipmentTypeCode | Automation equipment type label | This is a equipment type added by automation suite | dynamic  | 12          | 2           | TON       | 50          | FT        | 2             | 10          | GAL       | 2                     | ft/s     | 2             |
    And I remove all test equipment types data

  @DEV-2945
  @severity:critical
  Scenario: Verify that the user can edit an Equipment Type and confirm the updated data in the Equipment Types table.
    Given I remove all test equipment types data
    And I create an equipment type thru grahpql endpoint
    And I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
      When I filter by column: "Code" on the equipment types section
    And I filter by text "AUTOMATION EQUIPMENT TYPE FOR EDIT" on the equipment types term filter and ensure that a record is displayed
    And I click the edit button
    And I fill in the new equipment type info
      | code                               | label                                   | description                                              | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | heightMinimum | volumeLimit | volumeUoM | averageOperatingSpeed | speedUoM | verticalSpeed |
      | automationEquipmentTypeCodeUpdated | Automation equipment type label updated | This is an edited equipment type by automation test case | Static   | 10          | 1           | TRO       | 40          | YD        | 1             | 5           | CF        | 5                     | ft/min   | 5             |
    And I click the submit button
    Then I check the snackbar message is "Successfully updated equipment type: Automation equipment type label updated"
      When I filter by column: "Code" on the equipment types section
    And I filter by text "automationEquipmentTypeCodeUpdated" on the equipment types term filter and ensure that a record is displayed
    Then I verify that the previously saved equipment types info is displayed on the table as follows
      | row | code                               | label                                   | description                                              | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | volumeLimit | volumeUoM | averageOperatingSpeed | speedUoM | verticalSpeed | currencyUoM |
      | 1   | automationEquipmentTypeCodeUpdated | Automation equipment type label updated | This is an edited equipment type by automation test case | Static   | 10          | 1           | TRO       | 40          | YD        | 5           | CF        | 5                     | ft/min   | 5             | USD         |
    And I remove all test equipment types data

  @DEV-2946
  @severity:critical
  Scenario: Verify that the user can delete an Equipment Type and confirm its successful deletion.
    Given I remove all test equipment types data
    And I create an equipment type thru grahpql endpoint
    And I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
      When I filter by column: "Code" on the equipment types section
    And I filter by text "AUTOMATION EQUIPMENT TYPE FOR EDIT" on the equipment types term filter and ensure that a record is displayed
    And I click the edit button
    And I click the delete button
    Then I check the snackbar message is "Successfully deleted equipment type: Automation equipment type label"
      When I filter by column: "Code" on the equipment types section
    And  I filter by text "AUTOMATION EQUIPMENT TYPE FOR EDIT" on equipment type term filter
    Then I verify "no results" is displayed on the equipment types table
    And I remove all test equipment types data

  @DEV-3678
  @severity:normal
  Scenario: Verify that the user cannot create an equipment type with a duplicate equipment type code during equipment type creation.
    Given I remove all test equipment types data
    And I create an equipment type thru grahpql endpoint
    And  I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    And I click add new type button
    And I fill in the new equipment type info
      | code                               | label                                   | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | heightMinimum | volumeLimit | volumeUoM | averageOperatingSpeed | speedUoM | verticalSpeed |
      | AUTOMATION EQUIPMENT TYPE FOR EDIT | Automation equipment type label updated | Dynamic  | 12          | 2           | TON       | 50          | FT        | 2             | 10          | GAL       | 2                     | ft/s     | 2             |
    And I click the submit button
    Then I check the snackbar error message is "EquipmentType not unique by code"

  @DEV-3679
  @severity:normal
  Scenario: Verify that the user cannot create an equipment type with a duplicate equipment type label during equipment type creation.
    Given I remove all test equipment types data
    And I create an equipment type thru grahpql endpoint
    And  I am on the "equipment/types" page
    Then I check the page header is "Equipment Type"
    And I click add new type button
    And I fill in the new equipment type info
      | code                               | label                           | mobility | costPerHour | weightLimit | weightUoM | heightLimit | heightUoM | heightMinimum | volumeLimit | volumeUoM | averageOperatingSpeed | speedUoM | verticalSpeed |
      | automationEquipmentTypeCodeUpdated | Automation equipment type label | Dynamic  | 12          | 2           | TON       | 50          | FT        | 2             | 10          | GAL       | 2                     | ft/s     | 2             |
    And I click the submit button
    Then I check the snackbar error message is "EquipmentType not unique by label"