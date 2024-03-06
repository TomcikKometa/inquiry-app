import { FormArray, FormControl } from "@angular/forms";
import { MultiselectAnswerFormName } from "../enums/inquiry-form-to-fill-enums";
import { QuestionType } from "../../../../../../@enums/question-type";

export interface MultiSelectAnswerForm {
    [MultiselectAnswerFormName.QUESTION]: FormControl<string>;
    [MultiselectAnswerFormName.TYPE]:FormControl<QuestionType.MULTISELECT>;
    [MultiselectAnswerFormName.ANSWERS]: FormArray;
}