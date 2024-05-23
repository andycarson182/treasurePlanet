Feature: E2E Case R1 - Outbound Happy Path
  As a logged-in fulfilld user
  I want to test the Outbound happy path case

  @DEV-2993
  Scenario: Verify user is able to make an Outbound
    Given  I cleaned open tasks
    And I remove all license plates stock from inventory
    Given I am on the login page
    When I login in fulfilld app
    And I open the deliveries section
    And I clear the pre assigned data range
    And I filter by "80003685" on deliveries and fulfillment term filter
    And I select the row "1" for deliveries and fulfillments code on the deliveries and fulfillments table
    And I click the assign inventory button in the row "1"
    Then I select the first available license plate checkbox in the row "1"
    And I click the submit button
    Then I check the snackbar message is "Successfully allocated license plate to line item."
    When I refresh the current page
    Then I see the "STO Pick to Dock" task was created in the row "1" in the fulfillment tasks table
    Then I see the task status is "Not Started" in the row "1" in the fulfillment tasks table
    And I save the destination license plate code of the row "1" in the fulfillment tasks table
    And I save the destination bin code of the row "1" in the fulfillment tasks table
    Given I login in mobile fulfilld app
    And  I enter the assigned destination license plate code
    Then I select the searched "pick" task
    And I click the bad code button
    And  I enter the assigned destination license plate code
    And I click search button
    And I click the bad code button
    And  I enter the assigned destination bin code
    And I click search button
    When I refresh the current page
    Then I see the "STO Pick to Dock" task was created in the row "1" in the fulfillment tasks table
    Then I see the task status is "Complete" in the row "1" in the fulfillment tasks table
