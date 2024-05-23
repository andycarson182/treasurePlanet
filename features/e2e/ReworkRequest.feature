Feature: E2E Case R1 - Rework/Consolidation Request

  As a logged-in fulfilld user
  I want to test Rework Request

  @DEV-2997
  Scenario: Verify the user is able to create a rework stock request
    Given I create stock from production
    Given I changed the opened tasks for ingested LP to canceled
    Given I am on the login page
    When I login in fulfilld app
    And I open the inventory section
    And I click the bin level dropdown
    And I select "License Plate Level" as level menu
    And I filter by License Plate "randomLicensePlateNumber"
    And I select the checkbox row of the positon "1"
    And I click the license plate actions button
    And I select the "Rework Stock Request" action option
    Then I check the modal header is "Generate Tasks for a Rework Stock Request"
    And I click the submit button
    Then I check the snackbar message is "Successfully created rework stock request."
    And I select the first element of the table
    Then I see the "License plate bin to bin" task was created in the row "1" in the license plate tasks table
    Then I see the task status is "Not Started" in the row "1" in the license plate tasks table
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
    And I enter "REWORK" as destination bin
    And I click search button
    When I refresh the current page
    Then I see the "License plate bin to bin" task was created in the row "1" in the license plate tasks table
    Then I see the task status is "Complete" in the row "1" in the license plate tasks table
