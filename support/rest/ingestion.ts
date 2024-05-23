
import axios from 'axios';

const m2mApiKey = 'AIzaSyBY5OHbDWktJTPyUxdHcjPnswd4l4Ialj8';
const apiKey = 'AIzaSyBY3xxlFqUZdnC5V1eODcQBvCJCAfzjqcY';
const graphqlEndpoint = 'https://api.fd.fulfilld.qa/graphql';


const headers = {
    'Content-Type': 'application/json',
    'x-fulfilld-m2m-api-key': m2mApiKey,
    'x-api-key': apiKey,
    'x-fulfilld-m2m': 'apollo',
    'x-warehouse-id': '6c56e47a-f7fb-4bbf-9d48-cdd249f857e1'
};


const query = `mutation CreateStockFromProduction($input: CreateStockFromProductionTaskInputDto!) {
createStockFromProduction(input: $input)
}
`;

class Ingestion {

    async licensePlateCreation(randomLicensePlateNumber:string) {

        axios.post(
            graphqlEndpoint,
            {
                query: query,
                variables:  {
                    input: {
                        createStockFromProduction: {
                            binCode: 'PALLETIZER-01',
                            stock: [
                                {
                                    productCode: "FG29",
                                    quantity: '1',
                                    stockStatusCode: '01',
                                    lotCode: '0000000083',
                                    unitOfMeasureCode: 'BT',
                                },
                            ],
                            licensePlate: {
                                code: randomLicensePlateNumber,
                            },
                            warehouseCode: 'BGK',
                            referenceDocument: 'Process_Order_zyx',
                        },
                    },
                },
            },
            {
                headers: headers,
            }
        )
            .then(response => {
                console.log(response.status);
                //console.log('GraphQL mutation successful:', response.data);
            })
            .catch(error => {
                console.log(error);
                console.error('GraphQL mutation failed:', error.response.data);
            });
    }

}

export { Ingestion };