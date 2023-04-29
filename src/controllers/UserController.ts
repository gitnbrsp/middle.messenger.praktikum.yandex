import {store} from '../utils/Store';
import {UserAPI} from "../api/UserAPI";
import {STORE} from "../utils/Constants";
import authController from "./AuthController";

class UserController {
    private api: UserAPI;

    constructor() {
        this.api = new UserAPI();
    }

    private _handlePut(res: Response, module= ''): Promise<boolean> {
        if (res.status < 401) {
            return authController.fetchUser().then(()=>{
                return true
            }).catch(err=>{
                console.error(module, err);
                return false
            });
        } else {
            console.error(module, res.statusText);
            store.set(STORE.USER_ERROR, res.reason ? res.reason : res.statusText);
            return new Promise((resolve)=>{resolve(false)})
        }
    }

    updateProfile(data: User): Promise<boolean> {
        return this.api.updateProfile(data).then(res=>{
            return this._handlePut(res, 'updateProfile')
        });
    }

    updateProfileAvatar(fd: FormData): Promise<boolean> {
        return this.api.updateProfileAvatar(fd).then(res=>{
            return this._handlePut(res, 'updateProfileAvatar')
        });
    }

    updatePassword(data: Record<string, unknown>): Promise<boolean> {
        return this.api.updatePassword(data).then(res=>{
            return this._handlePut(res, 'updatePassword')
        });
    }

    getUserById(id: string): Promise<Response> {
        return this.api.getUserById(id).then(res=>{
            return res.response?.id
        });
    }

    searchUser(login: string): Promise<Response> {
        return this.api.searchUser({login: login}).then(res=>{
            return res.response
        });
    }
}

export default new UserController();
