let id1= Symbol("id");
let id2 = Symbol("id");
const user = 
{
    name : "Abhi"
};
user[id1] = 101;
user[id2] = 102;
console.log(user[id1]);
console.log(user[id2]);