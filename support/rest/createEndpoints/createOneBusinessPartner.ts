
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `mutation CreateOneBusinessPartner($input: BusinessPartnerCreateOneInput!) {
  createOneBusinessPartner(input: $input) {
    id
    code
  }
}
`;

class CreateOneBusinessPartner {

  async createAutomationBusinessPartner() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "input": {
              "businessPartner": {
                "addressTimezone": "America/Chicago",
                "addressUUID": "",
                "cityName": "Raccoon City",
                "code": "AUTOMATION BUSINESS PARTNER FOR EDIT",
                "country": "US",
                "customerCode": "",
                "defaultPhoneNumber": "",
                "district": "",
                "email": "forrestGump@test.com",
                "language": "en",
                "name": "Automation Business Partner",
                "phoneNumber": "3845739234",
                "postalCode": "975933",
                "region": "Oregon",
                "streetAddress": "Elm street",
                "supplierCode": "",
                "type": "",
                "validityEnd": "2026-01-01T12:32:00.000-06:00",
                "validityStart": "2024-01-01T12:32:00.000-06:00"
              },
              "warehouseId": "d2018fde-d507-4b6d-bb20-2efdfa779c45",
              "tags": [
                {
                  "name": "automation tag for edit"
                }
              ]
            }
          }
        },
        {
          headers: headers,
        }
      );

      console.log('GraphQL mutation status:', response.status);
      console.log('GraphQL mutation successful response:', response.data);

    } catch (error: any) {
      console.error(error);
      console.error('GraphQL mutation failed:', error.response.data);
      throw error;
    }
  }

}

export { CreateOneBusinessPartner };