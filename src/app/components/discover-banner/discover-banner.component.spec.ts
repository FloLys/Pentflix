import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverBannerComponent } from './discover-banner.component';

describe('DiscoverBannerComponent', () => {
  let component: DiscoverBannerComponent;
  let fixture: ComponentFixture<DiscoverBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscoverBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
