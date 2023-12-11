import { app } from '../../app.js';
import request from 'supertest';
const testToken = process.env.testToken
console.log(testToken)
describe('GET /supplier', () => {
    it('get by id', async () => {
        const filter = {'Supplier ID': 1}; // The filter object
        let queryString = Object.keys(filter).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`).join('&');
        const response = await request(app)
            .get(`/api/find_supplier?${queryString}`)
            .set('Authorization', `Bearer ${testToken}`);
        const body = response.body
        console.log(body)
        expect(response.status).toBe(200);
    });
    it('get all suppliers', async () => {
        const response = await request(app)
            .get(`/api/find_supplier`)
            .set('Authorization', `Bearer ${testToken}`);
        const body = response.body
        console.log(body)
        expect(response.status).toBe(200);
    });

    it('should delete the supplier and return status 200', async () => {
        // Mock the supplierId to delete
        const supplierIdToDelete = 1;
        const response = await request(app)
            .post('/api/delete_supplier')
            .set('Authorization', `Bearer ${testToken}`)
            .send({ supplierId: supplierIdToDelete })
        let body = response.body
        expect(response.status).toBe(200); // Assert that the response status is 200
    });
});

