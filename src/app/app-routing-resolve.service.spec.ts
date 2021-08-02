import { TestBed } from '@angular/core/testing';

import { AppRoutingResolveService } from './app-routing-resolve.service';

describe('AppRoutingResolveService', () => {
    let service: AppRoutingResolveService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AppRoutingResolveService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
