import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { responseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl: string = 'https://localhost:44330/api/carImage';

  constructor(private httpClient: HttpClient) {}

  add(addForm: FormGroup): Observable<responseModel> {
    const formData = new FormData();
    let newUrl: string = this.apiUrl + '/add';

    formData.append('carId', addForm.get('carId')?.value);
    formData.append('image', addForm.get('image')?.value);

    return this.httpClient.post<responseModel>(newUrl, formData);
  }
}
