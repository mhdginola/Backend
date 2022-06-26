import product2 from "../models/ProductModel2.js";
import {Op} from "sequelize";
import path from "path";
import fs from "fs";

export const getProduct2 = async(req,res)=>{
    try {
        const response = await product2.findAll();        
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProduct2ByID = async(req,res)=>{
    try {
        const response = await product2.findAll({            
            where:{
                id: req.params.id
            }            
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductChild=async(req,res)=>{
    try {
        const response = await product2.findAll({
            where:{
                parent_id: {
                    [Op.startsWith]: req.params.id
                }
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}