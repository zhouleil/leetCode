import React from 'react'
import { TodoInputProps } from './TodoInputProps'

interface Props {
  handleSubmit: (value: string) => void
}

interface State {
  itemText: string
}


export class TodoInput extends React.Component<TodoInputProps, State> {

  public static defaultProps = new TodoInputProps()

  itemText: string = ''

  private inputRef = React.createRef<HTMLInputElement> ()

  private updateValue (e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ itemText: e.target.value })
  }

  private handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!this.state.itemText.trim()) {
      return
    }

    this.props.handleSubmit( this.state.itemText )
    this.setState({ itemText: '' })
  }

  render () {
    const { itemText } = this.state
    const { updateValue, handleSubmit } = this
    const { inputSetting } = this.props
    return (
      <form onSubmit={ handleSubmit }>
        <input
          ref={ this.inputRef }
          className="edit"
          type="text"
          value={ itemText }
          maxLength={ inputSetting?.maxlength }
          placeholder={ inputSetting?.placeholder }
          onChange={ updateValue }
        />
      </form>
    )
  }
}