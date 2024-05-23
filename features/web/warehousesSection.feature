Feature: Test the Warehouses section

  As a logged-in fulfilld user
  I want to test the warehouses section

  Scenario: The user login into the Fulfilld Web App
    Given I am on the login page
    When I login in fulfilld app
    Then I check the page header is "Today’s Operations Overview"
    And I remove all test warehouses

  Scenario: Verify elements visibility for the warehouses section
    And I open the settings section
    And I search for "Warehouses" section
    Then I check the page header is "Bowling Green"
    And I check the page sub-header is "View and manage Warehouse specific information."

  Scenario: Verify if user clicks the sidebar logo is routed to the operantions page.
      Given I am on the "warehouses" page
    Then I check the page header is "Bowling Green"
    When I click the sideBar fulfilld logo
    Then I verify the URL has "/operations"

  Scenario: Verify if user clicks the page back button is routed to the settings page.
      Given I am on the "warehouses" page
  Then I check the page header is "Bowling Green"
    When I click the page info back button
    Then I check the page header is "Settings"

  Scenario: Verify if the user clicks the close button then the new warehouse modal is closed
         Given I am on the "warehouses" page
  Then I check the page header is "Bowling Green"
    And I click add new warehouse button
    And I click the close button
    Then I verify the new warehouse modal is closed

  Scenario: Verify the required fields error messages are displayed in the add new warehouse modal
       Given I am on the "warehouses" page
    Then I check the page header is "Bowling Green"
    And I click add new warehouse button
    And I click the submit button
    Then I check the warehouse required error labels are displayed for "warehouse details"
    Then I fill in the new warehouse details info
      | warehouseLabel        | warehouseCode           | companyAssociation | warehouseModel |
      | Nickelodeon Warehouse | automationWarehouseCode | Fulfilld           | Core           |
    And I click the submit button
    Then I just wait "1000"
    And I click the submit button
    Then I check the warehouse required error labels are displayed for "warehouse contact information"
    Then I fill in the new warehouse contact info
      | email                | phone      | street1       | street2     | country | city   | state   | zip   |
      | rockyBalboa@test.com | 7598376349 | Sesame street | Hill Valley | Mexico  | Merida | Yucatan | 97000 |
    And I click the submit button
    Then I just wait "1500"
    And I click the submit button
    Then I check the warehouse required error labels are displayed for "warehouse display preferences"
    #This extra step is a work around because the delete button is hidden in FD QA for Bowling Green
    And I remove all test warehouses

  # https://fulfilld.atlassian.net/browse/DEV-3336 -> Replicate this bug for warehouse
  # https://fulfilld.atlassian.net/browse/DEV-3338 -> Replicate this bug for warehouse
  # https://fulfilld.atlassian.net/browse/DEV-3339 -> Replicate this bug for warehouse
  # https://fulfilld.atlassian.net/browse/DEV-3372
  @DEV-2927 @skip
  Scenario: Verify the user is able to add a new warehouse, and check the data is saved and displayed after creation
       Given I am on the "warehouses" page
    Then I check the page header is "Bowling Green"
    And I click add new warehouse button
    Then I fill in the new warehouse details info
      | warehouseLabel        | warehouseCode           | companyAssociation | warehouseModel |
      | Nickelodeon Warehouse | automationWarehouseCode | Fulfilld           | Core           |
    And I click the submit button
    Then I fill in the new warehouse contact info
      | email                | phone      | street1       | street2 | country       | city          | state    | zip   |
      | rockyBalboa@test.com | 7598376349 | Sesame street | 123     | United States | New york city | New York | 97000 |
    And I click the submit button
    # UI needs a UI/UX refactor for timeFormat dropdown
    Then I fill in the new warehouse display preferences info
      | currency             | language   | dateFormat | timeFormat | timezone       | measurementSystem |
      | United States dollar | English US | 02/01/2022 | AM / PM    | America/Denver | Imperial          |
    And I click the submit button
    Then I check the saved warehouse detail info is displayed correctly
      | warehouseLabel        | companyAssociation | warehouseCode           | warehouseModel |
      | Nickelodeon Warehouse | Fulfilld           | automationWarehouseCode | Core           |
    Then I check the saved warehouse contact information is displayed correctly
      | email                | phone      | street1       | street2 | country       | city          | state    | zip   |
      | rockyBalboa@test.com | 7598376349 | Sesame street | 123     | United States | New york city | New York | 97000 |
    #Needs a function to handle currentDate and time
    Then I check the saved warehouse display preferences is displayed correctly
      | currency                   | language           | timezone       | measurementSystem |
      | United States dollar (USD) | English US (en_US) | America/Denver | Imperial          |
    And I remove all test warehouses

  # #https://fulfilld.atlassian.net/browse/DEV-3336  -> Replicate this bug for warehouse
  # #https://fulfilld.atlassian.net/browse/DEV-3343 -> Replicate this bug for warehouse
  @DEV-292@DEV-2924 @DEV2925 @skip
  Scenario: Verify the user is able to edit warehouse information for details, contact, and preferences sections, and check the data is saved and displayed after creation
       Given I am on the "warehouses" page
    Then I check the page header is "Bowling Green"
    And I click add new warehouse button
    Then I fill in the new warehouse details info
      | warehouseLabel        | warehouseCode           | companyAssociation | warehouseModel |
      | Nickelodeon Warehouse | automationWarehouseCode | Fulfilld           | Core           |
    And I click the submit button
    Then I fill in the new company contact info
      | email         | phone      | street1       | street2 | country       | city          | state    | zip   |
      | test@test.com | 7598376349 | Sesame street | 123     | United States | New york city | New York | 97000 |
    And I click the submit button
    # UI needs a UI/UX refactor for timeFormat dropdown
    Then I fill in the new company display preferences info
      | currency             | language   | dateFormat | timeFormat | timezone       | measurementSystem |
      | United States dollar | English US | 02/01/2022 | AM / PM    | America/Denver | Imperial          |
    And I click the submit button
    Then I just wait "1500"
    And I click edit company details button
    Then I fill in the new company details info
      | warehouseLabel           | warehouseCode                  | companyAssociation |
      | CartoonNetwork Warehouse | automationWarehouseCodeUpdated | Fulfilld           |
    And I click the submit button
    Then I just wait "20000"
    Then I check the saved warehouse detail info is displayed correctly
      | warehouseLabel           | companyAssociation | warehouseCode                  | warehouseModel |
      | CartoonNetwork Warehouse | Fulfilld           | automationWarehouseCodeUpdated | Core           |
    #https://fulfilld.atlassian.net/browse/DEV-3342  -> Replicate this bug for warehouse
    # And I click edit company contact information button
    # Then I fill in the new company contact info
    #   | email               | phone      | street1    | street2         | country | city        | state       | zip    |
    #   | martyMcfly@test.com | 7867492034 | Elm street | 666 a nightmare | Mexico  | Mexicy City | Guadalajara | 645354 |
    # And I click the submit button
    # Then I just wait "1500"
    # Then I check the saved company contact information is displayed correctly
    #   | email               | phone      | street1    | street2         | country | city        | state       | zip    |
    #   | martyMcfly@test.com | 7867492034 | Elm street | 666 a nightmare | Mexico  | Mexicy City | Guadalajara | 645354 |
    And I click edit company display preferences button
    Then I fill in the new company display preferences info
      | currency     | language           | dateFormat | timeFormat | timezone     | measurementSystem |
      | Mexican peso | Spanish; Castilian | 1-2-22     | 00:00      | America/Nome | Metric            |
    And I click the submit button
    Then I just wait "1500"
    #Needs a function to handle currentDate and time
    Then I check the saved company display preferences is displayed correctly
      | currency           | language                | timezone     | measurementSystem |
      | Mexican peso (MXN) | Spanish; Castilian (es) | America/Nome | Metric            |
    And I remove all test companies
