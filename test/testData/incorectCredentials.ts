
const credentials:UserCredential[] = [
    {
        username:"locked_out_user",
        password:"secret_sauce",
        expectedError: "Epic sadface: Sorry, this user has been locked out."
    },
    {
        username:"test",
        password:"test",
        expectedError: "Epic sadface: Username and password do not match any user in this service"
    },
    {
        username:"",
        password:"test",
        expectedError: "Epic sadface: Username is required"
    },
    {
        username:"standard_user",
        password:"",
        expectedError: "Epic sadface: Password is required"
    },
 
]
export default credentials;