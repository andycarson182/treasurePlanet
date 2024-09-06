Feature: Test the Inventory Section

  As a logged-in fulfilld user
  I want to test the inventory section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  @severity:minor
  Scenario: Verify elements visibility - Current Inventory to Inventory Counting
    And I open the inventory section
    And I check the page header is "Inventory"
    And I check the data table headers are displayed and are correct for "inventory"
    And I select "Inventory Counting" inventory tab
    And I check the page header is "Inventory"
    And I check the data table headers are displayed and are correct for "inventory counting"
    And I click the inventory conting actions button
    And I check the inventory counting actions menu options

  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "inventory/bin" page
    And I check the page header is "Inventory"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @severity:normal
  Scenario: Verify that the user is able to make a resolution of the inventory discrepancies.
    And I am on the "inventory/bin" page
    And I open the inventory section
    And I click the bin level dropdown
    And I select "License Plate Level" as level menu
    And I set the inventory license plate filter by column to "Ledger Sync Status"
    And I set the inventory license plate filter on to "Failed"
    Then I save the license plate code listed  on the license plate table of the row "1"
    And  I click the ledger sync status link of the row "1"
    And I check the page sub-header is "View & manage inventory conflicts for a specific License Plate"
    And I click the resolve conflicts button
    Then I verify the modal title is "Conflict Can't Be Resolved, License Plate Does Not Exist"
    And I verify the modal description is "License Plate could not be found in the ERP system..."
    And I click the submit button
    Then I verify the confirmation modal title is "Cancel License Plate ..."
    And I verify the confirmation modal description is "You are about to cancel the License Plate below and create an Issue Stock task, please confirm below."
    And I click the submit button
    Then I check the success inventory conflict snackbar message is "License Plate has been canceled and an Issue Stock task was successfully created."
    And I verify the modal title is "License Plate Issued Out"
    And I verify the modal description is "License Plate has been issued out of your inventory"
    And I click the submit button
    And I check the page header is "Inventory Reconciliation"
    And I enter the saved license plate code on the filter on term
    Then I verify "no results" is displayed on the inventory table

  @severity:normal
  Scenario: Verify that the user is able to make a resolution of the inventory discrepancies.
    And I am on the "inventory/bin" page
    And I open the inventory section
    And I click the bin level dropdown
    And I select "License Plate Level" as level menu
    And I set the inventory license plate filter by column to "Ledger Sync Status"
    And I set the inventory license plate filter on to "Unknown"
    Then I save the license plate code listed  on the license plate table of the row "1"
    And  I click the ledger sync status link of the row "1"
    And I check the page sub-header is "View & manage inventory conflicts for a specific License Plate"
    And I click the resolve conflicts button
    Then I verify the modal title is "Conflict Can't Be Resolved, License Plate Does Not Exist"
    And I verify the modal description is "License Plate could not be found in the ERP system..."
    And I click the submit button
    Then I verify the confirmation modal title is "Cancel License Plate ..."
    And I verify the confirmation modal description is "You are about to cancel the License Plate below and create an Issue Stock task, please confirm below."
    And I click the submit button
    Then I check the success inventory conflict snackbar message is "License Plate has been canceled and an Issue Stock task was successfully created."
    And I verify the modal title is "License Plate Issued Out"
    And I verify the modal description is "License Plate has been issued out of your inventory"

  @severity:normal
  Scenario: Verify that the user is not able to make a resolution of the inventory discrepancies if there is open tasks.
    Given  I cleaned open tasks
    And I remove all license plates stock from inventory
    Then I create stock from production
    And I am on the "inventory/bin" page
    And I open the inventory section
    And I click the bin level dropdown
    And I select "License Plate Level" as level menu
    And I filter by License Plate "randomLicensePlateNumber"
    And  I click the ledger sync status link of the row "1"
    And I check the page sub-header is "View & manage inventory conflicts for a specific License Plate"
    Then I verify the resolve conflicts button is "disabled"
    And I verify the tooltip message is "Conflict cannot be resolved because the License Plate has open tasks."

  @severity:critical
  Scenario: Verify that the user is able to make a resolution of the inventory discrepancies using SAP data.
    Given  I cleaned open tasks
    And I remove stock from inventory for the license plate code "00200237000010000140"
    When I ingest a LP with the following information
      | storageBin | storageUnit          | material | totalQuantity | warehouse | baseUoM | batch      |
      | PALLETIZER | 00200237000010000140 | FG29     | 1             | BGK       | BT      | 0000000048 |
    And I am on the "inventory/bin" page
    And I open the inventory section
    And I click the bin level dropdown
    And I select "License Plate Level" as level menu
    And I filter by License Plate "00200237000010000140"
    And I click the refresh table button
    Then I verify the ledger sync status of the row "1" is "Failed"
    And  I click the ledger sync status link of the row "1"
    And I check the page sub-header is "View & manage inventory conflicts for a specific License Plate"
    Then I verify the resolve conflicts button is "disabled"
    And I verify the tooltip message is "Conflict cannot be resolved because the License Plate has open tasks."
    Then I complete the license plate bin to bin task for the license plate code "00200237000010000140" thru graphql api
    And I complete the putaway task for the license plate code "00200237000010000140" thru graphql api
    Then I refresh the current page
    And I verify the resolve conflicts button is "enabled"
    And I click the resolve conflicts button
    Then I check the snackbar message is "License Plate 00200237000010000140 has been successfully reconciled."
    And I verify the fulfilld values match with SAP value
    And I click the page info back button
    And I filter by License Plate "00200237000010000140"
    And I click the refresh table button
    Then I verify the ledger sync status of the row "1" is "Successful"

