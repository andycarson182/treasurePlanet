Feature: Test the Fulfillments functionality

    As a logged-in fulfilld user
    I want to test the Fulfillment functionalities

    Scenario: The user login into the Fulfilld Web App
        Given I am on the login page
        When I login in fulfilld app
        Then I check the page header is "Today’s Operations Overview"

    Scenario: Verify elements visibility for the equipment section
        And I open the deliveries section
        Then I check the page header is "Deliveries and Fulfillments"
        And I check the page sub-header is "View, add, and edit relevant Delivery or Fulfillment information and assign tasks."
    # And I check the data table headers are displayed and are correct for equipment

    @DEV-2981
    Scenario: Verify the user is able to view the fulfillment details page.
        Given I am on the "deliveries" page
        Then I check the page header is "Deliveries and Fulfillments"
        And I clear the pre assigned data range
        And I expand the fulfillment items table
        Then I save the fulfillmment code of the row "3" in the fulfillment items table
        And I select the fulfillment item in the row "3" on delivies page
        Then I just wait "6500"
        And I check the fulfillment details page header is "Fulfillment and the saved fulfillment code"