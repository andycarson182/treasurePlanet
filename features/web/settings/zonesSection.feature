@DEV-3574
Feature: Test the Zones section

  As a logged-in fulfilld user
  I want to test the zones section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And I remove all test zones

  @DEV-3617
  @severity:minor
  Scenario: Verify the visibility of elements in the Zones section.
    Given I open the settings section
    And I search for "Zones" section
    Then I check the page header is "Zones"
    And I check the page sub-header is "View and manage warehouse zones."
    And I check the data table headers are displayed and are correct for zones

  @DEV-3618
  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "zones" page
    Then I check the page header is "Zones"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @DEV-3619
  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "zones" page
    Then I check the page header is "Zones"
    When I click the page info back button
    Then I check the page header is "Settings"

  @DEV-3620
  @severity:normal
  Scenario: Verify that the "Add New Zone" modal closes when the user clicks the "Cancel" or "Close" button.
    Given I am on the "zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I click the cancel button
    Then I verify the new zone modal is closed
    And I click add new zone button
    And I click the close button
    Then I verify the new zone modal is closed

  @DEV-3621
  @severity:normal
  Scenario: Verify that the required fields' error messages are displayed in the "Add New Zone" modal.
    Given I am on the "zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I click the next button
    Then I check the required error labels are displayed for zone creation modal

  @DEV-2953
  @severity:critical
  Scenario: Verify the user can create a New Zone with a Complete Form (Putaway Behavior and Half Pallet UoM Restriction) and Validate Data Persistence in the Zones Table.
    Given I remove all test zones
    And  I am on the "zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I fill in the new zone info
      | code               | name            | description                                |
      | automationZoneCode | Automation Zone | This is a zone created by automation suite |
    And I click the next button
    And I fill in the optimize info
      | behaviorUnitOfMeasureRestrictions | behaviors | uomRestrictions |
      | yes                               | Putaway   | Half Pallet     |
    And I click the submit button
    Then I check the snackbar message is "Successfully created zone: Automation Zone"
    When I filter by column: "Code" on the zones section
    And I filter by text "automationZoneCode" on the zones term filter and ensure that a record is displayed
    Then I verify that the previously saved zone info is displayed on the table as follows
      | row | code               | name            | description                                | warehouse    | putawayUoMRestrictions |
      | 1   | automationZoneCode | Automation Zone | This is a zone created by automation suite | Denver - BGK | Half Pallet            |
    And I remove all test zones

  @DEV-3958
  @severity:critical
  #https://fulfilld.atlassian.net/browse/DEV-3956
  Scenario: [BUG:DEV-3956] Verify the user can create a New Zone with a Complete Form (Pick Behavior and Yard UoM Restriction) and Validate Data Persistence in the Zones Table.
    Given I remove all test zones
    And  I am on the "zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I fill in the new zone info
      | code               | name            | description                                |
      | automationZoneCode | Automation Zone | This is a zone created by automation suite |
    And I click the next button
    And I fill in the optimize info
      | behaviorUnitOfMeasureRestrictions | behaviors | uomRestrictions |
      | yes                               | Pick      | Yard            |
    And I click the submit button
    Then I check the snackbar message is "Successfully created zone: Automation Zone"
    When I filter by column: "Code" on the zones section
    And I filter by text "automationZoneCode" on the zones term filter and ensure that a record is displayed
    Then I verify that the previously saved zone info is displayed on the table as follows
      | row | code               | name            | description                                | warehouse    | pickUoMRestrictions |
      | 1   | automationZoneCode | Automation Zone | This is a zone created by automation suite | Denver - BGK | Yard                |
    And I remove all test zones

  @DEV-3959
  @severity:critical
  Scenario: Scenario: Verify the user can create a New Zone with a Complete Form (Replenishment Behavior and Item Sync Display UoM Restriction) and Validate Data Persistence in the Zones Table.
    Given I remove all test zones
    And  I am on the "zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I fill in the new zone info
      | code               | name            | description                                |
      | automationZoneCode | Automation Zone | This is a zone created by automation suite |
    And I click the next button
    And I fill in the optimize info
      | behaviorUnitOfMeasureRestrictions | behaviors     | uomRestrictions   |
      | yes                               | Replenishment | Item Sync Display |
    And I click the submit button
    Then I check the snackbar message is "Successfully created zone: Automation Zone"
    When I filter by column: "Code" on the zones section
    And I filter by text "automationZoneCode" on the zones term filter and ensure that a record is displayed
    Then I verify that the previously saved zone info is displayed on the table as follows
      | row | code               | name            | description                                | warehouse    | replenishmentUoMRestrictions |
      | 1   | automationZoneCode | Automation Zone | This is a zone created by automation suite | Denver - BGK | Item Sync Display            |
    And I remove all test zones

  @DEV-3623
  @severity:critical
  Scenario: Verify that the user can create a new zone with mandatory fields only and validate the data persistence in the Zones table.
    Given I remove all test zones
    And  I am on the "zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I fill in the new zone info
      | code               | name            |
      | automationZoneCode | Automation Zone |
    And I click the next button
    And I click the submit button
    Then I check the snackbar message is "Successfully created zone: Automation Zone"
    When I filter by column: "Code" on the zones section
    And I filter by text "automationZoneCode" on the zones term filter and ensure that a record is displayed
    Then I verify that the previously saved zone info is displayed on the table as follows
      | row | code               | name            | warehouse    |
      | 1   | automationZoneCode | Automation Zone | Denver - BGK |
    And I remove all test zones

  @DEV-3622
  @severity:normal
  Scenario: Verify the persistence of data in the edit form after creation.
    Given I remove all test zones
    And  I am on the "zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I fill in the new zone info
      | code               | name            | description                                |
      | automationZoneCode | Automation Zone | This is a zone created by automation suite |
    And I click the next button
    And I fill in the optimize info
      | behaviorUnitOfMeasureRestrictions | behaviors | uomRestrictions |
      | yes                               | Putaway   | Half Pallet     |
    And I click the submit button
    When I filter by column: "Code" on the zones section
    And I filter by text "automationZoneCode" on the zones term filter and ensure that a record is displayed
    And I click the edit button
    Then I verify that the previously saved zone info is displayed on the edit zone form
      | code               | name            | description                                |
      | automationZoneCode | Automation Zone | This is a zone created by automation suite |
    And I click the next button
    Then I verify that the previously saved optimized info is displayed on the edit zone form
      | behaviorUnitOfMeasureRestrictions | behaviors | uomRestrictions   |
      | yes                               | Putaway   | Half Pallet - HPT |
    And I remove all test zones

  @DEV-2954
  @severity:critical
  #https://fulfilld.atlassian.net/browse/DEV-3989
  Scenario: [BUG:DEV-3989]Verify that the user can edit a zone and confirm the updated data in the zones table.
    Given I remove all test zones
    And  I create a zone thru grahpql endpoint
    And  I am on the "zones" page
    Then I check the page header is "Zones"
    When I filter by column: "Code" on the zones section
    And I filter by text "AUTOMATION ZONE FOR EDIT" on the zones term filter and ensure that a record is displayed
    And I click the edit button
    And I fill in the new zone info
      | code                      | name                    | description                                    |
      | automationZoneCodeUpdated | Automation Zone Updated | This is an edited zone by automation test case |
    And I click the next button
    And I delete the picking uom "Half Pallet - HPT"
    And I fill in the optimize info
      | behaviorUnitOfMeasureRestrictions | behaviors     | uomRestrictions   |
      | yes                               | Replenishment | Item Sync Display |
    And I click the submit button
    Then I check the snackbar message is "Successfully updated zone: Automation Zone Updated"
    When I filter by column: "Code" on the zones section
    And I filter by text "automationZoneCodeUpdated" on the zones term filter and ensure that a record is displayed
    Then I verify that the previously saved zone info is displayed on the table as follows
      | row | code                      | name                    | description                                    | warehouse    | replenishmentUoMRestrictions |
      | 1   | automationZoneCodeUpdated | Automation Zone Updated | This is an edited zone by automation test case | Denver - BGK | Item Sync Display            |
    And I remove all test zones

  @DEV-2955
  @severity:critical
  Scenario: Verify that the user can delete a zone and confirm its successful deletion.
    Given I remove all test zones
    And  I create a zone thru grahpql endpoint
    And I am on the "zones" page
    Then I check the page header is "Zones"
    When I filter by column: "Code" on the zones section
    And I filter by text "AUTOMATION ZONE FOR EDIT" on the zones term filter and ensure that a record is displayed
    And I click the edit button
    And I click the delete button
    Then I check the snackbar message is "Successfully deleted zone: Automation Zone"
    When I filter by column: "Code" on the zones section
    And  I filter by text"Automation Zone" on zone term filter
    Then I verify "no results" is displayed on the zones table
    And I remove all test zones

  @DEV-3677
  @severity:normal
  Scenario: Verify that the user cannot create a zone with a duplicate zone code during zone creation.
    Given I remove all test zones
    And  I create a zone thru grahpql endpoint
    And  I am on the "zones" page
    Then I check the page header is "Zones"
    And I click add new zone button
    And I fill in the new zone info
      | code                     | name                 |
      | AUTOMATION ZONE FOR EDIT | Automation Zone Test |
    And I click the next button
    And I click the submit button
    Then I check the snackbar error message is "Zone not unique by code,warehouseId"

