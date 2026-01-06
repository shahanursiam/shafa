const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

const rand = Math.floor(Math.random() * 10000);
const TEST_USER = {
  email: `test${rand}@example.com`,
  password: 'password123',
  role: 'buyer'
};

const runTest = async () => {
    try {
        console.log('1. Authentication...');
        try {
            console.log('   Logging in...');
            const { role, ...LOGIN_PAYLOAD } = TEST_USER;
            const loginRes = await axios.post(`${API_URL}/auth/login`, LOGIN_PAYLOAD);
            token = loginRes.data.token;
        } catch (loginErr) {
             console.log('   Login failed, trying signup...');
             try {
                const signupRes = await axios.post(`${API_URL}/auth/signup`, { ...TEST_USER, name: 'Test User' });
                console.log('   Signup success. Logging in...');
                const { role, ...LOGIN_PAYLOAD } = TEST_USER;
                const loginAfter = await axios.post(`${API_URL}/auth/login`, LOGIN_PAYLOAD);
                token = loginAfter.data.token;
             } catch (signupErr) {
                 console.error('   Signup/Login failed:', signupErr.response?.data || signupErr.message);
                 throw signupErr;
             }
        }
        const config = { headers: { Authorization: `Bearer ${token}` } };
        console.log('   Authenticated.');

        console.log('2. Preparing Data...');
        // Get Address
        const addrRes = await axios.get(`${API_URL}/users/addresses`, config);
        let addressId;
        if (addrRes.data.length === 0) {
             const newAddr = await axios.post(`${API_URL}/users/addresses`, {
                label: 'Home', fullName: 'Test', phone: '123', street: 'Street', city: 'City', postalCode: '123', country: 'Country'
             }, config);
             addressId = newAddr.data[0]._id;
        } else {
            addressId = addrRes.data[0]._id;
        }

        // Get Product
        // Assuming there is at least one product. If not, this will fail, but for now we assume.
        // We can search for products
        const productsRes = await axios.get(`${API_URL}/products`);
        let productId;
        if (productsRes.data.products && productsRes.data.products.length > 0) {
            productId = productsRes.data.products[0]._id;
        } else {
             console.log('   ⚠️ No products found to test order. Skipping.');
             return;
        }

        console.log('3. Placing Order...');
        const orderPayload = {
            items: [{ product: productId, quantity: 1 }],
            addressId: addressId
        };
        const orderRes = await axios.post(`${API_URL}/orders`, orderPayload, config);
        console.log('   Order Placed:', orderRes.status === 201 ? 'Success' : 'Failed');
        console.log('   Order Total:', orderRes.data.totalAmount);
        console.log('   Order Status:', orderRes.data.orderStatus);

        console.log('\n✅ Order Logic Verification PASSED');

    } catch (error) {
        console.error('\n❌ Verification FAILED');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
};

runTest();
