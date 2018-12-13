import * as React from 'react';
import DraftEditor from 'draft-js-plugins-editor';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import { HeadlineOneButton, HeadlineTwoButton, ItalicButton, BoldButton, UnderlineButton } from 'draft-js-buttons';
import onClickOutside from 'react-onclickoutside';

const linkifyPlugin = createLinkifyPlugin();
const sideToolbarPlugin = createSideToolbarPlugin();
const hashtagPlugin = createHashtagPlugin();
const emojiPlugin = createEmojiPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const mentionPlugin = createMentionPlugin();

const plugins = [ linkifyPlugin, mentionPlugin, sideToolbarPlugin, hashtagPlugin, emojiPlugin, inlineToolbarPlugin ];

const { MentionSuggestions } = mentionPlugin;
const { SideToolbar } = sideToolbarPlugin;
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const { InlineToolbar } = inlineToolbarPlugin;

@onClickOutside
class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mentions: this.props.mentions || [],
			editorFocussed: false,
		};

		const contentStateString = this.props.value;
		if (contentStateString) {
			this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(contentStateString)));
		} else {
			this.state.editorState = EditorState.createEmpty();
		}
	}

	onChange = (editorState) => {
		this.setState({ editorState }, () => {
			const contentState = this.state.editorState.getCurrentContent();
			const contentStateRaw = convertToRaw(contentState);
			const contentStateString = JSON.stringify(contentStateRaw);
			if (this.props.onChange) {
				this.props.onChange(contentStateString);
			}
		});
	};

	focusEditor = () => {
		if (!this.props.readOnly) {
			this.setState({ editorFocussed: true });
		}
	};

	removeFocusEditor = () => {
		this.setState({ editorFocussed: false });
	};

	handleClickOutside = (evt) => {
		this.removeFocusEditor();
	};

	onSearchChange = ({ value }) => {
		this.setState({
			mentions: defaultSuggestionsFilter(value, this.props.mentions || []),
		});
	};

	onAddMention = () => {
		// console.log('mention added');
	};

	render() {
		return (
			<div>
				<div
					className={`editor ${!this.props.readOnly ? 'editor__editable' : ''} ${this.state.editorFocussed
						? 'editor__active'
						: ''}`}
					onClick={this.focusEditor}
				>
					<DraftEditor
						ref={(element) => {
							this.editor = element;
						}}
						editorState={this.state.editorState}
						onChange={this.onChange}
						onBlur={this.removeFocusEditor}
						onFocus={this.focusEditor}
						readOnly={this.props.readOnly}
						plugins={plugins}
					/>
					<MentionSuggestions
						onSearchChange={this.onSearchChange}
						suggestions={this.state.mentions}
						// onAddMention={this.onAddMention}
					/>
					<SideToolbar>
						{(props) => (
							<div>
								<HeadlineOneButton {...props} />
								<HeadlineTwoButton {...props} />
							</div>
						)}
					</SideToolbar>
					<InlineToolbar>
						{(props) => (
							<div>
								<BoldButton {...props} />
								<ItalicButton {...props} />
								<UnderlineButton {...props} />
							</div>
						)}
					</InlineToolbar>
				</div>
				{!this.props.readOnly && <EmojiSuggestions />}
				{!this.props.readOnly && <EmojiSelect />}
			</div>
		);
	}
}

export default Editor;
