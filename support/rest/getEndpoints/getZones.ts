
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query Zones($filter: ZoneFilter) {
  zones(filter: $filter) {
    nodes {
      name
      id
    }
  }
}
`;

class GetZones {

  async getAutomationZones() {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            "filter": {
              "or": [
                {
                  "name": {
                    "like": "Automation Zone"
                  }
                },
                {
                  "name": {
                    "like": "Automation Zone Updated"
                  }
                },
                {
                  "name": {
                    "like": "Automation ZoneAutomation Zone Updated"
                  }
                },
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

      // Extract zone IDs
      const zoneIds: string[] = dataResponse.data.zones.nodes.map((node: { id: string }) => node.id);

      // Log zone IDs
      console.log("Zone IDs:", zoneIds);

      return zoneIds; // Return zone Ids
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetZones };