const LoginWithCookies = async (name:string,value:any)=>{
    await browser.setCookies({
        name: name,
        value: value
    })

}

export default LoginWithCookies;