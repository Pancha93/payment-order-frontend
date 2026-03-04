import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service.service';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { DateTime } from 'luxon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrdenpagoService } from '../../../services/OrdenpagoService';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

interface OrdenpagoModel {
  numeroOrden: string;
  estado: string;
  facturaUrl: any;
  facturaImagen: any;
  fechaCreacion: Date;
  fechaDecision: Date;
  creador: string;
}

@Component({
  selector: 'app-crear-ordenpago',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    FormlyMatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './crear-ordenpago.component.html',
  styleUrls: ['./crear-ordenpago.component.scss']
})
export class CrearOrdenpagoComponent implements OnInit {
  form = new FormGroup({});
  model: OrdenpagoModel = {
    numeroOrden: '',
    estado: '',
    facturaUrl: '',
    facturaImagen: '',
    fechaCreacion: new Date(),
    fechaDecision: new Date(),
    creador: ''
  };
  fields: FormlyFieldConfig[] = [];
  cargando = false;
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<CrearOrdenpagoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ordenpagoService: OrdenpagoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const username = this.authService.getUsername();
    this.model.creador = username;
    this.fields = [
      {
        key: 'numeroOrden',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Numero Orden',
          placeholder: 'Ingrese numero Orden',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        },
        validation: {
          messages: {
            pattern: 'Formato inválido'
          }
        }
      },
      {
        key: 'estado',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Estado',
          placeholder: 'Ingrese estado',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        },
        validation: {
          messages: {
            pattern: 'Formato inválido'
          }
        }
      },
      {
        key: 'facturaUrl',
        type: 'file',
        templateOptions: {
          label: 'FacturaUrl',
          placeholder: 'Seleccione facturaUrl',
          multiple: true,
          required: true,
          accept: '.pdf,.doc,.xls,.ppt'
        }
      },
      {
        key: 'facturaImagen',
        type: 'file',
        templateOptions: {
          label: 'FacturaImagen',
          placeholder: 'Seleccione facturaImagen',
          multiple: true,
          required: true,
          accept: '.png,.jpg,.jpeg,.webp'
        }
      },
      {
        key: 'fechaCreacion',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'Fecha Creacion',
          placeholder: 'Ingrese fecha Creacion',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        },
        validation: {
          messages: {
            pattern: 'Formato inválido'
          }
        }
      },
      {
        key: 'fechaDecision',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'Fecha Decision',
          placeholder: 'Ingrese fecha Decision',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        },
        validation: {
          messages: {
            pattern: 'Formato inválido'
          }
        }
      }
    ];

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.preCreate(this.model);

    // 2. Copiamos el modelo para no mutarlo directamente
    const modelData = { ...this.model };
    this.isLoading = true;


    const uploadOperations: Observable<void>[] = [];
    const fileFields: (keyof OrdenpagoModel)[] = ['facturaUrl', 'facturaImagen'];

     const handleFileUpload = (field: keyof OrdenpagoModel) => {
       const files = this.model[field];

       if (Array.isArray(files) && files.length > 0) {
         const upload$ = this.ordenpagoService.uploadFiles(files).pipe(
           switchMap(rutas => {
            // @ts-ignore
             modelData[field] = rutas.join(',');
             return of(undefined);
           }),
           catchError(error => {
             this.handleUploadError(field as string, error);
             return throwError(error);
           })
         );
         uploadOperations.push(upload$);
       } else if (files instanceof File) {
         const upload$ = this.ordenpagoService.uploadFile(files).pipe(
           switchMap(ruta => {
            // @ts-ignore
             modelData[field] = ruta;
             return of(undefined);
           }),
           catchError(error => {
             this.handleUploadError(field as string, error);
             return throwError(error);
           })
         );
         uploadOperations.push(upload$);
       }
    };

     fileFields.forEach(field => handleFileUpload(field));

     if (uploadOperations.length > 0) {
       forkJoin(uploadOperations).subscribe({
         next: () => this.saveEntity(modelData),
         error: () => this.isLoading = false
       });
     } else {
       this.saveEntity(modelData);
     }
   }

  private handleUploadError(field: string, error: any) {
     console.error(`Error subiendo archivos en ${field}:`, error);
     this.snackBar.open(`Error subiendo ${field}`, 'Cerrar', {
       duration: 3000,
       panelClass: ['error-snackbar']
     });
     this.isLoading = false;
   }

  private saveEntity(modelData: any) {
     this.ordenpagoService.save(modelData).subscribe({
       next: (response) => {
         this.postCreate(response);
       },
       error: (error) => {
         console.error('Error al crear Ordenpago:', error);
         this.snackBar.open('Error al crear Ordenpago', 'Cerrar', {
           duration: 3000,
           panelClass: ['error-snackbar'],
         });
       },
     });
   }

  /**
   * Método para las acciones previas a crear
   */
  preCreate(model: any) {
    if (!this.form.valid) {
      throw new Error('El formulario no es válido.');
    }

    // Quitar espacios al inicio y fin de cadenas
    for (const key in model) {
      if (typeof model[key] === 'string') {
        model[key] = model[key].trim();
      }
    }
    console.log('Validaciones de preCreate completadas.');
  }

  /**
   * Acciones que se ejecutan después de la creación
   */
  postCreate(response: any) {
    this.snackBar.open('Ordenpago creado exitosamente', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close(true);
    console.log('Acciones postCreate completadas.');
  }
}
