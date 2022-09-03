const knex = require("knex")(require("../db/db"));
const sha256 = require("crypto-js/sha256");

module.exports.list = async (req, res) => {
    try {
        const { body } = req;
        const offset = (body.page - 1) * body.limit;
        const userList = await knex('users as u')
            .select('u.id as user_id','u.name', 'u.email', 'u.dob', 'u.contact_no as contactno', 'b.name as business_name')
            .leftJoin('business as b', 'b.user_id', 'u.id')
            .limit(body.limit)
            .offset(offset)
            .orderBy('u.id', 'desc');

        if (userList.length > 0) {
            res.sendSuccess(userList, "user details extracted");
        }
        else {
            res.sendSuccess([], "users not available");
        }
    }
    catch (error) {
        res.sendError(error.message);
    }
}

module.exports.add_personal = async (req, res) => {
    try {
        const { body } = req;
        const adduser = await knex('users')
            .insert({
                name: body.name,
                email: body.email,
                password: sha256(body.password).toString(),
                dob: new Date(body.dob),
                contact_no: body.contactno,
                address: body.address
            });
        if (adduser > 0) {
            res.sendSuccess({ id: adduser[0] }, "user added successfully");
        }
        else {
            res.sendError("somthing went wrong");
        }
    }
    catch (error) {
        if (error.code == 'ER_DUP_ENTRY') { res.sendError(error.sqlMessage); return false };
        res.sendError(error.message);
    }
}

module.exports.add_business = async (req, res) => {
    try {
        const { body } = req;
        const addBusiness = await knex('business')
            .insert({
                name: body.name,
                branches: body.branches,
                user_id: body.user_id
            });
        if (addBusiness > 0) {
            res.sendSuccess({}, "Business added successfully");
        }
        else {
            res.sendError("somthing went wrong");
        }
    }
    catch (error) {
        res.sendError(error.message);
    }
}

module.exports.single_user = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await knex('users as u')
            .select('u.id as user_id', 'u.name', 'u.email', 'u.dob', 'u.contact_no', 'b.name as business_name', 'b.branches')
            .leftJoin('business as b', 'b.user_id', 'u.id')
            .where({'u.id': id})

        if (user.length > 0) {
            res.sendSuccess(user, "user details extracted");
        }
        else {
            res.sendSuccess([], "user not available");
        }
    }
    catch (error) {
        res.sendError(error.message);
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await knex('users').where({id:id}).delete()
        if (deleteUser > 0) {
            const businessDelete = await knex('business').where({user_id:id}).delete()
            res.sendSuccess({}, "record deleted successfully");
        }
        else {
            res.sendError("somthing went wrong");
        }
    } 
    catch (error) {
        res.sendError(error.message);    
    }
}