import product from "../models/ProductModel.js";
import path from "path";
import fs from "fs";

export const getProduct = async(req,res)=>{
    try {
        const response = await product.findAll();        
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProductByID = async(req,res)=>{
    try {
        const response = await product.findOne({
            where:{
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveProduct = (req,res)=>{
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }    
    const rand=makeid(5);
    console.log(makeid(5));
    if(req.files === null)return res.status(400).json({msg:"no file uploaded"});
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5+ rand + ext;
    const url = req.protocol + "://" + req.get('HOST') + "/images/" + fileName;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "invalid images"});
    
    if(fileSize>5000000) return res.status(422).json({msg: "image oversize > 5MB"});

    file.mv(`./public/images/`+fileName, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        
        try {
            await product.create({name: name, image: fileName, url: url});
            res.status(201).json({msg: "product disimpan"});
        } catch (error) {
            console.log(error.message);
        }
    })

}

export const updateProduct = async(req,res)=>{
    const editProduct = await product.findOne({
        where:{
             id: req.params.id
         }
    });

    if(!editProduct) return res.status(404).json({msg:"data tidak ditemukan"});    

    let fileName="";
    
    if(req.files===null){
        fileName= editProduct.image;
    }
    else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5+ ext;        
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "invalid images"});        

        if(fileSize>5000000) return res.status(422).json({msg: "image oversize > 5MB"});

        const filePath = `./public/images/` + editProduct.image;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/`+fileName, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
                        
        });
    }
    
    const name = req.body.title;
    const url = req.protocol + "://" + req.get('HOST') + "/images/" + fileName;

    try {
        await product.update({name: name, image: fileName, url: url},{
            where:{
                id: req.params.id
            }        
        });
        res.status(200).json({msg:"product berhasil diupdate"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProduct = async(req,res)=>{    
    const hapusProduct = await product.findOne({
        where:{
             id: req.params.id
         }
    });

    if(!hapusProduct) return res.status(404).json({msg:"data tidak ditemukan"});

    try {
        const filePath = `./public/images/`+hapusProduct.image;
        fs.unlinkSync(filePath);
        await product.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "product dihapus"})
    } catch (error) {
        console.log(error.message);
    }
}