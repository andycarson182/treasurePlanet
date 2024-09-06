Feature: E2E Case R1 - Override Final Destination Bin in FG Storage

  As a logged-in fulfilld user
  I want to test Override Final Destination Bin in FG Storage

  @DEV-2992
  Scenario: Verify user is able to override final destination bin in FG Storage
    Given  I cleaned open tasks
    And I remove all license plates stock from inventory
    Then I create stock from production
    And I am on the login page
    When I login in fulfilld app
    And I open the inventory section
    And I click the bin level dropdown
    And I select "License Plate Level" as level menu
    And I filter by License Plate "randomLicensePlateNumber"
    And I select the first element of the table
    Then I see the "Putaway license plate" task was created in the row "1" in the license plate tasks table
    Then I see the task status is "Planned" in the row "1" in the license plate tasks table
    Then I see the "License plate task" task was created in the row "2" in the license plate tasks table
    Then I see the task status is "Not Started" in the row "2" in the license plate tasks table
    Then I see the "Receipt From Production" task was created in the row "3" in the license plate tasks table
    Then I see the task status is "Complete" in the row "3" in the license plate tasks table
    And I save the destination bin of the row "2" in the license plate tasks table
    Given I login in mobile fulfilld app
    When I enter the ingested LP in the search bar
    And I select the searched "b2b" task
    And I click the bad code button
    When I enter "PALLETIZER-01" as source bin
    And I click search button
    And I click the bad code button
    When I enter the ingested LP
    And I click search button
    And I click the bad code button
    And I enter the assigned destination bin of the License Plate b2b
    And I click search button
    When I refresh the current page
    When I enter the ingested LP in the search bar
    And I select the searched "putaway" task
    And I click the bad code button
    When I enter the ingested LP
    And I click search button
    And I click the bad code button
    And I enter "07262" as destination bin
    Then I verify the unexpected bin message is: "savedDestinationBin" expected but "07262" was scanned.
