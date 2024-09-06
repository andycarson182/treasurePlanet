
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query EquipmentModels($filter: EquipmentModelFilter) {
  equipmentModels(filter: $filter) {
    nodes {
      id
      code
    }
  }
}
`;

class GetEquipmentModels {

  async getAutomationEquipmentModels() {
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
                    "like": "Automation equipment model label"
                  }
                },
                {
                  "label": {
                    "like": "Automation equipment model label updated"
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

      // Extract equipment model IDs
      const equipmentModelIds: string[] = dataResponse.data.equipmentModels.nodes.map((node: { id: string }) => node.id);

      // Log equipment model IDs
      console.log("equipment model IDs:", equipmentModelIds);

      return equipmentModelIds; // Return equipmentModelIds
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetEquipmentModels };