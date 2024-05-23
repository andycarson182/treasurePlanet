Feature: E2E Case R1 - Ingestion completing license plate b2b & putaway task

  As a logged-in fulfilld user
  I want to test ingestion completing license plate b2b & putaway task

  @DEV-2989
  Scenario: Verify on Ingestion, Receipt From Production task, license Plate b2b and putaway task are created and have the right task status
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
    Then I see the "License plate bin to bin" task was created in the row "2" in the license plate tasks table
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
    Then I see the "Putaway license plate" task was created in the row "1" in the license plate tasks table
    Then I see the task status is "Not Started" in the row "1" in the license plate tasks table
    Then I see the "License plate bin to bin" task was created in the row "2" in the license plate tasks table
    Then I see the task status is "Complete" in the row "2" in the license plate tasks table
    Then I see the "Receipt From Production" task was created in the row "3" in the license plate tasks table
    Then I see the task status is "Complete" in the row "3" in the license plate tasks table
    And I save the destination bin of the row "1" in the license plate tasks table
    When I enter the ingested LP in the search bar
    And I select the searched "putaway" task
    And I click the bad code button
    When I enter the ingested LP
    And I click search button
    And I click the bad code button
    And I enter the assigned destination bin of the License Plate b2b
    And I click search button
    When I refresh the current page
    Then I see the "Putaway license plate" task was created in the row "1" in the license plate tasks table
    Then I see the task status is "Complete" in the row "1" in the license plate tasks table
    Then I see the "License plate bin to bin" task was created in the row "2" in the license plate tasks table
    Then I see the task status is "Complete" in the row "2" in the license plate tasks table
    Then I see the "Receipt From Production" task was created in the row "3" in the license plate tasks table
    Then I see the task status is "Complete" in the row "3" in the license plate tasks table