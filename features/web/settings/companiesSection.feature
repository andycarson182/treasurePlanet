Feature: Test the Companies section

  As a logged-in fulfilld user
  I want to test the companies section

  @severity:trivial
  Scenario: The user login into the Fulfilld Web App.
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And I remove all test companies

  @severity:minor
  Scenario: Verify elements visibility for the companies section
    Given I open the settings section
    And I search for "Companies" section
    Then I check the page header is "Fulfilld"
    And I check the page sub-header is "View and manage Company specific information."

  @severity:minor
  Scenario: Verify that the user is routed to the Operations page when they click the sidebar logo.
    Given I am on the "companies" page
    Then I check the page header is "Fulfilld"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  @severity:minor
  Scenario: Verify that the user is routed to the Settings page when they click the back button.
    Given I am on the "companies" page
    Then I check the page header is "Fulfilld"
    When I click the page info back button
    Then I check the page header is "Settings"

  @severity:normal
  Scenario: Verify if the user clicks the close button then the new company modal is closed
    Given I am on the "companies" page
    Then I check the page header is "Fulfilld"
    And I click add new company button
    And I click the close button
    Then I verify the new company modal is closed

  @severity:normal
  Scenario: Verify the required fields error messages are displayed in the add new company modal
    Given I am on the "companies" page
    Then I check the page header is "Fulfilld"
    And I click add new company button
    And I click the next button
    Then I check the company required error labels are displayed for company details
    Then I fill in the new company details info
      | code                  | companyName               |
      | automationCompanyCode | Bubba Gump Shrimp Company |
    And I click the next button
    Then I just wait "1000"
    And I click the next button
    Then I check the company required error labels are displayed for company contact information
    Then I fill in the new company contact info
      | email                | phone      | street1       | street2 | country | city   | state   | zip   |
      | rockyBalboa@test.com | 7598376349 | Sesame street | 123     | Mexico  | Merida | Yucatan | 97000 |
    And I click the next button
    Then I just wait "1000"
    And I click the submit button
    Then I check the company required error labels are displayed for company display preferences
    #This extra step is a work around because the delete button is hidden in FD QA for Bowling Green
    And I remove all test companies

  @DEV-2922
  @severity:critical
  Scenario:Verify the user is able to add a new company, and check the data is saved and displayed after creation
    Given  I remove all test companies
    And I am on the "companies" page
    Then I check the page header is "Fulfilld"
    And I click add new company button
    Then I fill in the new company details info
      | code                  | companyName |
      | automationCompanyCode | Monster Inc |
    And I click the next button
    Then I fill in the new company contact info
      | email         | phone      | street1       | street2 | country       | city          | state    | zip   |
      | test@test.com | 7598376349 | Sesame street | 123     | United States | New york city | New York | 97000 |
    And I click the next button
    # UI needs a UI/UX refactor for timeFormat dropdown
    Then I fill in the new company display preferences info
      | currency             | language   | dateFormat | timeFormat | timezone       | measurementSystem |
      | United States dollar | English US | 02/01/2022 | AM / PM    | America/Denver | Imperial          |
    And I click the submit button
    Then I verify that the previously saved company info is displayed correctly
      | companyName | code                  |
      | Monster Inc | automationCompanyCode |
    Then I verify that the previously saved company contact information is displayed correctly
      | email         | phone      | street1       | street2 | country       | city          | state    | zip   |
      | test@test.com | 7598376349 | Sesame street | 123     | United States | New york city | New York | 97000 |
    #Needs a function to handle currentDate and time
    Then I verify that the previously saved company display preferences is displayed correctly
      | currency                   | language           | timezone       | measurementSystem |
      | United States dollar (USD) | English US (en_US) | America/Denver | Imperial          |
    And I remove all test companies


  #[BUG]https://fulfilld.atlassian.net/browse/DEV-3343
  @DEV-2923 @DEV-2924 @DEV2925
  @severity:critical
  Scenario: [BUG:DEV-3343]Verify the user is able to edit company information for details, contact, and preferences sections, and check the data is saved and displayed after creation
    Given  I remove all test companies
    And I am on the "companies" page
    Then I check the page header is "Fulfilld"
    And I click add new company button
    Then I fill in the new company details info
      | code                  | companyName |
      | automationCompanyCode | Monster Inc |
    And I click the next button
    Then I fill in the new company contact info
      | email         | phone      | street1       | street2 | country       | city          | state    | zip   |
      | test@test.com | 7598376349 | Sesame street | 123     | United States | New york city | New York | 97000 |
    And I click the next button
    # UI needs a UI/UX refactor for timeFormat dropdown
    Then I fill in the new company display preferences info
      | currency             | language   | dateFormat | timeFormat | timezone       | measurementSystem |
      | United States dollar | English US | 02/01/2022 | AM / PM    | America/Denver | Imperial          |
    And I click the submit button
    Then I just wait "1500"
    And I click edit company details button
    Then I fill in the new company details info
      | code                         | companyName                |
      | automationCompanyCodeUpdated | Dreamworks Shrek Animation |
    And I click the submit button
    Then I just wait "1500"
    Then I verify that the previously saved company info is displayed correctly
      | companyName                | code                         |
      | Dreamworks Shrek Animation | AUTOMATIONCOMPANYCODEUPDATED |
    And I click edit company contact information button
    Then I fill in the new company contact info
      | email               | phone      | street1    | street2         | country | city        | state       | zip    |
      | martyMcfly@test.com | 7867492034 | Elm street | 666 a nightmare | Mexico  | Mexicy City | Guadalajara | 645354 |
    And I click the submit button
    Then I just wait "1500"
    Then I verify that the previously saved company contact information is displayed correctly
      | email               | phone      | street1    | street2         | country | city        | state       | zip    |
      | martyMcfly@test.com | 7867492034 | Elm street | 666 a nightmare | Mexico  | Mexicy City | Guadalajara | 645354 |
    And I click edit company display preferences button
    Then I fill in the new company display preferences info
      | currency     | language           | dateFormat | timeFormat | timezone     | measurementSystem |
      | Mexican peso | Spanish; Castilian | 1-2-22     | 00:00      | America/Nome | Metric            |
    And I click the submit button
    Then I just wait "1500"
    #Needs a function to handle currentDate and time
    Then I verify that the previously saved company display preferences is displayed correctly
      | currency           | language                | timezone     | measurementSystem |
      | Mexican peso (MXN) | Spanish; Castilian (es) | America/Nome | Metric            |
    And I remove all test companies
