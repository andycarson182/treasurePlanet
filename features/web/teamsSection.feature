Feature: Test the Teams section

  As a logged-in fulfilld user
  I want to test the team section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the "https://fd.fulfilld.qa/auth/support/login" page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    
  Scenario: Verify elements visibility for the teams section
    And I open the settings section
    And I search for "Teams" section
    Then I check the page header is "Teams"
    And I check the page sub-header is "View and manage your warehouse teams and team assignments."
    And I check the data table headers are displayed and are correct for teams

  Scenario: Verify if user clicks the page back button is routed to the settings page.
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/teams" page
    Then I check the page header is "Teams"
    When I click the page info back button
    Then I check the page header is "Settings"

  Scenario: Verify if user clicks the sidebar logo is routed to the operantions page.
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/teams" page
    Then I check the page header is "Teams"
    When I click the sideBar fulfilld logo
    Then I verify the URL is "https://fd.fulfilld.qa/w/ab8d02d6/operations"

  @skip
  # https://fulfilld.atlassian.net/browse/DEV-2830
  Scenario: Verify the user is able to create a team withouth fill in additional info
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/teams" page
    Then I check the page header is "Teams"
    And I select "Add New Team" action option
    And I fill in the add new team info
      | teamName        | teamStatus | teamDescription          |
      | Automation Team | Active     | This is only for testing |
    And I click the next button
    And I click the next button
    And I click the next button
    And I click the submit button
    And  I filter by "(.*)" on teams term filter
    Then I check the saved team info is displayed on the table as follows
      | teamName       | teamDescription          | teamStatus | numberOfMembers | taskFilters | row |
      | AutomationTeam | This is only for testing | Active     | 0               | 0           | 1   |

  Scenario: Verify the required fields error messages are displayed in the add new team modal
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/teams" page
    Then I check the page header is "Teams"
    And I select "Add New Team" action option
    And I click the next button
    Then I check the required error labels are displayed

  Scenario: Verify if the user clicks the cancel button the new team modal is closed
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/teams" page
    Then I check the page header is "Teams"
    And I select "Add New Team" action option
    And I click the cancel button
    Then I verify the new team modal is closed

  @skip
  # https://fulfilld.atlassian.net/browse/DEV-2830
  Scenario: Verify the user is able to edit a team
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/teams" page
    Then I check the page header is "Teams"
    And I filter by "(.*)" on teams term filter
    And I select the row in the position 1 for teams checkbox
    And I select "Edit Team Info" action option
    And I fill in the edit team info
      | teamName                | teamStatus | teamDescription                                |
      | Automation Team Updated | Inactive   | This is an edited team by automation test case |
    And I click the submit button
    And  I filter by "(.*)" on teams term filter
    Then I check the saved team info is displayed on the table as follows
      | row | teamName                | teamDescription                                | teamStatus | numberOfMembers | taskFilters |
      | 1   | Automation Team Updated | This is an edited team by automation test case | Inactive   | 0               | 0           |

  @skip
  # https://fulfilld.atlassian.net/browse/DEV-2830
  Scenario: Verify the user is able to assign a user to a team
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/teams" page
    Then I check the page header is "Teams"
    And I filter by "(.*)" on teams term filter
    And I select the row in the position 1 for teams checkbox
    And I select "Assign Users to Team" action option
    And I filter by "support@fulfilld.io" on manage user modal filter
    And I select the row in the position 1 for assign user checkbox
    And I click the submit button
    Then I check the saved team info is displayed on the table as follows
      | row | teamName                | teamDescription                                | teamStatus | numberOfMembers | taskFilters |
      | 1   | Automation Team Updated | This is an edited team by automation test case | Inactive   | 1               | 0           |

  @skip
  # https://fulfilld.atlassian.net/browse/DEV-2830
  Scenario: Verify the user is able to unassign a user to a team
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/teams" page
    Then I check the page header is "Teams"
    And I filter by "(.*)" on teams term filter
    And I select the row in the position 1 for teams checkbox
    And I select "Assign Users to Team" action option
    And I filter by "support@fulfilld.io" on manage user modal filter
    And I select the row in the position 1 for assign user checkbox
    And I click the submit button
    Then I check the saved team info is displayed on the table as follows
      | row | teamName                | teamDescription                                | teamStatus | numberOfMembers | taskFilters |
      | 1   | Automation Team Updated | This is an edited team by automation test case | Inactive   | 0               | 0           |

  @skip
  # https://fulfilld.atlassian.net/browse/DEV-2830
  # https://fulfilld.atlassian.net/browse/DEV-2877
  Scenario: Verify the user is able to delete a team
    Given I am on the "https://fd.fulfilld.qa/w/ab8d02d6/settings/teams" page
    Then I check the page header is "Teams"
    And I filter by "Automation Team Updated" on teams term filter
    And I select the row in the position 1 for teams checkbox
    And I select "Delete Team" action option
    # issue with the delete button selector And I click the delete button
    And I filter by "Automation Team Updated" on teams term filter
    Then I verify "no results" is displayed on the teams table