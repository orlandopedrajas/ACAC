import { CookieService } from 'ngx-cookie-service';

class ThisRaider {
    IsAdmin: boolean;
    discorduser: string;
    discordavatar: string;
    raidername: string;
    raiderimg: string;
    lodestoneid: string;
    raiderroute: string;
    israidmember: boolean;
    isninemember: boolean;
}
class RaiderIdentity {

    constructor() {}

    IsAdmin(): boolean {
        var breturn = false;
        if (this.IsLoggedIn() === true) {
            const thisRaider: ThisRaider = JSON.parse(localStorage.getItem('user'));
            breturn = thisRaider.IsAdmin;
        } else { breturn = false; }
        return breturn;
    }

    IsLoggedIn(): boolean {
        const thisRaider: ThisRaider = JSON.parse(localStorage.getItem('user'));
        if (thisRaider === null) {
            return false;
        } else { return true; }
    }
    Raideridentity(): ThisRaider {
        const raider = JSON.parse(localStorage.getItem('user'));
        return raider;
    }
}

export { RaiderIdentity };
export { ThisRaider };
