
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../utilities/tysonFDQAAuth'

const headers = {
  'Content-Type': 'application/json',
  'x-fulfilld-m2m-api-key': m2mApiKey,
  'x-api-key': apiKey,
  'x-fulfilld-m2m': 'apollo',
  'x-warehouse-id': warehouseId
};

const query = `query LicensePlates($filter: LicensePlateFilter) {
  licensePlates(filter: $filter) {
    nodes {
      id
      code
    }
  }
}
`;

class GetLicensePlateId {
  async getLicensePlateId(licensePlateCode: string) {
    try {
      const response = await axios.post(
        graphqlEndpoint,
        {
          query: query,
          variables: {
            filter: {
              or: [
                {
                  code: {
                    like: licensePlateCode,
                  },
                },
              ],
            },
          },
        },
        {
          headers: headers,
        }
      );

      console.log('GraphQL query status:', response.status);

      const dataResponse = response.data;

      // Extract the first (and expected only) license plate ID
      const licensePlateId: string | undefined = dataResponse.data.licensePlates.nodes[0]?.id;

      if (licensePlateId) {
        // Log the license plate ID
        console.log("License plate ID:", licensePlateId);
        return licensePlateId; // Return the single licensePlateId
      } else {
        console.warn("No license plate found with the given code.");
        return null; // Return null or handle the case where no license plate is found
      }
    } catch (error: any) {
      console.error('GraphQL query failed:', error.response?.data || error.message);
      throw error;
    }
  }
}


export { GetLicensePlateId };