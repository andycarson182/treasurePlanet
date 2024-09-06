
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query EquipmentTypes($filter: EquipmentTypeFilter) {
  equipmentTypes(filter: $filter) {
    nodes {
      code
      id
    }
  }
}
`;

class GetEquipmentTypes {

  async getAutomationEquipmentTypes() {
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
                    "like": "Automation equipment type label"
                  }
                },
                {
                  "label": {
                    "like": "Automation equipment type label updated"
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

      // Extract equipment type IDs
      const equipmentTypeIds: string[] = dataResponse.data.equipmentTypes.nodes.map((node: { id: string }) => node.id);

      // Log equipment type IDs
      console.log("Equipment type IDs:", equipmentTypeIds);

      return equipmentTypeIds; // Return equipmentTypeIds
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetEquipmentTypes };