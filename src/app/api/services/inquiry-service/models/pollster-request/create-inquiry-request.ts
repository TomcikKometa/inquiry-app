import { Question } from '../../../../../models/question';

export interface CreateInquiryRequest {
  name: string;
  questions: Question[];
}
