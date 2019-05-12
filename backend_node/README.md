# Setup a REST API with Sequelize and Express.js

## Instructions 
### Generate new schema 
```  
sequelize model:create --name User --attributes "email:
    [type:string, unique:true, allowNull: false, { validate: { isEmail: true}}]
``` 
[https://sequelize.readthedocs.io/en/v3/docs/associations/#nm]



