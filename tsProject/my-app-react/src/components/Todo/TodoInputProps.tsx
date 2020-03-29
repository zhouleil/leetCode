interface inputSetting {
  placeholder?: string
  maxlength?: number
}

export class TodoInputProps {

  public handleSubmit ( value: string ) {}

  public inputSetting?: inputSetting = {
    maxlength: 20,
    placeholder: '请输入todo'
  }
}