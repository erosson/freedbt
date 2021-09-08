import * as Model from '../Model'
import JournalForm from '../View/Form/Journal'
import CBTForm from '../View/Form/CBT'

function Form(p: ({type: Model.Entry['type']} | {entry: Model.Entry}) & {onSubmit: (e:Model.Entry) => void}): JSX.Element {
  if ('entry' in p) {
    switch(p.entry.type) {
      case 'journal': return <JournalForm entry={p.entry} onSubmit={p.onSubmit} />
      case 'cbt': return <CBTForm entry={p.entry} onSubmit={p.onSubmit} />
    }
  }
  else {
    switch(p.type) {
      case 'journal': return <JournalForm onSubmit={p.onSubmit} />
      case 'cbt': return <CBTForm onSubmit={p.onSubmit} />
    }
  }
}
export default Form
