require('dotenv').config();
const db = require('./config/db'); db.connect();
const Supplier = require('./models/Supplier'); const Product = require('./models/Product');
async function seed(){ await Supplier.deleteMany(); await Product.deleteMany();
 const s1 = await Supplier.create({ name:'Alpha Co', address:'Hanoi', phone:'012345'});
 const s2 = await Supplier.create({ name:'Beta Corp', address:'HCM', phone:'098765'});
 await Product.create({ name:'Product A', price:100, quantity:10, supplier:s1._id });
 await Product.create({ name:'Product B', price:200, quantity:5, supplier:s2._id });
 console.log('Seed done'); process.exit(0);} seed().catch(e=>{console.error(e);process.exit(1)});