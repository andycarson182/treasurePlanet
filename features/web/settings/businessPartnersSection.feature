@DEV-4057
Feature: Test the Business Partners section

  As a logged-in fulfilld user
  I want to test the Business Partners section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"

  @DEV-4058
  @severity:minor
  Scenario: Verify the visibility of elements in the Business Partners section.
    Given I open the settings section
    And I search for "Business Partners" section
    Then I check the page header is "Business Partners"
    And I check the page sub-header is "View and manage warehouse Business Partners."
    And I check the data table headers are displayed and are correct for business partners

  @DEV-4059
  @severity:minor
  Scenario: Verify that the user is routed to the slotting dashboard page when they are in a slotting warehouse and they click the sidebar logo.
    Given I am on the "/w/781dacb4/business-partners" page
    Then I check the page header is "Business Partners"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/dashboard/newest"

  @DEV-4060
  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "/w/781dacb4/business-partners" page
    Then I check the page header is "Business Partners"
    When I click the page info back button
    Then I check the page header is "Settings"

  @DEV-4061
  @severity:normal
  Scenario: Verify that the "Add New Business Partner" modal closes when the user clicks the "Cancel" or "Close" button.
    Given I am on the "/w/781dacb4/business-partners" page
    Then I check the page header is "Business Partners"
    And I select "Add Business Partner" action option in business partners
    And I click the cancel button
    Then I verify the new business partner modal is closed
    And I select "Add Business Partner" action option in business partners
    And I click the close button
    Then I verify the new business partner modal is closed

  @DEV-4063
  @severity:normal
  #https://fulfilld.atlassian.net/browse/DEV-4069
  Scenario:[BUG:DEV-4069]Verify that the required fields' error messages are displayed in the "Add New Business Partner" modal.
    Given I am on the "/w/781dacb4/business-partners" page
    Then I check the page header is "Business Partners"
    And I select "Add Business Partner" action option in teams
    And I click the submit button
    Then I check the required error labels are displayed for business partner creation modal

  @DEV-4064
  @severity:critical
  Scenario:Verify that the user can create a new Business Partner with a complete form and validate the data persistence in the Business Partner table.
    Given I remove all test business partners data
    And I am on the "/w/781dacb4/business-partners" page
    Then I check the page header is "Business Partners"
    And I select "Add Business Partner" action option in business partners
    And I fill in the new business partner info
      | code                          | name                        | language | timezone        | validityStart       | validityEnd         | tags                    | email                | phoneNumber | street     | country       | city         | state  | postalCode |
      | automationBusinessPartnerCode | Automation Business Partner | English  | America/Chicago | 01/01/2024 02:32 PM | 01/05/2024 02:32 PM | automation tag for edit | forrestGump@test.com | 3845739234  | Elm street | United States | Raccoon City | Oregon | 975933     |
    And I click the submit button
    Then I check the snackbar message is "Successfully created business partner: Automation Business Partner."
    When I filter by column: "Code" on the business partners section
    And I filter by text "automationBusinessPartnerCode" on the business partners term filter and ensure that a record is displayed
    Then I verify that the previously saved business partner info is displayed on the table as follows
      | row | code                          | name                        | street     | city         | region | timezone        | language     | email                | phone        |
      | 1   | automationBusinessPartnerCode | Automation Business Partner | Elm street | Raccoon City | Oregon | America/Chicago | English (en) | forrestGump@test.com | 384-573-9234 |
    And I remove all test business partners data

  @DEV-4065
  @severity:critical
  Scenario: Verify that the user can create a new business partner with mandatory fields only and validate the data persistence in the business partners table.
    Given I remove all test business partners data
    Given I am on the "/w/781dacb4/business-partners" page
    Then I check the page header is "Business Partners"
    And I select "Add Business Partner" action option in business partners
    And I fill in the new business partner info
      | code                          | name                        | language | timezone        | validityStart       | validityEnd         | email                | street     | country       | city         | state  | postalCode |
      | automationBusinessPartnerCode | Automation Business Partner | English  | America/Chicago | 01/01/2024 02:32 PM | 01/05/2024 02:32 PM | forrestGump@test.com | Elm street | United States | Raccoon City | Oregon | 975933     |
    And I click the submit button
    Then I check the snackbar message is "Successfully created business partner: Automation Business Partner."
    When I filter by column: "Code" on the business partners section
    And I filter by text "automationBusinessPartnerCode" on the business partners term filter and ensure that a record is displayed
    Then I verify that the previously saved business partner info is displayed on the table as follows
      | row | code                          | name                        | street     | city         | region | timezone        | language     | email                |
      | 1   | automationBusinessPartnerCode | Automation Business Partner | Elm street | Raccoon City | Oregon | America/Chicago | English (en) | forrestGump@test.com |
    And I remove all test business partners data

  @DEV-4066
  @severity:normal
  #https://fulfilld.atlassian.net/browse/DEV-4245
  Scenario:[BUG:4245]Verify the persistence of data in the edit form after creation.
    Given I remove all test business partners data
    And I am on the "/w/781dacb4/business-partners" page
    Then I check the page header is "Business Partners"
    And I select "Add Business Partner" action option in business partners
    And I fill in the new business partner info
      | code                          | name                        | language | timezone        | validityStart       | validityEnd         | tags                    | email                | phoneNumber | street     | country       | city         | state  | postalCode |
      | automationBusinessPartnerCode | Automation Business Partner | English  | America/Chicago | 01/01/2024 02:32 PM | 01/05/2026 02:32 PM | automation tag for edit | forrestGump@test.com | 3845739234  | Elm street | United States | Raccoon City | Oregon | 975933     |
    And I click the submit button
    When I filter by column: "Code" on the business partners section
    And I filter by text "automationBusinessPartnerCode" on the business partners term filter and ensure that a record is displayed
    And I select the business partner checkbox in the row position "1"
    And I select "Edit Business Partner" action option in business partners
    Then I verify that the previously saved business partner info is displayed on the edit business partner form
      | code                          | name                        | language | timezone        | validityStart       | validityEnd         | tags                    | email                | phoneNumber | street     | country       | city         | state  | postalCode |
      | automationBusinessPartnerCode | Automation Business Partner | English  | America/Chicago | 01/01/2024 02:32 PM | 01/05/2026 02:32 PM | automation tag for edit | forrestGump@test.com | 3845739234  | Elm street | United States | Raccoon City | Oregon | 975933     |
    And I remove all test business partners data

  @DEV-4067
  @severity:critical
  # https://fulfilld.atlassian.net/browse/DEV-4245
  Scenario: [BUG:4245]Verify that the user can edit a Business Partner and confirm the updated data in the Business Partners table.
    Given I remove all test business partners data
    And I create a business partner thru grahpql endpoint
    And I am on the "/w/781dacb4/business-partners" page
    Then I check the page header is "Business Partners"
    When I filter by column: "Code" on the business partners section
    And I filter by text "AUTOMATION BUSINESS PARTNER FOR EDIT" on the business partners term filter and ensure that a record is displayed
    And I select the business partner checkbox in the row position "1"
    And I select "Edit Business Partner" action option in business partners
    # Add Automation tag for edit logic
    And I fill in the new business partner info
      | name                                | language           | timezone       | validityStart       | validityEnd         | email          | phoneNumber | street        | country       | city        | state      | postalCode |
      | Automation Business Partner Updated | Spanish; Castilian | America/Denver | 03/02/2024 02:32 PM | 06/06/2024 02:32 PM | ltdan@test.com | 56453454353 | Sesame Street | United States | Gotham City | New Jersey | 5423543    |
    And I click the submit button
    Then I check the snackbar message is "Successfully updated business partner: Automation Business Partner Updated."
    When I filter by column: "Code" on the business partners section
    And I filter by text "AUTOMATION BUSINESS PARTNER FOR EDIT" on the business partners term filter and ensure that a record is displayed
    Then I verify that the previously saved business partner info is displayed on the table as follows
      | row | code                                 | name                                | street        | city        | region     | timezone       | language                | email          | phone         |
      | 1   | AUTOMATION BUSINESS PARTNER FOR EDIT | Automation Business Partner Updated | Sesame Street | Gotham City | New Jersey | America/Denver | Spanish; Castilian (es) | ltdan@test.com | 564-534-54353 |
    And I remove all test business partners data

  @DEV-4067
  @severity:critical
  Scenario: Verify that the user can delete a business partner and confirm its successful deletion.
    Given I remove all test business partners data
    And I create a business partner thru grahpql endpoint
    And I am on the "/w/781dacb4/business-partners" page
    Then I check the page header is "Business Partners"
    When I filter by column: "Code" on the business partners section
    And I filter by text "AUTOMATION BUSINESS PARTNER FOR EDIT" on the business partners term filter and ensure that a record is displayed
    And I select the business partner checkbox in the row position "1"
    And I select "Delete Business Partner" action option in business partners
    Then I check the snackbar message is "Successfully deleted business partner: Automation Business Partner Updated."
    When I filter by column: "Code" on the business partners section
    And  I filter by text "Automation Zone" on business partners term filter
    Then I verify "no results" is displayed on the business partners table
    And I remove all test business partners data


  @DEV-4068
  @severity:normal
  Scenario: Verify that the user cannot create a business partner with a duplicate business partner code during creation.
    Given I remove all test business partners data
    And I create a business partner thru grahpql endpoint
    And I am on the "/w/781dacb4/business-partners" page
    Then I check the page header is "Business Partners"
    And I select "Add Business Partner" action option in business partners
    And I fill in the new business partner info
      | code                                 | name                | language | timezone        | validityStart       | validityEnd         | email                | street     | country       | city         | state  | postalCode |
      | AUTOMATION BUSINESS PARTNER FOR EDIT | Automation Business | English  | America/Chicago | 01/01/2024 02:32 PM | 01/05/2024 02:32 PM | forrestGump@test.com | Elm street | United States | Raccoon City | Oregon | 975933     |
    And I click the submit button
    Then I check the snackbar error message is "BusinessPartner not unique by code"
    And I remove all test business partners data

TBD
@severity:normal
Scenario: Verify that the user cannot create a business partner with a duplicate business partner name during creation.
  Given I remove all test business partners data
  And I create a business partner thru grahpql endpoint
  And I am on the "/w/781dacb4/business-partners" page
  Then I check the page header is "Business Partners"
   And I select "Add Business Partner" action option in teams
  And I fill in the new business partner info
    | code                        | name                        | validityStart       | validityEnd         | street     | city         | state  | country       | postalCode | timezone        | language | email                |
    | AUTOMATION BUSINESS PARTNER | Automation Business Partner | 01/01/2024 02:32 PM | 01/05/2024 02:32 PM | Elm street | Raccoon City | Oregon | United States | 975933     | America/Chicago | English  | forrestGump@test.com |
  And I click the submit button
  Then I check the snackbar error message is "BusinessPartner not unique by name"