import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { QuestionType } from '../../../@enums/question-type';
import { Inquiry } from '../../../@models/inquiry';
import { Question, MultiselectQuestion, SingleSelectQuestion, ShortTextQuestion, ScaleQuestion } from '../../../@models/question';
import { InquiryFormName, TypeQuestion, MultiSelectQuestionFormName, SingleSelectQuestionFormName, ShortTextQuestionFormName, ScaleSelectQuestionFormName } from '../../../features/pollster-panel/components/inquiry-form/@enum/form-enum';
import { QuestionsForm } from '../../../features/pollster-panel/components/inquiry-form/@models/questions-forms';

export class InquiryMapper {
  public static map(inquiryForm: FormGroup<QuestionsForm>): Inquiry {
    return {
      name: inquiryForm.get(InquiryFormName.INQUIRY_NAME)!.value,
      questions: this.mapQuestions(inquiryForm.get(InquiryFormName.QUESTIONS) as FormArray)
    };
  }

  private static mapQuestions(questionsFormArray: FormArray): Question[] {
    const questions: Question[] = [];
    questionsFormArray.controls.forEach((question: AbstractControl) => {
      const questionType: QuestionType = question.get(TypeQuestion.TYPE)?.value;

      switch (questionType) {
        case QuestionType.MULTISELECT:
          const multiSelectQuestion: MultiselectQuestion = {
            label: question.get(MultiSelectQuestionFormName.QUESTION)?.value,
            type: QuestionType.MULTISELECT,
            answers: question.get(MultiSelectQuestionFormName.ANSWERS)?.value
          };
          questions.push(multiSelectQuestion);
          break;
        case QuestionType.SINGLE_SELECT:
          const singleSelectQuestion: SingleSelectQuestion = {
            label: question.get(SingleSelectQuestionFormName.QUESTION)?.value,
            type: QuestionType.SINGLE_SELECT,
            answers: question.get(SingleSelectQuestionFormName.ANSWERS)?.value
          };
          questions.push(singleSelectQuestion);
          break;
        case QuestionType.SHORT_TEXT:
          const shortTextQuestion: ShortTextQuestion = {
            label: question.get(ShortTextQuestionFormName.QUESTION)?.value,
            type: QuestionType.SHORT_TEXT,
            answer: question.get(ShortTextQuestionFormName.ANSWER)?.value
          };
          questions.push(shortTextQuestion);
          break;
        case QuestionType.SCALE:
          const scaleQuestion: ScaleQuestion = {
            label: question.get(ScaleSelectQuestionFormName.QUESTION)?.value,
            type: QuestionType.SCALE,
            max: question.get(ScaleSelectQuestionFormName.MAX_VALUE)?.value,
            min: question.get(ScaleSelectQuestionFormName.MIN_VALUE)?.value,
            stepSize: question.get(ScaleSelectQuestionFormName.STEP_SIZE)?.value
          };
          questions.push(scaleQuestion);
          break;
          default:
          throw Error('Unknown question type');
      }
    });
    return questions;
  }
}
