@DEV-3605
Feature: Test the Tags section

  As a logged-in fulfilld user
  I want to test the tags section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And I remove all test tags data

  @DEV-3606
  @severity:minor
  Scenario: Verify the visibility of elements in the Tags section.
    Given I open the settings section
    And I search for "Tags" section
    Then I check the page header is "Tags"
    And I check the page sub-header is "View and manage Tags."
    And I check the data table headers are displayed and are correct for tags

  @DEV-3607
  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "tags" page
    Then I check the page header is "Tags"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @DEV-3608
  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "tags" page
    Then I check the page header is "Tags"
    When I click the page info back button
    Then I check the page header is "Settings"

  @DEV-3609
  @severity:normal
  Scenario: Verify that the "Create New Tag" modal closes when the user clicks the "Cancel" or "Close" button.
    Given I am on the "tags" page
    Then I check the page header is "Tags"
    And I click create new tag button
    And I click the cancel button
    Then I verify the new tag modal is closed
    And I click create new tag button
    And I click the close button
    Then I verify the new tag modal is closed

  @DEV-3610
  @severity:normal
  Scenario: Verify that the required fields' error messages are displayed in the "Create New Tag" modal.
    Given I am on the "tags" page
    Then I check the page header is "Tags"
    And I click create new tag button
    And I click the submit button
    Then I check the required error labels are displayed for tag creation modal

  @DEV-3611
  @severity:critical
  Scenario: Verify that the user can create a new Tag with a complete form and validate the data persistence in the Tags table.
    Given I remove all test tags data
    And I am on the "tags" page
    Then I check the page header is "Tags"
    And I click create new tag button
    #Note: Tags can only be in lowercase to avoid duplications.
    And I fill in the new tag info
      | tagName             | tagDescription                            |
      | automation tag name | This is a tag created by automation suite |
    And I click the submit button
    Then I check the snackbar message is "Successfully created new tag: automation tag name"
    When I filter by column: "Tag Name" on the tags section
    And  I filter by text "automation tag name" on tags term filter
    Then I verify that the previously saved tag info is displayed on the table as follows
      | row | tagName             | tagDescription                            |
      | 1   | automation tag name | This is a tag created by automation suite |
    And I remove all test tags data

  @DEV-3612
  @severity:critical
  Scenario: Verify that the user can create a new Tag with mandatory fields only and validate the data persistence in the Tags table.
    Given I remove all test tags data
    And I am on the "tags" page
    Then I check the page header is "Tags"
    And I click create new tag button
    And I fill in the new tag info
      | tagName             |
      | automation tag name |
    And I click the submit button
    Then I check the snackbar message is "Successfully created new tag: automation tag name"
    When I filter by column: "Tag Name" on the tags section
    And  I filter by text "automation tag name" on tags term filter
    Then I verify that the previously saved tag info is displayed on the table as follows
      | row | tagName             |
      | 1   | automation tag name |
    And I remove all test tags data

  @DEV-3613
  @severity:normal
  Scenario: Verify the persistence of data in the edit form after creation.
    Given I remove all test tags data
    And I am on the "tags" page
    Then I check the page header is "Tags"
    And I click create new tag button
    And I fill in the new tag info
      | tagName             | tagDescription                            |
      | automation tag name | This is a tag created by automation suite |
    And I click the submit button
    When I filter by column: "Tag Name" on the tags section
    And I filter by text "automation tag name" on the tags term filter and ensure that a record is displayed
    And I select the checkbox row of the positon "1"
    And I select "Edit Tag" action option in tags
    Then I verify that the previously saved tag info is displayed on the edit tag form
      | tagName             | tagDescription                            |
      | automation tag name | This is a tag created by automation suite |
    And I remove all test tags data

  @DEV-3614
  @severity:critical
  Scenario: Verify that the user can edit a Tag and confirm the updated data in the Tags table.
    Given I remove all test tags data
    And I create a tag thru grahpql endpoint
    And I am on the "tags" page
    Then I check the page header is "Tags"
    When I filter by column: "Tag Name" on the tags section
    And I filter by text "automation tag for edit" on the tags term filter and ensure that a record is displayed
    And I select the checkbox row of the positon "1"
    And I select "Edit Tag" action option in tags
    Then I fill in the new tag info
      | tagName                     | tagDescription                            |
      | automation tag name updated | This is a tag updated by automation suite |
    And I click the submit button
    Then I check the snackbar message is "Successfully updated tag: automation tag name updated"
    When I filter by column: "Tag Name" on the tags section
    And I filter by text "automation tag name updated" on the tags term filter and ensure that a record is displayed
    Then I verify that the previously saved tag info is displayed on the table as follows
      | row | tagName                     | tagDescription                            |
      | 1   | automation tag name updated | This is a tag updated by automation suite |
    And I remove all test tags data

  @DEV-3751
  @severity:normal
  Scenario: Verify that the user cannot create a tag with a duplicate tag name during tag creation.
    Given I remove all test tags data
    And I create a tag thru grahpql endpoint
    And I am on the "tags" page
    Then I check the page header is "Tags"
    And I click create new tag button
    And I fill in the new tag info
      | tagName                 | tagDescription                            |
      | automation tag for edit | This is a tag created by automation suite |
    And I click the submit button
    Then I check the snackbar error message is "Error creating tag: This tag already exist in this warehouse"
    And I remove all test tags data