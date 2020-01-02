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

    constructor(private cookieService: CookieService) {}

    IsAdmin(raidername): boolean {
        if (raidername.length === 0) {
            this.cookieService.delete('discorduser', '/');
            this.cookieService.delete('discordavatar', '/');
            this.cookieService.deleteAll('/');
            return false;
        } else {
            if (this.cookieService.get('isadmin') === 'true') {
                return true;
            } else { return false; }
        }
    }

    Raideridentity(): ThisRaider {
        const raider = new ThisRaider();
        raider.discordavatar = this.cookieService.get('discordavatar');
        raider.discorduser = this.cookieService.get('discorduser');
        if (this.cookieService.get('isadmin') === 'true') {
            raider.IsAdmin = true;
        } else { raider.IsAdmin = false; }
        raider.raidername = this.cookieService.get('raidername');
        raider.raiderimg = this.cookieService.get('raiderimg');
        raider.lodestoneid = this.cookieService.get('lodestoneid');
        raider.raiderroute = this.cookieService.get('raiderroute');
        if (this.cookieService.get('israidmember') === 'true') {
            raider.israidmember = true;
        } else { raider.israidmember = false; }
        return raider;
    }
}

export { RaiderIdentity };
export { ThisRaider };
