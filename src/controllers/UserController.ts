import {store} from '../utils/Store';
import {UserAPI} from "../api/UserAPI";
import {STORE} from "../utils/Constants";
import authController from "./AuthController";
import {User} from "../interfaces/components";


class UserController {
    private api: UserAPI;

    constructor() {
        this.api = new UserAPI();
    }

    private _handlePut(res: Response): Promise<boolean> {
        if (res.status < 401) {
            return authController.fetchUser().then(()=>{
                return true
            }).catch(()=>{
                return false
            });
        } else {
            //@ts-ignore
            store.set(STORE.USER_ERROR, res.reason ? res.reason : res.statusText);
            return new Promise((resolve)=>{resolve(false)})
        }
    }

    updateProfile(data: User): Promise<boolean> {
        return this.api.updateProfile(data).then(res=>{
            return this._handlePut(res as Response)
        });
    }

    updateProfileAvatar(fd: FormData): Promise<boolean> {
        return this.api.updateProfileAvatar(fd).then(res=>{
            return this._handlePut(res as Response)
        });
    }

    updatePassword(data: Record<string, unknown>): Promise<boolean> {
        return this.api.updatePassword(data).then(res=>{
            return this._handlePut(res as Response)
        });
    }

    getUserById(id: string): Promise<unknown> {
        return this.api.getUserById(id).then((res: any)=>{
            return res.response.id
        });
    }

    searchUser(login: string): Promise<unknown> {
        return this.api.searchUser({login: login}).then((res: any)=>{
            return res.response
        });
    }
}

export default new UserController();
