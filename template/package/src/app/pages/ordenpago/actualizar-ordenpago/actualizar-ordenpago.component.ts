import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
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

interface OrdenpagoModel {
  /** id de la entidad */
  id: number;
  /** numeroOrden de la entidad */
  numeroOrden: string;
  /** estado de la entidad */
  estado: string;
  /** facturaUrl de la entidad */
  facturaUrl: any;
  /** facturaImagen de la entidad */
  facturaImagen: any;
  /** fechaCreacion de la entidad */
  fechaCreacion: Date;
  /** fechaDecision de la entidad */
  fechaDecision: Date;
  /** creador de la entidad */
  creador: string;
}

/**
 * Componente para la actualización de Ordenpago
 * @description Maneja el formulario de actualización utilizando Formly
 */
@Component({
  selector: 'app-actualizar-ordenpago',
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
  templateUrl: './actualizar-ordenpago.component.html',
  styleUrls: ['./actualizar-ordenpago.component.scss']
})
export class ActualizarOrdenpagoComponent implements OnInit {
  /** Lista de todas las entidades */
  ordenpagos: any[] = [];
  /** Entidad seleccionada para actualizar */
  selectedOrdenpago: any = null;
  form = new FormGroup({});
  model: OrdenpagoModel = {} as OrdenpagoModel;
  originalModel: OrdenpagoModel = {} as OrdenpagoModel;
  fields: FormlyFieldConfig[] = [];
  /** Indicador de carga de archivos */
  isLoading = false;

  /**
   * Constructor del componente
   * @param ordenpagoService Servicio principal de la entidad
   * @param router Servicio de enrutamiento
   * @param snackBar Servicio para notificaciones
   * @param data Datos recibidos por el diálogo
   * @param dialogRef Referencia al diálogo
   */
  constructor(
    private ordenpagoService: OrdenpagoService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ActualizarOrdenpagoComponent>
  ) {}

  /** Inicialización del componente */
  ngOnInit() {
    this.loadOrdenpagos();

    if (this.data) {
      try {
        this.selectedOrdenpago = { ...this.data };
        // Inicializar modelo con los datos recibidos
        this.model = {
          id: this.data.id,
          numeroOrden: this.data.numeroOrden,
          estado: this.data.estado,
          facturaUrl: this.data.facturaUrl ? this.getFileNames(this.data.facturaUrl) : '',
          facturaImagen: this.data.facturaImagen ? this.getFileNames(this.data.facturaImagen) : '',
          fechaCreacion: this.data.fechaCreacion,
          fechaDecision: this.data.fechaDecision,
          creador: this.data.creador
        };

        // Copia del modelo original para detectar cambios
        this.originalModel = {
          id: this.data.id,
          numeroOrden: this.data.numeroOrden,
          estado: this.data.estado,
          facturaUrl: this.data.facturaUrl ? this.getFileNames(this.data.facturaUrl) : '',
          facturaImagen: this.data.facturaImagen ? this.getFileNames(this.data.facturaImagen) : '',
          fechaCreacion: this.data.fechaCreacion,
          fechaDecision: this.data.fechaDecision,
          creador: this.data.creador
        };
      } catch (error) {
        console.error('Error al procesar datos:', error);
      }
    }
    this.generateFormFields();
  }

  /** Carga la lista de entidades disponibles */
  loadOrdenpagos() {
    this.ordenpagoService.findAll().subscribe(
      data => this.ordenpagos = data,
      error => console.error(error)
    );
  }

  /**
   * Actualiza las opciones de un campo tipo select en el formulario
   */
  private updateFieldOptions(key: string, options: any[]) {
    const field = this.fields.find(f => f.key === key);
    if (field && field.templateOptions) {
      field.templateOptions.options = options;
    }
  }

  /**
   * Maneja la edición de un registro existente
   */
  onEdit(ordenpago: any) {
    this.selectedOrdenpago = { ...ordenpago };
    this.model = { ...this.selectedOrdenpago };
    this.generateFormFields();
  }

  /**
   * Genera la configuración de campos del formulario
   */
  generateFormFields() {
    this.fields = [
      {
        key: 'numeroOrden',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'NumeroOrden',
          placeholder: 'Ingrese numeroOrden',
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
          accept: '.pdf,.doc,.docx'
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
          label: 'FechaCreacion',
          placeholder: 'Ingrese fechaCreacion',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'fechaDecision',
        type: 'datepicker',
        className: 'field-container',
        templateOptions: {
          label: 'FechaDecision',
          placeholder: 'Ingrese fechaDecision',
          required: true,
          appearance: 'outline',
          floatLabel: 'always',
          attributes: {
            'class': 'modern-input'
          }
        }
      },
      {
        key: 'creador',
        type: 'input',
        className: 'field-container',
        templateOptions: {
          label: 'Creador',
          placeholder: 'Ingrese creador',
          required: false,
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

  onSubmit() {
    // 1. Acciones previas
    this.preUpdate(this.model);

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
        next: () => this.updateEntity(modelData),
        error: () => this.isLoading = false
      });
    } else {
      this.updateEntity(modelData);
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

  private updateEntity(modelData: any) {
    this.ordenpagoService.update(modelData.id, modelData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.postUpdate(response);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al actualizar Ordenpago:', error);
        this.snackBar.open('Error al actualizar Ordenpago', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  cancelEdit() {
    this.dialogRef.close();
  }

  /**
   * Verifica si hay cambios entre el model actual y el original.
   */
  private hasChanges(model: OrdenpagoModel): boolean {
    for (const key in model) {
      const keyTyped = key as keyof OrdenpagoModel;
      const newValue = typeof model[keyTyped] === 'string' ? (model[keyTyped] as string).trim() : model[keyTyped];
      const originalValue = typeof this.originalModel[keyTyped] === 'string' ? (this.originalModel[keyTyped] as string).trim() : this.originalModel[keyTyped];

      if (Array.isArray(newValue) && Array.isArray(originalValue)) {
        if (newValue.length !== originalValue.length ||
            newValue.some((item, index) => item.id !== originalValue[index]?.id)) {
          return true; // Cambios en arrays
        }
      } else if (newValue !== originalValue) {
        return true; // Cambio en valor simple
      }
    }
    return false; // No hay cambios
  }

  /**
   * Método para acciones previas a actualizar Ordenpago.
   */
  preUpdate(model: any) {
    // Verificar si el formulario es válido
    if (!this.form.valid) {
      throw new Error('El formulario no es válido.');
    }

    // Verificar si hubo cambios
    if (!this.hasChanges(model)) {
      this.snackBar.open('No se han realizado cambios en Ordenpago.', 'Cerrar', {
        duration: 3000,
      });
      throw new Error('No se han realizado cambios en el registro.');
    }

    // Quitar espacios al inicio y final
    for (const key in model) {
      if (typeof model[key] === 'string') {
        model[key] = model[key].trim();
      }
    }

    // TODO: Verificar permisos si se requiere
    console.log('Validaciones de preUpdate completadas.');
  }

  /**
   * Método para acciones posteriores al actualizar Ordenpago.
   */
  postUpdate(response: any) {
    this.snackBar.open('Ordenpago actualizado exitosamente', 'Cerrar', {
      duration: 3000,
    });
    this.dialogRef.close(true);
    console.log('Acciones postUpdate completadas.');
  }

  /**
   * Extrae los nombres de archivos de una cadena que puede tener varias rutas separadas por comas.
   * @param paths Cadena de rutas.
   * @returns Una cadena con los nombres de archivos.
   */
  getFileNames(paths: string): string {
    if (!paths) { return ''; }
    return paths.split(',')
      .map(item => item.trim())
      .map(path => {
        const lastBackslash = path.lastIndexOf('\\');
        const lastSlash = path.lastIndexOf('/');
        const lastSeparator = Math.max(lastBackslash, lastSlash);
        return lastSeparator === -1 ? path : path.substring(lastSeparator + 1);
      })
      .join(', ');
  }

}
