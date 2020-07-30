import { Component, h } from "preact";
import { IMatch } from "../interfaces/IMatch";
import { ApplySuggestionOptions } from "../commands";
import SuggestionList from "./SuggestionList";

interface IMatchProps<TMatch extends IMatch> {
  applySuggestions?: (opts: ApplySuggestionOptions) => void;
  match: TMatch;
  feedbackHref?: string;
}

class Match<TMatch extends IMatch> extends Component<IMatchProps<TMatch>> {
  public ref: HTMLDivElement | null = null;
  public render({
    match: { matchId, category, message, suggestions, replacement },
    applySuggestions
  }: IMatchProps<TMatch>) {
    const suggestionsToRender = replacement ? [replacement] : suggestions || [];
    const url = document.URL;
    const feedbackInfo = { matchId, category, message, suggestions, replacement, url };
    return (
      <div className="MatchWidget__container">
        <div className="MatchWidget" ref={_ => (this.ref = _)}>
          <div
            className="MatchWidget__type"
            style={{ color: `#${category.colour}` }}
          >
            {category.name}
          </div>
          <div className="MatchWidget__annotation">{message}</div>
          {suggestions && applySuggestions && (
            <div className="MatchWidget__suggestion-list">
              <SuggestionList
                applySuggestions={applySuggestions}
                matchId={matchId}
                suggestions={suggestionsToRender}
              />
            </div>
          )}
          {this.props.feedbackHref && (
            <div className="MatchWidget__feedbackLink">
              <a
                target="_blank"
                href={this.getFeedbackLink(feedbackInfo)}
              >
                Something's not right? Tell us!
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  private getFeedbackLink = (feedbackInfo: any) => {
    const data = encodeURIComponent(JSON.stringify(feedbackInfo, undefined, 2))
    return this.props.feedbackHref! + data
  }

}

export default Match;
