import * as React from 'react';
import DraftEditor from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import { HeadlineOneButton, HeadlineTwoButton } from 'draft-js-buttons';

const linkifyPlugin = createLinkifyPlugin();
const mentionPlugin = createMentionPlugin();
const sideToolbarPlugin = createSideToolbarPlugin();
const hashtagPlugin = createHashtagPlugin();
const emojiPlugin = createEmojiPlugin();

const plugins = [ linkifyPlugin, mentionPlugin, sideToolbarPlugin, hashtagPlugin, emojiPlugin ];

const { MentionSuggestions } = mentionPlugin;
const { SideToolbar } = sideToolbarPlugin;
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

class Editor extends React.Component {
	state = { editorState: EditorState.createEmpty(), suggestions: this.props.mentionSuggestions };

	onChange = (editorState) => this.setState({ editorState });

	// setEditor = (editor) => {
	// 	this.editor = editor;
	// };

	focusEditor = () => {
		if (this.editor) {
			this.editor.focus();
		}
	};

	onSearchChange = ({ value }) => {
		this.setState({
			suggestions: defaultSuggestionsFilter(value, this.props.mentionSuggestions),
		});
	};

	onAddMention = () => {
		console.log('mention added');
	};

	render() {
		return (
			<div>
				<div className="form-input editor" onClick={this.focusEditor}>
					<DraftEditor
						ref={(element) => {
							this.editor = element;
						}}
						editorState={this.state.editorState}
						onChange={this.onChange}
						plugins={plugins}
					/>
					<MentionSuggestions
						onSearchChange={this.onSearchChange}
						suggestions={this.state.suggestions}
						onAddMention={this.onAddMention}
					/>
					<SideToolbar>
						{(props) => (
							<div>
								<HeadlineOneButton {...props} />
								<HeadlineTwoButton {...props} />
							</div>
						)}
					</SideToolbar>
				</div>
				<EmojiSuggestions />
				<EmojiSelect />
			</div>
		);
	}
}

const styles = {
	editor: {
		minHeight: '6em',
		border: '0.05rem solid #caced7',
		boxShadow: '0 0 0 0.1rem rgba(87, 85, 217, 0.2)',
		borderColor: '#5755d9',
	},
};

export default Editor;
