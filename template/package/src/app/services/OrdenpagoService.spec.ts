import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrdenpagoService } from './OrdenpagoService';

describe('OrdenpagoService', () => {
  let service: OrdenpagoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdenpagoService]
    });
    service = TestBed.inject(OrdenpagoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call findAll', () => {
    // TODO: Implement test for findAll
  });

  it('should call findById', () => {
    // TODO: Implement test for findById
  });

  it('should call save', () => {
    // TODO: Implement test for save
  });

  it('should call update', () => {
    // TODO: Implement test for update
  });

  it('should call deleteById', () => {
    // TODO: Implement test for deleteById
  });

  it('should call uploadFiles', () => {
    // TODO: Implement test for uploadFiles
  });

  it('should call listarArchivosPorId', () => {
    // TODO: Implement test for listarArchivosPorId
  });

});
