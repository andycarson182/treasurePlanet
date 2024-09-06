@DEV-3605
Feature: Test the Slotting Dashboard section

  As a logged-in fulfilld user
  I want to test the Slotting Dashboard section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  @DEV-3606
  @severity:minor
  Scenario: Verify the visibility of elements in the Slotting Dashboard section.  
   Given I am on the "slotting/dashboard/newest" page
   Then I check the page header is "Slotting Dashboard"
    And I check the page sub-header is "View Notifications, the latest Simulation, and the most recent Deployment"
    # And I click the create new simulation button
    # And I click the data set stard date field
    # And I select day "1" as data set start day picker
    # And  I select day "20" as data set end day picker
    # And I click the submit button

