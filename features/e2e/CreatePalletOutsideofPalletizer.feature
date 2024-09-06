Feature: E2E Case R1 - Create/Receive Pallet Outside of Palletizer

  As a logged-in fulfilld user
  I want to test Create/Receive Pallet Outside of Palletizer

  @DEV-2990
  Scenario: Verify FF user is able to create/receive pallet outside of palletizer
    Given  I cleaned open tasks
    And I remove all license plates stock from inventory
    When I login in mobile fulfilld app
    And I click the plus action button
    And I click the manual receiving button
    And I click the bad code button
    And I enter "PALLETIZER-01" as source bin
    And I click search button
    And I enter a random license plate number
    And I click search button
    And I click the enter case detail manually button
    And I enter the product code "FG226"
    And I select the filtered product
    And I click the confirm button
    And I enter the lot code "0000000083"
    And I click the confirm button
    And I enter the process order "Process_Order_zyx"
    And I click the confirm button
    And I enter the manual receiving quantity "5"
    And I click the confirm quantity button
    And I click the confirm button
    Given I am on the login page
    When I login in fulfilld app
    And I open the inventory section
    And I click the bin level dropdown
    And I select "License Plate Level" as level menu
    And I filter by License Plate "manualReceivingRandomLicensePlateNumber"
    And I select the first element of the table
    And  I refresh the current page
    Then I see the "Putaway license plate" task was created in the row "1" in the license plate tasks table
    Then I see the task status is "Planned" in the row "1" in the license plate tasks table
    Then I see the "License plate task" task was created in the row "2" in the license plate tasks table
    Then I see the task status is "Not Started" in the row "2" in the license plate tasks table
    Then I see the "Receipt From Production" task was created in the row "3" in the license plate tasks table
    Then I see the task status is "Complete" in the row "3" in the license plate tasks table
    And I save the destination bin of the row "2" in the license plate tasks table
    When I enter the created manual receiving random license plate in the search bar
    And I select the searched "b2b" task
    And I click the bad code button
    When I enter "PALLETIZER-01" as source bin
    And I click search button
    And I click the bad code button
    When I enter the manual receiving random license plate
    And I click search button
    And I click the bad code button
    And I enter the assigned destination bin of the License Plate b2b
    And I click search button
    When I refresh the current page
    Then I see the "Putaway license plate" task was created in the row "1" in the license plate tasks table
    Then I see the task status is "Not Started" in the row "1" in the license plate tasks table
    Then I see the "License plate task" task was created in the row "2" in the license plate tasks table
    Then I see the task status is "Complete" in the row "2" in the license plate tasks table
    Then I see the "Receipt From Production" task was created in the row "3" in the license plate tasks table
    Then I see the task status is "Complete" in the row "3" in the license plate tasks table
    And I save the destination bin of the row "1" in the license plate tasks table
    When I enter the created manual receiving random license plate in the search bar
    And I select the searched "putaway" task
    And I click the bad code button
    When I enter the manual receiving random license plate
    And I click search button
    And I click the bad code button
    And I enter the assigned destination bin of the License Plate b2b
    And I click search button
    When I refresh the current page
    Then I see the "Putaway license plate" task was created in the row "1" in the license plate tasks table
    Then I see the task status is "Complete" in the row "1" in the license plate tasks table
    Then I see the "License plate task" task was created in the row "2" in the license plate tasks table
    Then I see the task status is "Complete" in the row "2" in the license plate tasks table
    Then I see the "Receipt From Production" task was created in the row "3" in the license plate tasks table
    Then I see the task status is "Complete" in the row "3" in the license plate tasks table