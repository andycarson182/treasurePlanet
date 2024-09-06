
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query Nodes($filter: WarehouseRoleTypeFilter) {
  warehouseRoleTypes(filter: $filter) {
    nodes {
      id
      code
    }
  }
}
`;

class GetWarehouseRoleTypes {

  async getAutomationWarehouseRoleTypes() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "filter": {
              "or": [
                {
                  "label": {
                    "like": "Automation warehouse role type label"
                  }
                },
                {
                  "label": {
                    "like": "Automation warehouse role type label updated"
                  }
                }
              ]
            }
          },
        },
        {
          headers: headers,
        }
      );

      console.log('GraphQL query status:', response.status);
      // console.log('GraphQL query successful response:', response.data);

      const dataResponse = response.data;

      // Extract warehouse role type IDs
      const warehouseRoleTypeIds: string[] = dataResponse.data.warehouseRoleTypes.nodes.map((node: { id: string }) => node.id);

      // Log warehouse role type IDs
      console.log("warehouse role type IDs:", warehouseRoleTypeIds);

      return warehouseRoleTypeIds; // Return warehouseRoleTypeIds
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetWarehouseRoleTypes };