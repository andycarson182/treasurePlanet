Feature: Test the Global Search functionality

    As a logged-in fulfilld user
    I want to test the global Search functionalities

    @severity:trivial
    Scenario: The user login into the Fulfilld Web App.
        Given I am on the login page
        When I login in fulfilld app
        Then I check the page header is "Today’s Operations Overview"

    @severity:minor
    #https://fulfilld.atlassian.net/browse/DEV-4129
    Scenario: [BUG:DEV-4129]Verify Global Search Functionality for a Specific Bin
        Given I remove all test bins data
        And I create a bin thru grahpql endpoin with the bin code: "B05456182"
        And I enter "B05456182" in the search bar
        And I click the search button
        And I verify the global search count
            | allResultsCount | areaSearchCount | productSearchCount | taskSearchCount | binSearchCount | inboundDeliverySearchCount | outboundFulfillmentSearchCount | licensePlateSearchCount |
            | 1               | 0               | 0                  | 0               | 1              | 0                          | 0                              | 0                       |
        And I remove all test bins data

    @severity:minor
    Scenario: Verify Global Search Functionality for a Specific Product
        Given I remove all test bins data
        And I enter "000000000010015978" in the search bar
        And I click the search button
        Then I verify the global search info for products
            | product            | description              |
            | 000000000010015978 | 1 CT REG BLK CRY CHEETOS |
        And I verify the global search count
            | allResultsCount | areaSearchCount | productSearchCount | taskSearchCount | binSearchCount | inboundDeliverySearchCount | outboundFulfillmentSearchCount | licensePlateSearchCount |
            | 1               | 0               | 1                  | 0               | 0              | 0                          | 0                              | 0                       |

    @severity:minor
    # https://fulfilld.atlassian.net/browse/DEV-4129
    Scenario:[BUG:DEV-4129] Verify Global Search Functionality for a Specific Area
        Given I remove all test areas
        And I create an area thru grahpql endpoint with the area code: "AUTOMATIONAREACODE182"
        And I enter "AUTOMATIONAREACODE182" in the search bar
        And I click the search button
        And I verify the global search count
            | allResultsCount | areaSearchCount | productSearchCount | taskSearchCount | binSearchCount | inboundDeliverySearchCount | outboundFulfillmentSearchCount | licensePlateSearchCount |
            | 1               | 1               | 0                  | 0               | 0              | 0                          | 0                              | 0                       |
        And I remove all test areas



