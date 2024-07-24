import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  http = inject(HttpClient);

  // Search users by first name or last name
  searchUsers(query: string) {
    return this.http.get<any>(`${apiUrls.userServiceApi}search`, {
      params: { query }
    });
  }

  // Other user-related methods can go here...
}
