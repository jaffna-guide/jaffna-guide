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
    console.log('contentStateString', contentStateString);
    console.log('convertFromRaw(JSON.parse(contentStateString))', convertFromRaw(JSON.parse(contentStateString)));

		if (contentStateString) {
			this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(contentStateString)));
		} else {
			this.state.editorState = EditorState.createEmpty();
		}

		this.plugins = [
			createMentionPlugin(),
			linkifyPlugin,
			sideToolbarPlugin,
			hashtagPlugin,
			emojiPlugin,
			inlineToolbarPlugin,
		];
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

			if (this.props.name) {
				this[`editor${this.props.name.charAt(0).toUpperCase()}${this.props.name.substr(1)}`].focus();
			} else {
				this.editor.focus();
			}
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
		const [ mentionPlugin ] = this.plugins;
		const { MentionSuggestions } = mentionPlugin;

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
							if (this.props.name) {
								this[
									`editor${this.props.name.charAt(0).toUpperCase()}${this.props.name.substr(1)}`
								] = element;
							} else {
								this.editor = element;
							}
						}}
						editorState={this.state.editorState}
						onChange={this.onChange}
						onBlur={this.removeFocusEditor}
						onFocus={this.focusEditor}
						readOnly={this.props.readOnly}
						plugins={this.plugins}
					/>
					{this.props.mentions && (
						<MentionSuggestions
							onSearchChange={this.onSearchChange}
							suggestions={this.props.mentions}
							// onAddMention={this.onAddMention}
						/>
					)}
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
