Feature: Create/Receive Pallet Outside of Palletizer

  As a logged-in fulfilld user
  I want to test Create/Receive Pallet Outside of Palletizer

  @skip
  #https://fulfilld.atlassian.net/browse/DEV-2838
  Scenario Outline: Verify FF user is able to create/receive pallet outside of palletizer
    Given I login in mobile fulfilld app
    And I click the plus action button
    And I click the manual receiving button
    And I click the bad code button
    And I enter "01011" as destination bin
    And I click search button
    And I enter a random License Plate number
    And I click search button
    And I click the enter case detail manually button
    And I enter the product code "FG226"
    And I select the filtered product
    And  I click the select product button
    And  I enter the lot code "0000000083"
    And I click the confirm button
    And I enter the process order "Process_Order_zyx"
    And I click the confirm button
    And I enter the manual receiving quantity "10"
    And I click the confirm quantity button
    And I click the confirm button


