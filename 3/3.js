let metadata = Symbol("metadata");

const user = 
{
    name : "Abhi",
    age : 21
};
user[metadata] = 
{
    class: 3,
    sex :"M"
};
console.log(user);