
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query PopulateWarehouseSettingsList {
    getWarehouses: warehouses(
      paging: {offset: 0, limit: 1000000}
      filter: {
        code: { notIn: ["FF-CORE", "FF-PTO", "BGK", "DSC", "FF-CORE-SLOTTING", "GROVEPORT", "HWLA", "TEST-WH"] }
      }
      sorting: [{field: name, direction: ASC}]
    ) {
      warehouses: nodes {
        ...Warehouse
        __typename
      }
    }
  }
  
  fragment Warehouse on Warehouse {
    id
    code
    name
  }`;

class GetWarehouses {

  async getWarehousesList() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {}
        },

        {
          headers: headers,
        }
      );

      console.log('GraphQL query status:', response.status);

      const dataResponse = response.data;

      if (dataResponse && dataResponse.data && dataResponse.data.getWarehouses) {
        const warehouses = dataResponse.data.getWarehouses.warehouses;

        // Extract Warehouse IDs
        const warehouseIds: string[] = warehouses.map((warehouse: { id: string }) => warehouse.id);

        // Log company IDs
        console.log("Warehouse IDs:", warehouseIds);

        // Return company IDs or handle them as needed
        return warehouseIds;
      } else {
        console.error('Unexpected response format:', dataResponse);
        throw new Error('Unexpected response format');
      }
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }
}

export { GetWarehouses };