
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query Nodes($filter: EquipmentItemFilter) {
  equipmentItems(filter: $filter) {
    nodes {
      code
      id
    }
  }
}
`;

class GetEquipments {

  async getAutomationEquipments() {
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
                    "like": "Automation equipment label"
                  }
                },
                {
                  "label": {
                    "like": "Automation equipment label updated"
                  }
                }

              ],
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

      // Extract equipment IDs
      const equipmentIds: string[] = dataResponse.data.equipmentItems.nodes.map((node: { id: string }) => node.id);

      // Log equipment IDs
      console.log("equipment IDs:", equipmentIds);

      return equipmentIds; // Return equipmentIds
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetEquipments };