import * as Model from '../Model'
import JournalForm from '../View/Form/Journal'
import CBTForm from '../View/Form/CBT'
import DBTEmotionRegulation5Form from '../View/Form/DBTEmotionRegulation5'

function Form(p: ({type: Model.Entry['type']} | {entry: Model.Entry}) & {onSubmit: (e:Model.Entry) => void}): JSX.Element {
  if ('entry' in p) {
    switch(p.entry.type) {
      case Model.EntryType.JOURNAL:
        return <JournalForm entry={p.entry} onSubmit={p.onSubmit} />
      case Model.EntryType.CBT:
        return <CBTForm entry={p.entry} onSubmit={p.onSubmit} />
      case Model.EntryType.DBT_EMOTION_REGULATION_5:
        return <DBTEmotionRegulation5Form entry={p.entry} onSubmit={p.onSubmit} />
    }
  }
  else {
    switch(p.type) {
      case Model.EntryType.JOURNAL:
        return <JournalForm onSubmit={p.onSubmit} />
      case Model.EntryType.CBT:
        return <CBTForm onSubmit={p.onSubmit} />
      case Model.EntryType.DBT_EMOTION_REGULATION_5:
        return <DBTEmotionRegulation5Form onSubmit={p.onSubmit} />
    }
  }
}
export default Form
