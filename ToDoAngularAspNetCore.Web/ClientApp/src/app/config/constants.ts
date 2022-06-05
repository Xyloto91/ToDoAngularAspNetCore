import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
  public readonly WEB_API_BASE_URL: string = 'https://localhost:7141/';
  public readonly API_TO_DO_ENDPOINT: string = 'api/to-do';
  public readonly API_ACCOUNT_ENDPOINT: string = 'api/account';
}
