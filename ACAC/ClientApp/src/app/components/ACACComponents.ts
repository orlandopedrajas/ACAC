import { CookieService } from 'ngx-cookie-service';

class ThisRaider {
    IsAdmin: boolean;
    discorduser: string;
    discordavatar: string;
    raidername: string;
    raiderroute: string;
}
class RaiderIdentity {

    constructor(private cookieService: CookieService) {}

    IsAdmin(raidername): boolean {
        if (raidername.length === 0) {
            this.cookieService.deleteAll();
            return false;
        } else {
            if (raidername === 'Lan Mantear' || raidername === 'Yumi Rin') { return true;
            } else { return false; }
        }
    }

    Raideridentity(): ThisRaider {
        const raider = new ThisRaider();
        raider.discordavatar = this.cookieService.get('discordavatar');
        raider.discorduser = this.cookieService.get('discorduser');
        switch (raider.discorduser) {
            case 'Aeri': {
                raider.raidername = 'Aerilyn Elessedil';
                raider.raiderroute = '/raiders/aerilyn-elessedil';
                raider.IsAdmin = this.IsAdmin(raider.raidername);
                break;
            }
            case 'Hadesffxi': {
                raider.raidername = 'Hades Carmine';
                raider.raiderroute = '/raiders/hades-carmine';
                raider.IsAdmin = this.IsAdmin(raider.raidername);
                break;
            }
            case 'Lan Mantear': {
                raider.raidername = 'Lan Mantear';
                raider.raiderroute = '/raiders/lan-mantear';
                raider.IsAdmin = this.IsAdmin(raider.raidername);
                break;
            }
            case 'Doki': {
                raider.raidername = 'La Ki';
                raider.raiderroute = '/raiders/la-ki';
                raider.IsAdmin = this.IsAdmin(raider.raidername);
                break;
            }
            case 'Shelly-Net': {
                raider.raidername = 'Shelly Duncan';
                raider.raiderroute = '/raiders/shelly-duncan';
                raider.IsAdmin = this.IsAdmin(raider.raidername);
                break;
            }
            case 'Scar_LIT': {
                raider.raidername = 'Thomas Silverstar';
                raider.raiderroute = '/raiders/thomas-silverstar';
                raider.IsAdmin = this.IsAdmin(raider.raidername);
                break;
            }
            case 'ValPhoenix': {
                raider.raidername = 'Val Phoenix';
                raider.raiderroute = '/raiders/val-phoenix';
                raider.IsAdmin = this.IsAdmin(raider.raidername);
                break;
            }
            case '༄YᑌᗰI࿐❤ 上海': {
                raider.raidername = 'Yumi Rin';
                raider.raiderroute = '/raiders/yumi-rin';
                raider.IsAdmin = this.IsAdmin(raider.raidername);
                break;
            }
            default: {
                raider.raiderroute = '/';
            }
        }
        return raider;
    }
}

export { RaiderIdentity };
export { ThisRaider };
