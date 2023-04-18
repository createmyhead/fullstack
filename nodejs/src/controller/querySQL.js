// create table on database


export const createtableDB = `(
    id int primary key auto_increment, 
    userid VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    avatar MEDIUMBLOB,
    roleid VARCHAR(255))`;

export const createtableproduct = ` (
    id int primary key auto_increment,
    userid VARCHAR(255),
    product VARCHAR(255),
    price VARCHAR(255),
    quantity VARCHAR(255),
    sold VARCHAR(255),
    description TEXT(65000),
    image LONGBLOB,
    productcode VARCHAR(255))`

export const createTableReview  = `(
    id int primary key auto_increment,
    userid VARCHAR(255),
    rate VARCHAR(255),
    review TEXT(65000),
    productcode VARCHAR(255))`

export const CreateTableOrderQueryComlum = `(
    id int primary key auto_increment,
    useridsell VARCHAR(255),
    product VARCHAR(255),
    price VARCHAR(255),
    quantity VARCHAR(255),
    Sum VARCHAR(255),
    useridorder VARCHAR(255),
    image LONGBLOB,
    productcode VARCHAR(255))`