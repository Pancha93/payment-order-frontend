// Importaciones de módulos de testing de Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
// Importaciones del componente y servicio a probar
import { EliminarOrdenpagoComponent } from './eliminar-ordenpago.component';
import { OrdenpagoService } from '../../../services/OrdenpagoService';

/**
 * Suite de pruebas para el componente EliminarOrdenpago
 */
describe('EliminarOrdenpagoComponent', () => {
  // Variables para el componente y su fixture
  let component: EliminarOrdenpagoComponent;
  let fixture: ComponentFixture<EliminarOrdenpagoComponent>;

  /**
   * Configuración asíncrona del entorno de pruebas
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarOrdenpagoComponent ],
      imports: [ 
        ReactiveFormsModule,      // Para manejo de formularios reactivos
        FormlyModule.forRoot()    // Para formularios dinámicos
      ],
      providers: [ OrdenpagoService ]  // Servicio necesario
    })
    .compileComponents();
  });

  /**
   * Creación y configuración del componente antes de cada test
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarOrdenpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test básico para verificar la creación del componente
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
