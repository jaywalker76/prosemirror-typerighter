import { Component, h } from "preact";
import { IValidationOutput } from "../interfaces/IValidation";
import { ApplySuggestionOptions } from "../commands";
import Suggestion from "./Suggestion";

interface IValidationOutputProps<TValidationOutput extends IValidationOutput> {
  applySuggestions?: (opts: ApplySuggestionOptions) => void;
  validationOutput: TValidationOutput;
}

class ValidationOutput<
  TValidationOutput extends IValidationOutput
> extends Component<IValidationOutputProps<TValidationOutput>> {
  public ref: HTMLDivElement | undefined;
  public render({
    validationOutput: { id, category, annotation, suggestions },
    applySuggestions
  }: IValidationOutputProps<TValidationOutput>) {
    return (
      <div className="ValidationWidget__container">
        <div className="ValidationWidget" ref={_ => (this.ref = _)}>
          <div
            className="ValidationWidget__type"
            style={{ color: `#${category.colour}` }}
          >
            {category.name}
          </div>
          <div className="ValidationWidget__annotation">{annotation}</div>
          {suggestions && applySuggestions && (
            <div className="ValidationWidget__suggestion-list">
              {suggestions.map(suggestion => (
                <Suggestion
                  validationId={id}
                  suggestion={suggestion}
                  applySuggestions={applySuggestions}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ValidationOutput;
