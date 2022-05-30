import Auth from "../src/Entities/Auth";
const auth = new Auth()

test("Generate a valid jwt", async function(){
    const token = auth.generateJWT()
    const isValid = await auth.validateJWT(token);
    expect(isValid).toBeTruthy()
})

test("Verify if username is a valid email address", function() {
    const isValidEmail = auth.validateEmail('samuel@email.com')
    expect(isValidEmail).toBeTruthy()
})

test("Verify if invalid email returns false", function(){
    const isValidEmail = auth.validateEmail('samuelemail.com')
    expect(isValidEmail).toBeFalsy()
})

test("Verify if password has eight characters with numbers, letters and special characters", function(){
    const isValidPassword = auth.validatePassword('123@samuel123')
    expect(isValidPassword).toBeTruthy()
})

test("Verify if invalid password returns false", function(){
    const isValidPassword = auth.validatePassword('12345')
    expect(isValidPassword).toBeFalsy()
})

test("Verify if login successfull method returns correct object", function(){
    const username = 'samuelporto@email.com'
    const password = '15a20c30ba@'
    const login = auth.login(username, password)
    const acceptableStatusValues = ['success', 'warning', 'error']
    expect(acceptableStatusValues.findIndex(status => status === login.status)).toBeGreaterThan(-1)
    expect(login).toHaveProperty('status')
    expect(login).toHaveProperty('message')
    expect(login).toHaveProperty('data')
})

test("Verify if login will return status error when passing a invalid passord or email", function(){
    const username = 'samuelporto@email.com'
    const password = '123'
    const login = auth.login(username, password)
    expect(login).toHaveProperty('status');
    expect(login.status).toBe('error')
})
