
import axios from 'axios';
import { m2mApiKey, apiKey, graphqlEndpoint, warehouseId } from '../utilities/tysonFDQAAuth'

const headers = {
    'Content-Type': 'application/json',
    'x-fulfilld-m2m-api-key': m2mApiKey,
    'x-api-key': apiKey,
    'x-fulfilld-m2m': 'apollo',
    'x-warehouse-id': warehouseId
};

const query = `mutation CreateOneUserTeamMapping($input: UserTeamMappingCreateOneInput!) {
    createOneUserTeamMapping(input: $input) {
        id
      userId
      teamId    
    }
  }  
`;

class AssingUserToTeam {

    async assignUser(teamId: string) {
        try {
            const response = await axios.post(
                graphqlEndpoint,
                {
                    query: query,
                    variables: {
                        "input": {
                            "userTeamMapping": {
                                "userId": "ee68ddb8-2ae3-4af7-831b-bd7c7df3d5da", // user id for supportUser
                                "teamId": teamId
                            }
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

export { AssingUserToTeam };