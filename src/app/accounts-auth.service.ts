import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { invoke } from '@tauri-apps/api';
import { GenericAccount } from 'bindings/GenericAccount';
import { AuthStatus } from 'bindings/AuthStatus';

export type PlatformType = 'VRChat' | 'ChilloutVR' | 'NeosVR';

@Injectable({
  providedIn: 'root',
})
export class AccountsAuthService {
  private accountsSubject = new ReplaySubject<GenericAccount[]>();
  public accounts$ = this.accountsSubject.asObservable();

  constructor() {
    void this.refreshAccounts();
  }

  public async refreshAccounts(): Promise<void> {
    if (window.__TAURI_METADATA__) {
      invoke<GenericAccount[]>('authenticated_accounts')
        .then((accs) => {
          this.accountsSubject.next(accs);
        })
        .catch((e) => {
          console.error('Failed to get accounts:' + e);
          this.accountsSubject.next([]);
        });
    } else this.accountsSubject.next(MOCK_ACCOUNTS);
  }

  public async login(): Promise<AuthStatus['status']> {
    if (window.__TAURI_METADATA__) {
      const status = await invoke<AuthStatus>('login', { credentials: {} });
      await this.refreshAccounts();
      return status['status'];
    } else return 'Success';
  }
}

const MOCK_ACCOUNTS: GenericAccount[] = [
  {
    displayName: 'ljoonal',
    pfpUrl: 'https://www.ljoonal.xyz/static/logo-512.png',
    id: ['VRChat', 'fake-id'],
  },
  {
    displayName: 'Slime',
    pfpUrl:
      'https://files.abidata.io/user_images/48327d52-33f7-3117-6768-0fd58d50e508.png',
    id: ['ChilloutVR', 'fake-id-2'],
  },
  {
    displayName: 'Delta',
    pfpUrl:
      'https://assets.neos.com/assets/19c5a541ad9aa476700c15b00e4cc6c23c00a72605b8549e0ccba6c5d82d2cad',
    id: ['NeosVR', 'fake-id-3'],
  },
  {
    displayName: 'Banane9',
    pfpUrl:
      'https://assets.neos.com/assets/a7cb28f4780d638e9b26fbd2d2bd577fde8e571fa411518e89d995217e3bf403',
    id: ['NeosVR', 'fake-id-4'],
  },
];
