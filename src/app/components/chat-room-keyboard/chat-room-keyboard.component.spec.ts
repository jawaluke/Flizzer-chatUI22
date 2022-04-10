import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomKeyboardComponent } from './chat-room-keyboard.component';

describe('ChatRoomKeyboardComponent', () => {
  let component: ChatRoomKeyboardComponent;
  let fixture: ComponentFixture<ChatRoomKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatRoomKeyboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
