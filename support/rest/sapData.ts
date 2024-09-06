const axios = require('axios');

// Your SAP credentials
const username = 'BPINST';
const password = 'Welcome1';

class SapData {
    async getDataFromSAP(storageBin: string, numberOfResults: number) {
        const sapUrl = `https://sapdev.fulfilld.io:44301/sap/opu/odata/FULFILLD/API_SU/StorageUnit?saml2=disabled&$filter=StorageBin eq '${storageBin}'&$expand=to_Details&top=100`;

        try {
            const response = await axios.get(sapUrl, {
                auth: {
                    username: username,
                    password: password
                }
            });

            // Accessing the d.results array
            const results = response.data.d.results;
            let extractedData: any = [];
            let count = 0; // Counter to keep track of the number of results

            if (results && results.length > 0) {
                for (const result of results) {
                    const toDetails = result.to_Details;
                    if (toDetails && toDetails.results) {
                        console.log(`Details inside to_Details.results for Result ${results.indexOf(result)}:`);
                        for (const detail of toDetails.results) {
                            if (detail.StorageBin === storageBin) {
                                // console.log(`Detail ${toDetails.results.indexOf(detail)} for Result ${results.indexOf(result)}:`, detail);
                                const storageUnit = detail.StorageUnit;
                                const storageBin = detail.StorageBin;
                                const material = detail.Material;
                                const batch = detail.Batch;
                                const warehouse = detail.Warehouse;
                                const totalQuantity = detail.TotalQuantity;
                                const baseUoM = detail.BaseUoM;

                                extractedData.push({
                                    storageUnit,
                                    storageBin,
                                    material,
                                    batch,
                                    warehouse,
                                    totalQuantity,
                                    baseUoM
                                });

                                count++;

                                // Check if we've reached the desired number of results
                                if (count >= numberOfResults) {
                                    return extractedData;
                                }
                            }
                        }
                    }
                }
            }

            return extractedData;
        } catch (error) {
            console.error('Error fetching data from SAP:', error);
            return [];
        }
    }
}

export { SapData };