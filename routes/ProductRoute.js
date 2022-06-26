import express from "express";
import { 
    getProduct, 
    getProductByID, 
    saveProduct, 
    updateProduct, 
    deleteProduct 
} from "../controller/ProductController.js";
import { 
    getProduct2,
    getProduct2ByID,
    getProductChild
} from "../controller/ProductController2.js";


const router = express.Router();

router.get('/products', getProduct);
router.get('/hrcs', getProduct2);
// router.get('/hrcs/:id', getProduct2ByID);
router.get('/hrcs/:id', getProductChild);
router.get('/products/:id', getProductByID);
router.post('/products', saveProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;