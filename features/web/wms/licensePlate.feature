@skip
Feature: Test the License Plate Detail Section

  As a logged-in fulfilld user
  I want to test the License Plate Detail Section

  @severity:trivial 
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  @severity:critical 
  Scenario Outline: As FF user go to License Plate Level and check auto generated tasks type and status
    Given  I cleaned open tasks
    And I remove all license plates stock from inventory
    Then I create stock from production
    Given I open the inventory section
    And I click the bin level dropdown
    And I select "License Plate Level" as level menu
    When I create stock from production
    And I filter by License Plate "randomLicensePlateNumber"
    And I select the first element of the table
    Then I see the "Putaway license plate" task was created in the row "1" in the license plate tasks table
    Then I see the task status is "Planned" in the row "1" in the license plate tasks table
    Then I see the "License plate task" task was created in the row "2" in the license plate tasks table
    Then I see the task status is "Not Started" in the row "2" in the license plate tasks table
    Then I see the "Receipt From Production" task was created in the row "3" in the license plate tasks table
    Then I see the task status is "Complete" in the row "3" in the license plate tasks table
    And  I cleaned open tasks
    And I remove all license plates stock from inventory
