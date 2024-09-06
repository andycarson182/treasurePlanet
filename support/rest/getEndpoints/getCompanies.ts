
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../../utilities/tysonFDQAAuth'

const headers = {
    'Content-Type': 'application/json',
    'x-fulfilld-m2m-api-key': m2mApiKey,
    'x-api-key': apiKey,
    'x-fulfilld-m2m': 'apollo',
    'x-warehouse-id': warehouseId
};

const query = `query PopulateCompanySettingsList($orgId: ID!) {
    getCompanies: companies(
      filter: {
        organizationId: {eq: $orgId}
       code: { neq: "FF" }
       }
      sorting: {field: name, direction: ASC}
    ) {
      companies: nodes {
        ...Company
      }
    }
  }
  
  fragment Company on Company {
    id
    }
`;

class GetCompanies {

    async getCompaniesList() {
        try {
            const response = await axios.post(
                graphqlEndpoint,
                {
                    query: query,
                    variables: {
                        "orgId": "default"
                    },
                },
                {
                    headers: headers,
                }
            );

            console.log('GraphQL query status:', response.status);

            const dataResponse = response.data;

            if (dataResponse && dataResponse.data && dataResponse.data.getCompanies) {
                const companies = dataResponse.data.getCompanies.companies;

                // Extract company IDs
                const companyIds: string[] = companies.map((company: { id: string }) => company.id);

                // Log company IDs
                console.log("Company IDs:", companyIds);

                // Return company IDs or handle them as needed
                return companyIds;
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

export { GetCompanies };