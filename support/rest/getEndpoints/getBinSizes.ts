
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query BinSizes($filter: BinSizeFilter) {
  binSizes(filter: $filter) {
    nodes {
      id
      code
    }
  }
}
`;

class GetBinSizes {

  async getAutomationBinSizes() {
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
                    "like": "Automation bin size label"
                  }
                },
                {
                  "label": {
                    "like": "Automation bin size label updated"
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

      // Extract bin size IDs
      const binSizeIds: string[] = dataResponse.data.binSizes.nodes.map((node: { id: string }) => node.id);

      // Log bin size IDs
      console.log("bin size IDs:", binSizeIds);

      return binSizeIds; // Return binSizeIds
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetBinSizes };