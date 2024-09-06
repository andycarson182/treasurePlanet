Feature: Test the License Plate Bin to Bin task

  @DEV-3426
  @severity:normal
  Scenario: Verify that the user can perform a License Plate Bin to Bin task
    Given  I cleaned open tasks
    And I remove all license plates stock from inventory
    Given I login in mobile fulfilld app
    When I click the plus action button
    And I click the create task button
    And I click the license plate bin to bin button
    And I click the bad code button
    When I enter "PALLETIZER-01" as source bin
    And I click search button
    And I click the bad code button
    And I enter "AUTOMATIONLICENSEPLATE-833913" as license plate
    And I click search button
    And I click the bad code button
    And I enter "01015" as destination bin
    And I click search button

