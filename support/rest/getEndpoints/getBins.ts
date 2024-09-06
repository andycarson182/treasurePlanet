
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query Nodes($filter: BinFilter) {
  bins(filter: $filter) {
    nodes {
      code
      id
    }
  }
}
`;

class GetBins {

  async getAutomationBins() {
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
                    "like": "AUTOMATION BIN CODE"
                  }
                },
                {
                  "code": {
                    "like": "AUTOMATION BIN CODE UPDATED"
                  }
                },
                {
                  "code": {
                    "like": "AUTOMATION BIN CODE FOR EDIT"
                  }
                },
                {
                  "code": {
                    "like": "B05456182"
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

      // Extract bin IDs
      const binIds: string[] = dataResponse.data.bins.nodes.map((node: { id: string }) => node.id);

      // Log bin IDs
      console.log("bin IDs:", binIds);

      return binIds; // Return binIds
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetBins };