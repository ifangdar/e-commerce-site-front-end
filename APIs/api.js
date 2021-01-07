import axios from 'axios';
axios.defaults.withCredentials = true;

// URL 與 設定
let base = 'http://localhost:8000/api'; // 後端 API 的 URL
let config = { 
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' } // 前端 URL
}; 

// 使用者請求
const userRequest = axios.create({
    baseURL: `${ base }/auth/user`
});

// CSRF Protection API 使用者第一次登入時要先取得 CSRF 憑證
const userCsrfRequest = axios.create({
    baseURL: 'http://localhost:8000'
});

// Product Request 取得商品資訊 (假資料)
const productRequest = axios.create({
    // baseURL: 'https://my-json-server.typicode.com/Andy-Ho8872/FakeJsonData'
    baseURL: base
});


// 與使用者相關的 API
    // 註冊 
export const apiUserRegister = data => userRequest.post('/register', data);
    // 登入 (取得 Token)
export const apiUserLogin = data => userRequest.post('/login', data);
    // CSRF 
export const apiCsrfLogin = () => userCsrfRequest.get('/sanctum/csrf-cookie', config);
    // 登出 (要有 Token 才能登出)
export const apiUserLogout = token => userRequest.get('/logout', token);
    // 取得 User 
export const apiGetUserInfo = (id) => userRequest.get(`/user/${id}`);



// 商品有關的 API
    // 撈取所有產品
export const apiGetProducts = () => productRequest.get('/products');
    // 撈取單一產品
export const apiGetProduct = (id) => productRequest.get(`/products/${id}`);



// 購物車相關 API
    // 使用者在購物車中的產品
export const apiGetCartProducts = (userId) => userRequest.get(`/${userId}/cart`);
    // 使用者新增商品至購物車
export const apiAddToCart = (userId, productId) => userRequest.post(`/${userId}/cart/${productId}/create`);
    // 使用者從購物車中移除商品
export const apiDeleteFromCart = (userId, productId) => userRequest.delete(`/${userId}/cart/${productId}/delete`);


    // 更新購物車商品的數量
        // 直接輸入
export const apiUpdateQuantity = (userId, product_Id) => userRequest.post(`/${userId}/cart/${product_Id}/update`);
        // 增加 1
export const apiIncreseQuantityByOne = (userId, product_Id) => userRequest.post(`/${userId}/cart/${product_Id}/increseByOne`);
//         // 減少 1
// export const apiDecreseQuantityByOne = (userId, product_Id) => userRequest.post(`/${userId}/cart/${product_Id}/decreseByOne`);