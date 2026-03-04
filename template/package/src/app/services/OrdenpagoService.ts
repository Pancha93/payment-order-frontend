// Importaciones de Angular core y HTTP
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

/**
 * Interfaz que define la estructura de la entidad Ordenpago
 */
export interface Ordenpago {
  /** numeroOrden - Campo de texto */
  numeroOrden: string;
  /** estado - Campo de texto */
  estado: string;
  /** facturaUrl - Campo de texto */
  facturaUrl: string;
  /** facturaImagen - Campo de texto */
  facturaImagen: string;
  /** fechaCreacion - Campo de tipo LocalDate */
  fechaCreacion: Date;
  /** fechaDecision - Campo de tipo LocalDate */
  fechaDecision: Date;
  /** creador - Campo de texto */
  creador: string;
}

/**
 * Interfaz que define la estructura del DTO para Ordenpago
 * Utilizada para la transferencia de datos entre el frontend y backend
 */
export interface OrdenpagoDTO {
  /** numeroOrden - Campo de texto */
  numeroOrden: string;
  /** estado - Campo de texto */
  estado: string;
  /** facturaUrl - Campo de texto */
  facturaUrl: string;
  /** facturaImagen - Campo de texto */
  facturaImagen: string;
  /** fechaCreacion - Campo de tipo LocalDate */
  fechaCreacion: Date;
  /** fechaDecision - Campo de tipo LocalDate */
  fechaDecision: Date;
  /** creador - Campo de texto */
  creador: string;
}

/**
 * Servicio que maneja las operaciones CRUD y otras funcionalidades
 * relacionadas con la entidad Ordenpago
 */
@Injectable({
  providedIn: 'root'  // El servicio está disponible en toda la aplicación
})
export class OrdenpagoService {
  /** URL base para las peticiones al backend */
  private baseUrl = environment.baseUrlApi;

  /**
   * Constructor del servicio
   * @param httpClient Cliente HTTP de Angular para realizar peticiones
   */
  constructor(private httpClient: HttpClient) {}

  // Método para obtener todos los registros
  findAll(): Observable<Ordenpago[]> {
    const headers = new HttpHeaders().set('Accion', 'findAll').set('Objeto', 'Ordenpago');
    const url = `${this.baseUrl}/ordenpagos`;
    return this.httpClient.get<Ordenpago[]>(url, {headers});
  }

  // Método para buscar un registro por su ID
  findById(id: number): Observable<Ordenpago> {
    const url = `${this.baseUrl}/ordenpagos/${id}`;
    const options = {
      headers: new HttpHeaders().set('Accion', 'findById').set('Objeto', 'Ordenpago')
    };
    return this.httpClient.get<Ordenpago>(url, options);
  }

  // Método para save
  save(dto: OrdenpagoDTO): Observable<Ordenpago> {
    const url = `${this.baseUrl}/ordenpagos`;
    const options = {
      headers: new HttpHeaders().set('Accion', 'save').set('Objeto', 'Ordenpago')
    };
    return this.httpClient.post<Ordenpago>(url, dto, options);
  }

  // Método para actualizar un registro existente
  update(id: number, dto: OrdenpagoDTO): Observable<Ordenpago> {
    const url = `${this.baseUrl}/ordenpagos/${id}`;
    const options = {
      headers: new HttpHeaders().set('Accion', 'update').set('Objeto', 'Ordenpago')
    };
    return this.httpClient.put<Ordenpago>(url, dto, options);
  }

  // Método para deleteById
  deleteById(id: number): Observable<void> {
    const url = `${this.baseUrl}/ordenpagos/${id}`;
    const options = {
      headers: new HttpHeaders().set('Accion', 'deleteById').set('Objeto', 'Ordenpago')
    };
    return this.httpClient.delete<void>(url, options);
  }


  // Método para uploadFiles
  uploadFiles(files: File[]): Observable<string[]> {
    const url = `${this.baseUrl}/ordenpagos/upload`;
    const formData: FormData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });

    // Opcional: puedes ajustar headers
    const headers = new HttpHeaders()
      .set('Accion', 'save')
      .set('Objeto', 'Ordenpago');

    // Observa que aquí esperamos un array de strings, según lo que el backend devuelve
    return this.httpClient.post<string[]>(url, formData, { headers });
  }

  // Método para uploadFile
  uploadFile(file: File): Observable<string> {
    const url = `${this.baseUrl}/ordenpagos/upload`;
    const formData: FormData = new FormData();
    formData.append('files', file); // 'files' es el nombre del @RequestParam en el backend

    const headers = new HttpHeaders()
      .set('Accion', 'save')
      .set('Objeto', 'Ordenpago');

    // Esperamos un array de rutas y tomamos la primera.
    // Si el backend solo devuelve una ruta, ajusta en consecuencia.
    return new Observable((observer) => {
      this.httpClient.post<string[]>(url, formData, { headers })
        .subscribe({
          next: (paths: string[]) => {
            observer.next(paths[0]);  // Tomamos la primera ruta
            observer.complete();
          },
          error: (err) => observer.error(err)
        });
    });
  }

  getFilesByOrdenpagoId(id: number): Observable<string[]> {
    const url = `${this.baseUrl}/ordenpagos/${id}/files`;
    return this.httpClient.get<string[]>(url);
  }

  downloadFile(fileName: string): Observable<Blob> {
    const url = `${this.baseUrl}/ordenpagos/download?file=${fileName}`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }
  // Método para listarArchivosPorId
  listarArchivosPorId(id: number): Observable<Ordenpago[]> {
    const url = `${this.baseUrl}/ordenpagos/${id}/files`;
    const options = {
      headers: new HttpHeaders().set('Accion', 'listarArchivosPorId').set('Objeto', 'Ordenpago')
    };
    return this.httpClient.get<Ordenpago[]>(url, options);
  }

}
