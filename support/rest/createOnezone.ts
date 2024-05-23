
import axios from 'axios';

const m2mApiKey = 'AIzaSyBY5OHbDWktJTPyUxdHcjPnswd4l4Ialj8';
const apiKey = 'AIzaSyBY3xxlFqUZdnC5V1eODcQBvCJCAfzjqcY';
const graphqlEndpoint = 'https://api.fd.fulfilld.qa/graphql';


const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': '6c56e47a-f7fb-4bbf-9d48-cdd249f857e1'
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

class CreateZone {

  async createAutomationZone() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "input": {
              "zone": {
                "name": "Automation Zone",
                "code": "AUTOMATION ZONE FOR EDIT",
                "description": "This is a zone created by automation suite",
                "pickingUomRestrictionId": "657f327d-ea23-46cf-ace6-3583f3edf875",
                "warehouseId": "6c56e47a-f7fb-4bbf-9d48-cdd249f857e1"
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



export { CreateZone };