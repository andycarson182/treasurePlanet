
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `mutation CreateOneZone($input: ZoneCreateOneInput!) {
  createOneZone(input: $input) {
    id
    createdAt
    updatedAt
    updatedByEmail
    updatedById
    deletedAt
    code
    name
    description
    warehouseId
  }
}
`;

class CreateOneZone {

  async createAutomationZone() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "input": {
              "zone": {
                "code": "AUTOMATION ZONE FOR EDIT",
                "warehouseId": "4b1b1c91-57d5-4234-831b-120296d31ddc",
                "name": "Automation Zone",
                "description": "This is a zone created by automation suite",
                "zoneRestrictions": [
                  {
                    "zoneBehavior": "pick",
                    "uomRestrictionIds": "ab17cafa-b0a8-4b07-9253-08fdb4ca02b6"
                  }
                ]
              }
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

export { CreateOneZone };
