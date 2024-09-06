Feature: Demo Script

  As a logged-in fulfilld user
  I want to test the main functionality for a demo

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  @severity:minor
  #https://fulfilld.atlassian.net/browse/DEV-4172 # fixed and tested
  Scenario: [BUG:DEV-4172]Verify the visibility of elements in the rules sets section.
    Given I am on the "/w/7c6b975e/operations" page
    # And I open the settings section
    # And I search for "Developer Tools" section
    # And I click the "Generate Random Deliveries (TC)" data generation button
    # And I wait for the loading spinner to disappear for data generation
    # And  I click the "Complete Random Unloads" data generation button
    # And I wait for the loading spinner to disappear for data generation
    # And  I click the "Complete Random Putaways" data generation button
    # And I wait for the loading spinner to disappear for data generation
    And I open the tasks section
    And I clear the pre assigned data range on tasks page
    And I filter by column: "Task Type" on the tasks section
    And I filter by value "Count bin" on tasks term filter
    And I click the refresh table button
    And I select the first result in the task table
    And I click the task details edit button
    And I fill in the edit task details info
      | dueDate |
      | today   |
    And I click the submit button
     Then I check the snackbar message is "Successfully updated task"


