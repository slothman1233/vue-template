var pluginName = 'lineheight'
var pluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager')
var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools')

pluginManager.add(pluginName, function(editor) {
	var lineheight_val = editor.getParam('lineheight_val', [1, 1.5, 1.6, 1.75, 1.8, 2, 3, 4, 5])
	editor.on('init', function() {
		editor.formatter.register({
			lineheight: {
				selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table',
				styles: { 'line-height': '%value' }
			}
		})
	})
	var list = lineheight_val.map(num => ({
		text: { raw: num },
		value: num,
		textStyle: ''
	}))

	var register = function(editor) {
		editor.addButton(pluginName, {
			title: '设置行高',
			// cmd: 'mceLineHeight',
			icon: 'article',
			type: 'listbox',
			tooltip: '设置行高',
			values: list,
			// fixedWidth: !0,
			onPostRender: function() {},
			onselect: function(e) {
				// e.control.settings.value && editor.formatter.apply('lineheight', { value: e.control.settings.value })
				// editor.fire('change', {})
				// editor.execCommand('FontSize', !1, '50px')
				var blocks = editor.selection.getSelectedBlocks()
				global$1.each(blocks, function(block) {
					editor.dom.setStyle(block, 'line-height', e.control.settings.value)
				})
			}
		})
	}
	register(editor)
})
