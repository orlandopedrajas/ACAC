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
}
class RaiderIdentity {

    constructor() {}

    IsAdmin(): boolean {
        try {
            if (this.IsLoggedIn() === true) {
                const thisRaider: ThisRaider = JSON.parse(localStorage.getItem('user'));
                return thisRaider.IsAdmin;
            } else { return false; }
        } catch { return false; }

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
