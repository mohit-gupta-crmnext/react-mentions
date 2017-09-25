import React from 'react'
import { SuggestionsOverlay } from '../../../../src'

class SuggestionsContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            selectedText: ""
        };
    }

    render() {
        const { style } = this.props;

        let containerContent;
        if (!this.props.isPickerMode) {
            // containerContent = (
            //     <SuggestionsOverlay
            //         {...this.props}
            //     />
            // )
            containerContent = this.props.render();
        } else {
            containerContent = (
                <div
                    {...style}
                >
                    <input
                        ref={n => n ? n.focus() : null}
                        type="text"
                        value={this.state.selectedText}
                        onKeyDown={
                            (e) => {
                                switch (e.keyCode) {
                                    case 13:
                                        e.preventDefault();
                                        const selectedText = this.state.selectedText;
                                        this.setState({ selectedText: "" }, () => {
                                            this.props.fieldValuePicked(selectedText, (...args) => this.props.performAddMention(...args));
                                        })
                                        break;
                                    case 27:
                                        this.props.clearMentionsForm(this.props.clearSuggestions);
                                    default:
                                        break;
                                }
                            }
                        }
                        onChange={
                            e => {
                                this.setState({ selectedText: e.target.value })
                            }
                        }
                    />
                </div>
            )
        }

        return (
            containerContent
        );
    }
}

export default SuggestionsContainer;