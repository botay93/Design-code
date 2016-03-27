JadeView = require './jade-view'
{CompositeDisposable} = require 'atom'

module.exports = Jade =
  jadeView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @jadeView = new JadeView(state.jadeViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @jadeView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'jade:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @jadeView.destroy()

  serialize: ->
    jadeViewState: @jadeView.serialize()

  toggle: ->
    console.log 'Jade was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
