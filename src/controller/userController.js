
let handleLogin = (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            status: 500,
            message: "missing input parameter"
        });
    }

    //check email exist

    //check password

    //return uer info and access token
    return res.status(200).json({
        status: 200,
        email: email,
        password: password,
    })
}

module.exports = {
    handleLogin: handleLogin,
}