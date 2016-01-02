'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var debounce = require('lodash.debounce');
var Markdown = require('react-markdown');

var hasLocalStorage = supportsLocalStorage();
var initialSource = getDefaultSource();

var App = React.createClass({
    onChange: function(e) {
        this.setState({ source: e.target.value });
        this.storeSource(e.target.value);
    },

    storeSource: hasLocalStorage ? debounce(function(src) {
        localStorage.markdownSource = src || initialSource;
    }, 250) : function() {},

    render: function() {
        return (
            <div className="app">
                <textarea
                    className="editor"
                    defaultValue={initialSource}
                    onChange={this.onChange} />

                <Markdown
                    className="preview"
                    source={this.state ? this.state.source : initialSource}
                    escapeHtml />
            </div>
        );
    }
});

ReactDom.render(
    <App />,
    document.getElementById('root')
);

function supportsLocalStorage() {
    var mod = 'test';
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch (e) {
        return false;
    }
}

function getDefaultSource() {
    return (hasLocalStorage && localStorage.markdownSource) || [
        '# Markdown Previewer', '',
        '',
        '+ Build React DOM with webpack bundle',
        '+ Transformed JSX to React components using Babel',
        '+ Used eslint for testing (similar to JSHint)',
        '',

        '## Flow of Markdown Previewer', '',
        '* When source in the editor is changed:',
        '  * Callback is triggered',
        '  * Updates state on app component',
        '  * App component sets new source on preview component (react-markdown - markdown to react renderer)',
        '  * Changes are reflected!',
        '* As a bonus, a debounced method stores the editor value to localStorage',
        '',

        '## John Tan'
    ].join('\n');
}