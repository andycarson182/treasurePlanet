Feature: Ingestion completing license plate b2b & putaway task

  As a logged-in fulfilld user
  I want to test ingestion completing license plate b2b & putaway task

  Scenario Outline: Verify on Ingestion, Receipt From Production task, license Plate b2b and putaway task are created and have the right task status
    Given I create stock from production
    Given I am on the "https://fd.fulfilld.qa/auth/support/login" page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And I open the inventory Section
    And I click the bin level dropdown
    And I select "License Plate Level" as level menu
    And I filter by License Plate and select the result
    Then I see the "Putaway license plate" task was created in the row "1"
    Then I see the task status is "Planned" in the row "1"
    Then I see the "License plate bin to bin" task was created in the row "2"
    Then I see the task status is "Not Started" in the row "2"
    Then I see the "Receipt From Production" task was created in the row "3"
    Then I see the task status is "Complete" in the row "3"
    And I save the destination bin of the row "2"
    Given I login in mobile fulfilld app
    When I enter the ingested LP in the search bar
    And I select the searched License Plate Number
    And I click the bad code button
    When I enter "PALLETIZER-01" as destination bin
    And I click search button
    And I click the bad code button
    When I enter the ingested LP
    And I click search button
    And I click the bad code button
    And I enter the assigned destination bin of the License Plate b2b
    And I click search button
    When I refresh the current page
    Then I see the "Putaway license plate" task was created in the row "1"
    Then I see the task status is "Not Started" in the row "1"
    Then I see the "License plate bin to bin" task was created in the row "2"
    Then I see the task status is "Complete" in the row "2"
    Then I see the "Receipt From Production" task was created in the row "3"
    Then I see the task status is "Complete" in the row "3"
    And I save the destination bin of the row "1"
    When I enter the ingested LP in the search bar
    And I select the searched License Plate Number
    And I click the bad code button
    When I enter the ingested LP
    And I click search button
    And I click the bad code button
    And I enter the assigned destination bin of the License Plate b2b
    And I click search button
    When I refresh the current page
    Then I see the "Putaway license plate" task was created in the row "1"
    Then I see the task status is "Complete" in the row "1"
    Then I see the "License plate bin to bin" task was created in the row "2"
    Then I see the task status is "Complete" in the row "2"
    Then I see the "Receipt From Production" task was created in the row "3"
    Then I see the task status is "Complete" in the row "3"