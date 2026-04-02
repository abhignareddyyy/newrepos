let secretKey = Symbol("secret");

let user = {
    name: "Abhi",
    age: 20
};

user[secretKey] = "JavaScript";

console.log("User Name:", user.name);
console.log("Secret Value:", user[secretKey]);
console.log("Does secretKey exist?", secretKey in user);