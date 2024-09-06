
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `mutation CreateOneWarehouseRoleType($input: WarehouseRoleTypeCreateOneInput!) {
  createOneWarehouseRoleType(input: $input) {
    id
    code
  }
}
`;

class CreateOneWarehouseRoleType {

  async createAutomationWarehouseRoleType() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "input": {
              "warehouseRoleType": {
                "code": "AUTOMATION WAREHOUSE ROLE TYPE FOR EDIT",
                "label": "Automation warehouse role type label",
                "description": "This is a warehouse role type created by automation suite",
                "velocity": 10,
                "velocityUOMId": "dfbe2de1-064b-46b5-985d-f4ba11abeb8d",
                "cost": 5,
                "currency": "USD",
                "weightUOMId": "e6c47257-c1d5-49f7-ac75-247a2147434e",
                "weightMax": 4
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

export { CreateOneWarehouseRoleType };