const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});

    res.status(200).json({ products, nbHits: products.length });
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObj = {};

    if (featured) {
        queryObj.featured = featured === 'true' ? true : false;
    }

    if(company){
        queryObj.company = company ;
    }

    if(name){
        queryObj.name = { $regex: name, $options:'i' }
    }

    if(numericFilters){
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '<' : '$lt',
            '<=' : '$lte',
            '=' : '$eq',
        }
        const reqEx = /\b(>|>=|=|<=|<)\b/g
        
        let filters = numericFilters.replace(reqEx, (match)=>`-${operatorMap[match]}-`);
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach(element => {
            const [field, operator, value] = element.split('-');
            // console.log(field, operator, value);
            if(options.includes(field)){
                queryObj[field] = {[operator]: Number(value)};
            }
        });
    }

    let result =  Product.find(queryObj);
    
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }else{
        result = result.sort('createdAt');
    }

    if(fields){
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;

    res.status(200).json({ products, nbHits: products.length });
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}