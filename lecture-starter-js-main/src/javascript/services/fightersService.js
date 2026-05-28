import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    async getFighterDetails(id) {
        try {
            const endpoint = `details/fighter/${id}.json`;//forming the endpoint for fetching fighter details based on the provided ID
            const apiResult = await callApi(endpoint);//calling the API helper function to fetch the fighter details from the specified endpoint
            return apiResult;
        } catch (error) {
            throw error;//if there's an error during the API call, it will be caught and re-thrown to be handled by the caller of this method
        }
    }
}

const fighterService = new FighterService();

export default fighterService;