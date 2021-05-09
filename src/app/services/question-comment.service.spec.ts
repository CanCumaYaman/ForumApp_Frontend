import { TestBed } from '@angular/core/testing';

import { QuestionCommentService } from './question-comment.service';

describe('QuestionCommentService', () => {
  let service: QuestionCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
