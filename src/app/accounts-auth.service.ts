import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type PlatformType = 'VRChat' | 'ChilloutVR' | 'NeosVR';

export interface AccountAuth {
  platform: PlatformType;
  displayName: string;
  pfpUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountsAuthService {
  public accounts$ = new Observable<AccountAuth[]>((sub) => {
    sub.next([{
      displayName: "tupper",
      pfpUrl: "https://api.vrchat.cloud/api/1/file/file_4bd7c5fd-08f4-4fe6-9c91-6965f4654cd0/1",
      platform: "VRChat"
    }]);
  });
}
