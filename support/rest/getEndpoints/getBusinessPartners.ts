
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query BusinessPartners($filter: BusinessPartnerFilter) {
  businessPartners(filter: $filter) {
    nodes {
      id
      code
    }
  }
}
`;

class GetBusinessPartners {

  async getAutomationBusinessPartners() {
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
                    "like": "Automation Business Partner"
                  }
                },
                {
                  "name": {
                    "like": "Automation Business Partner Updated"
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

      // Extract business partner IDs
      const businesPartnerIds: string[] = dataResponse.data.businessPartners.nodes.map((node: { id: string }) => node.id);

      // Log business partner IDs
      console.log("business partner IDs:", businesPartnerIds);

      return businesPartnerIds; // Return businesPartnerIds
    } catch (error: any) {
      console.error(error);
      console.error('GraphQL query failed:', error.response.data);
      throw error;
    }
  }

}

export { GetBusinessPartners };