import { QuestionType } from '../../../../../../enums/question-type';

export class InquiryAnswerMapper {
  public static map(answerInquiry: any) {
    return {
      answer: this.mapAnswers(answerInquiry)
    };
  }
  private static mapAnswers(answer: any): any {
    
  }
}
