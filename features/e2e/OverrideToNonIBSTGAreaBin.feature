Feature: E2E Case R1 - B2B Override / Task Take-over - Overflow or IB Manual Workstation Area Bin - Palletizer > Overflow / Man IB station > IB Stage > FG Storage
  As a logged-in fulfilld user
  I want to test B2B Override happy path

  @DEV-3144
  Scenario: Verify user is able to override to non-IB STG area bin
    Given  I cleaned open tasks
    And I remove all license plates stock from inventory
    Then I create stock from production
    Given I login in mobile fulfilld app
    When I enter the ingested LP in the search bar
    And I select the searched "b2b" task
    And I click the bad code button
    When I enter "PALLETIZER-01" as source bin
    And I click search button
    And I click the bad code button
    When I enter the ingested LP
    And I click search button
    And I click overrite bin button
    And I click the bad code button
    And I enter "MAN-IB-STATION" as destination bin
    And I click search button
    And I am on the login page
    When I login in fulfilld app
    And I open the inventory section
    And I click the bin level dropdown
    And I select "License Plate Level" as level menu
    And I filter by License Plate "randomLicensePlateNumber"
    And I select the first element of the table
    Then I see the "Putaway license plate" task was created in the row "1" in the license plate tasks table
    Then I see the task status is "Cancelled" in the row "1" in the license plate tasks table
    Then I see the "License plate bin to bin" task was created in the row "2" in the license plate tasks table
    Then I see the task status is "Complete" in the row "2" in the license plate tasks table
    Then I see the "Receipt From Production" task was created in the row "3" in the license plate tasks table
    Then I see the task status is "Complete" in the row "3" in the license plate tasks table
    And I save the destination bin of the row "2" in the license plate tasks table
    And  I click the page info back button
    And I filter by License Plate "randomLicensePlateNumber"
    And I click the first checkbox in the inventory table
    And I click the license plate actions button
    And I select the "Move License Plate(s)" action option
    Then I check the modal header is "Move License Plate from Bin to Bin"
    And I select "IB-FG-STG-05-02" as destination bin in the move license plante b2b modal
    And I click the "mark as complete" checkbox in the move license plante b2b modal
    Then I click the submit button
    And I select the first element of the table
    Then I see the "License plate bin to bin" task was created in the row "1" in the license plate tasks table
    Then I see the task status is "Not Started" in the row "1" in the license plate tasks table
    Then I see the "Putaway license plate" task was created in the row "2" in the license plate tasks table
    Then I see the task status is "Cancelled" in the row "2" in the license plate tasks table
    Then I see the "License plate bin to bin" task was created in the row "3" in the license plate tasks table
    Then I see the task status is "Complete" in the row "3" in the license plate tasks table
    Then I see the "Receipt From Production" task was created in the row "4" in the license plate tasks table
    Then I see the task status is "Complete" in the row "4" in the license plate tasks table
    And I save the destination bin of the row "1" in the license plate tasks table
    When I enter the ingested LP in the search bar
    And I select the searched "b2b" task
    And I click the bad code button
    When I enter "MAN-IB-STATION" as source bin
    And I click search button
    And I click the bad code button
    When I enter the ingested LP
    And I click search button
    And I click the bad code button
    And I enter "IB-FG-STG-05-02" as destination bin
       # Check this one with Jhon the putaway license plate is not generated
    And I click search button
    # When I refresh the current page

    # Then I see the "Putaway license plate" task was created in the row "1" in the license plate tasks table
    # Then I see the task status is "Not Started" in the row "1" in the license plate tasks table
    # Then I see the "License plate bin to bin" task was created in the row "2" in the license plate tasks table
    # Then I see the task status is "Complete" in the row "2" in the license plate tasks table
    # Then I see the "Putaway license plate" task was created in the row "3" in the license plate tasks table
    # Then I see the task status is "Cancelled" in the row "3" in the license plate tasks table
    # Then I see the "License plate bin to bin" task was created in the row "4" in the license plate tasks table
    # Then I see the task status is "Complete" in the row "4" in the license plate tasks table
    # Then I see the "Receipt From Production" task was created in the row "5" in the license plate tasks table
    # Then I see the task status is "Complete" in the row "5" in the license plate tasks table
    # And I save the destination bin of the row "1" in the license plate tasks table
    # When I enter the ingested LP in the search bar
    # And I select the searched "putaway" task
    # And I click the bad code button
    # When I enter the ingested LP
    # And I click search button
    # And I click the bad code button
    # And I enter the assigned destination bin of the License Plate b2b
    # And I click search button
    # When I refresh the current page
    # Then I see the "Putaway license plate" task was created in the row "1" in the license plate tasks table
    # Then I see the task status is "Complete" in the row "1" in the license plate tasks table
