import React from 'react'

import { Mention, MentionsInput } from '../../../../src'

import defaultStyle from '../defaultStyle'
import defaultMentionStyle from '../defaultMentionStyle'

import SuggestionsContainer from "./SuggestionContainer";

// use first/outer capture group to extract the full entered sequence to be replaced
// and second/inner capture group to extract search string from the match
const emailRegex = /(([^\s@]+@[^\s@]+\.[^\s@]+))$/

class CustomMentions extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 'Hi @[John Doe](user:johndoe), \n\nlet\'s add @[joe@smoe.com](email:joe@smoe.com) and @[John Doe](user:johndoe) to this conversation... ',
      selectedField: null,
      mentions: []
    };
  }

  onChange = (e, newValue, newPlainTextValue, mentions) => {
    console.log("onChange");
    this.setState({ value: e.target.value, mentions });
  }


  beforeAddMention = (suggestion, descriptor, performAddMention) => {
    console.log("onBeforeAdd", arguments);
    this.setState({ selectedField: { suggestion, descriptor } });
  }

  onRemove = () => {
    console.log("onRemove", arguments);
  }

  onFieldValuePicked = (pickedValue, performAddMention) => {
    console.log("onFieldValuePicked", pickedValue);
    const selectedField = this.state.selectedField;

    this.setState({ selectedField: null }, () => {
      performAddMention({ id: selectedField.suggestion.id, display: pickedValue }, selectedField.descriptor);
    })
  }

  getData = (query, callback) => {
    console.log(query);
    if (query != "") {
      return callback([]);
    }

    callback(this.props.data);
  }

  clearMentionsForm = (clearSuggestions) => {
    this.setState({ selectedField: null }, () => {
      clearSuggestions();
    })
  }

  render() {
    const { value } = this.state;
    const { data } = this.props;

    return (
      <div className="multiple-triggers">
        <h3>Custom Mentions with custom Suggestions</h3>
        <p>Mention people using '@' + username or type an email address</p>

        <MentionsInput
          value={value}
          onChange={this.onChange}
          style={defaultStyle}
          markup="@[__display__](__type__:__id__)"
          placeholder={"Mention people using '@'"}
          suggestionsRenderer={
            (props) => {
              console.log("custom suggestionsRenderer");
              return (
                <SuggestionsContainer
                  {...props}
                  isPickerMode={this.state.selectedField ? true : false}
                  fieldValuePicked={this.onFieldValuePicked}
                  clearMentionsForm={this.clearMentionsForm}
                />
              );
            }
          }
          beforeBlur={
            (ev, defaultHandler) => {debugger; return this.state.selectedField == null ? defaultHandler(ev) : undefined }
          }
        >
          <Mention
            type="user"
            trigger="@"
            data={this.getData}
            beforeAdd={this.beforeAddMention}
            onRemove={this.onRemove}
            style={defaultMentionStyle}
          />

        </MentionsInput>
      </div >
    );
  }
}

export default CustomMentions;
