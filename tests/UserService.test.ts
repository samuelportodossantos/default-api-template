import UserService from "../src/Services/UserService";
import { _ResponseType } from "../src/Types/ResponseType";

const user = new UserService()
test("Test if list users returns a ResponseType data", async function(){
    const accepatbleStatusValues = ['success', 'warning', 'error']
    const response = user.list()
    const correctStatus = accepatbleStatusValues.findIndex(status => status == response.status) != -1 ? true : false
    expect(response).toHaveProperty('status')
    expect(response).toHaveProperty('message')
    expect(response).toHaveProperty('data')
    expect(correctStatus).toBeTruthy()
    expect(response.message.length).toBeGreaterThan(5)
})
