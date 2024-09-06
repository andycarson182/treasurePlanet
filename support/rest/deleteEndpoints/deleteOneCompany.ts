
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
    'Content-Type': 'application/json',
    'x-fulfilld-m2m-api-key': m2mApiKey,
    'x-api-key': apiKey,
    'x-fulfilld-m2m': 'apollo',
    'x-warehouse-id': warehouseId
};

const query = `mutation DeleteOneCompany($input: DeleteOneEntityIDInput!) {
    deleteOneCompany(input: $input) {
      name
      id
    }
  }
`;

class DeleteOneCompany {

    async deleteCompany(companyId: string) {
        try {
            const response = await axios.post(
                graphqlEndpoint,
                {
                    query: query,
                    variables: {
                        "input": {
                            "id": companyId
                        }
                    },
                },
                {
                    headers: headers,
                }
            );

            console.log('GraphQL mutation status:', response.status);
            console.log('GraphQL mutation successful response:', response.data);

        } catch (error: any) {
            console.error(error);
            console.error('GraphQL mutation failed:', error.response.data);
            throw error;
        }
    }
}

export { DeleteOneCompany };