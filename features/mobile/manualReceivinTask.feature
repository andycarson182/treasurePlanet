Feature: Test the manual receiving task

  @DEV-3756
  @severity:normal
  Scenario: Verify that the user can perform a manual receiving task.
    Given I login in mobile fulfilld app
    When I click the plus action button
    And I click the manual receiving button
    And I click the bad code button
    When I enter "PALLETIZER-01" as source bin
    And I click search button
    When I enter the manual receiving random license plate
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

