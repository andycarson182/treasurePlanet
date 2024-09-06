
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query Doors($filter: DoorFilter) {
  doors(filter: $filter) {
    nodes {
      id
      code
    }
  }
}
`;

class GetDoors {

  async getAutomationDoors() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "filter": {
              "or": [
                {
                  "code": {
                    "like": "AUTOMATION DOOR CODE"
                  }
                },
                {
                  "code": {
                    "like": "AUTOMATION DOOR FOR EDIT"
                  }
                },
                {
                  "code": {
                    "like": "AUTOMATION DOOR FOR EDIT UPDATED"
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

      // Extract door IDs
      const doorIds: string[] = dataResponse.data.doors.nodes.map((node: { id: string }) => node.id);

      // Log door IDs
      console.log("door IDs:", doorIds);

      return doorIds; // Return doorIds
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetDoors };