import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { KundeService } from './kunde.service';
import { Kunde } from './kunde';

describe('RegisterService', () => {
    let service: KundeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [KundeService],
            imports: [HttpClientTestingModule],
        });

        // We inject our service (which imports the HttpClient) and the Test Controller
        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(KundeService);
    });

    afterEach(inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            httpMock.verify();
        },
    ));

    it('should receive a GET when find() is called', () => {
        // call the service
        service.find({
            adresse: undefined,
            email: undefined,
            familienstand: undefined,
            geburtsdatum: new Date(),
            geschlecht: undefined,
            homepage: undefined,
            id: 'test',
            kategorie: 1,
            nachname: undefined,
            newsletter: true,
            umsatz: undefined,
            user: undefined,
            username: undefined,
            version: 1,
        });

        // set expectations for http mock client
        const req = httpMock.expectOne('https://localhost:443/rest/');
        expect(req.request.method).toEqual('GET');

        // set the fake data to be returned by mocked http client
        req.flush({});
    });

    it('should receive a GET when findById() is called', () => {
        // call the service
        service.findById('test-ID');

        // set expectations for http mock client
        const req = httpMock.expectOne('https://localhost:443/rest//test-ID');
        expect(req.request.method).toEqual('GET');

        // set the fake data to be returned by mocked http client
        req.flush({});
    });
});
