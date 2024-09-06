
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query Areas( $paging: OffsetPaging, $filter: AreaFilter) {
    areas(paging: $paging, filter: $filter) {
      totalCount
      nodes {
        name
        id
      }
    }
  }
`;

class GetAreas {

  async getAutomationAreas() {
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
                    "like": "Automation Area"
                  }
                },
                {
                  "name": {
                    "like": "Area 51"
                  }
                },
                {
                  "name": {
                    "like": "AutomationAreaCode182"
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

      // Extract area IDs
      const areaIds: string[] = dataResponse.data.areas.nodes.map((node: { id: string }) => node.id);

      // Log area IDs
      console.log("Area IDs:", areaIds);

      return areaIds; // Return areaIds
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetAreas };