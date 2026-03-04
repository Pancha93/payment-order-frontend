// Importaciones core de Angular
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdenpagoService } from '../../services/OrdenpagoService';

// Importaciones de Angular Material para UI components
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Importaciones específicas para tipos de datos especiales
import { DatePipe } from '@angular/common';

/**
 * Componente principal para la gestión de la entidad Ordenpago
 * Proporciona una interfaz para visualizar y manipular los datos de la entidad
 */
@Component({
  selector: 'app-ordenpago',
  standalone: true,
  imports: [
    // Módulos básicos de Angular
    CommonModule,
    RouterModule,
    // Módulos de Angular Material
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
  templateUrl: './ordenpago.component.html',
  styleUrls: ['./ordenpago.component.scss']
})
export class OrdenpagoComponent {
  // Atributos de la entidad con sus tipos correspondientes
  /** id - Campo de tipo number */
  id: number;

  /** numeroOrden - Campo de tipo string */
  numeroOrden: string;

  /** estado - Campo de tipo string */
  estado: string;

  /** facturaUrl - Campo de tipo string */
  facturaUrl: string;

  /** facturaImagen - Campo de tipo string */
  facturaImagen: string;

  /** fechaCreacion - Campo de tipo Date */
  fechaCreacion: Date;

  /** fechaDecision - Campo de tipo Date */
  fechaDecision: Date;

  /** creador - Campo de tipo string */
  creador: string;

  // Configuración de columnas para tablas de atributos y relaciones
  displayedColumnsAttributes: string[] = ['name', 'type'];
  displayedColumnsRelations: string[] = ['entity', 'type'];

  // DataSource para la tabla de atributos
  dataSourceAttributes = new MatTableDataSource([
    { name: 'id', type: 'long' },
    { name: 'numeroOrden', type: 'String' },
    { name: 'estado', type: 'String' },
    { name: 'facturaUrl', type: 'String' },
    { name: 'facturaImagen', type: 'String' },
    { name: 'fechaCreacion', type: 'LocalDate' },
    { name: 'fechaDecision', type: 'LocalDate' },
    { name: 'creador', type: 'String' },
  ]);

  // DataSource para la tabla de relaciones
  dataSourceRelations = new MatTableDataSource([
  ]);

  /**
   * Constructor del componente
   * @param service Servicio para la gestión de datos de la entidad
   */
  constructor(private service: OrdenpagoService) {
    // Inicialización de atributos con valores por defecto
    this.id = 0;
    this.numeroOrden = '';
    this.estado = '';
    this.facturaUrl = '';
    this.facturaImagen = '';
    this.fechaCreacion = new Date();
    this.fechaDecision = new Date();
    this.creador = '';
  }
}
